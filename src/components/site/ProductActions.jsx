'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, Loader2, MessageSquareText, Minus, Phone, Plus, ShoppingCart } from 'lucide-react';
import AddToCartButton from './AddToCartButton';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import Field, { Honeypot } from '@/components/ui/Field';
import { useLang } from '@/components/providers/LanguageProvider';
import { useSite } from '@/components/providers/SiteProvider';
import { useCart } from '@/components/providers/CartProvider';
import { msg, waLink } from '@/lib/whatsapp';
import { api } from '@/lib/api';
import { telHref } from '@/lib/format';
import { MOBILE_RX, SITE_URL } from '@/lib/constants';

function EnquiryForm({ product }) {
  const { t, lang } = useLang();
  const site = useSite();
  const [form, setForm] = useState({ name: '', mobile: '', message: '', website: '' });
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | done | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const waUrl = waLink(
    `${msg.product({ name: product.name.en, price: product.price, url: `${SITE_URL}/shop/${product.slug}` }, lang)}${
      form.message ? `\n\n${form.message}` : ''
    }\n\nName: ${form.name}\nMobile: ${form.mobile}`,
    site.whatsapp
  );

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = t('form.required');
    if (!MOBILE_RX.test(form.mobile.replace(/\D/g, '').slice(-10))) errs.mobile = t('form.invalidMobile');
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setState('sending');
    try {
      await api('/api/enquiries', {
        method: 'POST',
        body: {
          ...form,
          type: product.category?.slug?.startsWith('ro-water') ? 'product' : 'spare_part',
          message: `${product.name.en}${form.message ? ` — ${form.message}` : ''}`,
          items: [{ product: product._id, qty: 1 }],
        },
      });
      setState('done');
    } catch {
      setState('error');
    }
  };

  if (state === 'done') {
    return (
      <div className="mt-4 rounded-2xl border-2 border-green-200 bg-green-50 p-5">
        <p className="flex items-center gap-2 text-lg font-bold text-green-800">
          <CheckCircle2 className="h-6 w-6" /> {t('contact.sent')}
        </p>
        <p className="mt-1 text-green-900/80">{t('contact.sentText')}</p>
        <a href={waUrl} target="_blank" rel="noopener" className="btn btn-wa mt-4 w-full">
          <WhatsAppIcon /> {t('book.sendWa')}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="relative mt-4 space-y-4 rounded-2xl border-2 border-brand/15 bg-brand-50/50 p-5">
      <Honeypot value={form.website} onChange={(v) => setForm((f) => ({ ...f, website: v }))} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="enq-name" label={t('form.name')} error={errors.name}>
          <input id="enq-name" className={`input ${errors.name ? 'input-error' : ''}`} value={form.name} onChange={set('name')} placeholder={t('form.namePh')} autoComplete="name" />
        </Field>
        <Field id="enq-mobile" label={t('form.mobile')} error={errors.mobile}>
          <input id="enq-mobile" className={`input ${errors.mobile ? 'input-error' : ''}`} value={form.mobile} onChange={set('mobile')} placeholder={t('form.mobilePh')} inputMode="numeric" autoComplete="tel" maxLength={14} />
        </Field>
      </div>
      <Field id="enq-msg" label={t('contact.message')} optional optionalText={t('form.optional')}>
        <textarea id="enq-msg" rows={2} className="input" value={form.message} onChange={set('message')} placeholder={t('contact.messagePh')} />
      </Field>
      {state === 'error' && <p className="field-error">{t('form.error')}</p>}
      <button type="submit" className="btn btn-primary w-full" disabled={state === 'sending'}>
        {state === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : <MessageSquareText className="h-5 w-5" />}
        {state === 'sending' ? t('form.submitting') : t('product.enquire')}
      </button>
    </form>
  );
}

export default function ProductActions({ product }) {
  const { t, lang } = useLang();
  const site = useSite();
  const { items } = useCart();
  const [qty, setQty] = useState(1);
  const [enquire, setEnquire] = useState(false);
  const inStock = product.available && product.stock > 0;
  const max = Math.max(1, Math.min(99, product.stock || 1));
  const inCart = items.find((i) => i.id === product._id);

  const wa = waLink(
    `${msg.product({ name: product.name.en, price: product.price, url: `${SITE_URL}/shop/${product.slug}` }, lang)}${
      qty > 1 ? `\nQuantity: ${qty}` : ''
    }`,
    site.whatsapp
  );

  return (
    <div className="mt-6">
      {inStock && (
        <div className="mb-4 flex items-center gap-4">
          <span className="font-semibold">{t('cart.qty')}</span>
          <div className="inline-flex items-center rounded-xl border-2 border-navy/10">
            <button type="button" className="grid h-12 w-12 place-items-center text-navy disabled:opacity-30" onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="Decrease">
              <Minus className="h-5 w-5" />
            </button>
            <span className="w-10 text-center text-lg font-bold" aria-live="polite">{qty}</span>
            <button type="button" className="grid h-12 w-12 place-items-center text-navy disabled:opacity-30" onClick={() => setQty((q) => Math.min(max, q + 1))} disabled={qty >= max} aria-label="Increase">
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-2.5 sm:grid-cols-2">
        <AddToCartButton product={product} qty={qty} className="btn btn-primary btn-lg w-full" />
        <a href={wa} target="_blank" rel="noopener" className="btn btn-wa btn-lg w-full">
          <WhatsAppIcon /> {t('product.whatsappBuy')}
        </a>
        <button type="button" onClick={() => setEnquire((v) => !v)} className="btn btn-outline w-full" aria-expanded={enquire}>
          <MessageSquareText className="h-5 w-5" /> {t('product.enquire')}
        </button>
        <a href={telHref(site.phone)} className="btn btn-outline w-full">
          <Phone className="h-5 w-5" /> {t('product.contactBuy')}
        </a>
      </div>

      {inCart && (
        <Link href="/cart" className="mt-3 flex items-center justify-center gap-2 rounded-xl bg-green-50 py-3 font-semibold text-green-800 hover:bg-green-100">
          <ShoppingCart className="h-5 w-5" /> {t('nav.cart')}: {inCart.qty} → {t('cart.place')}
        </Link>
      )}

      {enquire && <EnquiryForm product={product} />}
    </div>
  );
}
