'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Info, Loader2, Minus, Phone, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import ProductImage from '@/components/ui/ProductImage';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import Field, { Honeypot } from '@/components/ui/Field';
import { useCart } from '@/components/providers/CartProvider';
import { useLang } from '@/components/providers/LanguageProvider';
import { useSite } from '@/components/providers/SiteProvider';
import { api, openWhatsApp } from '@/lib/api';
import { msg, waLink } from '@/lib/whatsapp';
import { formatINR, telHref } from '@/lib/format';
import { MOBILE_RX } from '@/lib/constants';

function Stepper({ value, onChange }) {
  return (
    <div className="inline-flex items-center rounded-xl border-2 border-navy/10">
      <button type="button" className="grid h-10 w-10 place-items-center disabled:opacity-30" onClick={() => onChange(value - 1)} disabled={value <= 1} aria-label="Decrease">
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center font-bold">{value}</span>
      <button type="button" className="grid h-10 w-10 place-items-center disabled:opacity-30" onClick={() => onChange(value + 1)} disabled={value >= 99} aria-label="Increase">
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

export default function CartView() {
  const { items, ready, count, mrpTotal, total, unpriced, setQty, remove, clear } = useCart();
  const { t, tx } = useLang();
  const site = useSite();
  const [form, setForm] = useState({ name: '', mobile: '', address: '', note: '', website: '' });
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(null); // { waUrl }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const discount = mrpTotal - total;

  const placeOrder = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = t('form.required');
    const mobile = form.mobile.replace(/\D/g, '').slice(-10);
    if (!MOBILE_RX.test(mobile)) errs.mobile = t('form.invalidMobile');
    if (!form.address.trim()) errs.address = t('form.required');
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    // Prices in the WhatsApp message come from the server when available (source of truth).
    let orderItems = items.map((i) => ({ name: i.name.en, qty: i.qty, price: i.price }));
    let orderTotal = unpriced && !total ? null : total;
    try {
      const res = await api('/api/enquiries', {
        method: 'POST',
        body: {
          type: 'order',
          name: form.name,
          mobile,
          address: form.address,
          message: form.note,
          website: form.website,
          items: items.map((i) => ({ product: i.id, qty: i.qty })),
        },
      });
      if (res?.items?.length) {
        orderItems = res.items.map((i) => ({ name: i.name, qty: i.qty, price: i.price }));
        orderTotal = res.total;
      }
    } catch {
      /* Still let the customer send the order on WhatsApp — that is what matters most. */
    }
    const waUrl = waLink(
      msg.order({ name: form.name, mobile, address: form.address, note: form.note, items: orderItems, total: orderTotal }),
      site.whatsapp
    );
    setSending(false);
    setDone({ waUrl });
    clear();
    openWhatsApp(waUrl);
  };

  if (done) {
    return (
      <section className="section">
        <div className="container-x max-w-xl">
          <div className="card p-8 text-center">
            <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2 className="h-11 w-11" />
            </span>
            <h1 className="mt-5 text-3xl font-extrabold">{t('cart.success')}</h1>
            <p className="mt-2 text-lg text-navy/70">{t('cart.successText')}</p>
            <a href={done.waUrl} target="_blank" rel="noopener" className="btn btn-wa btn-lg mt-6 w-full">
              <WhatsAppIcon className="h-6 w-6" /> {t('cart.sendWa')}
            </a>
            <a href={telHref(site.phone)} className="btn btn-outline mt-3 w-full">
              <Phone className="h-5 w-5" /> {t('book.callDirect')}
            </a>
            <Link href="/shop" className="mt-5 inline-block font-semibold text-brand hover:underline">
              {t('cart.continue')}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section !pt-8 sm:!pt-12">
      <div className="container-x">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h1 className="text-3xl font-extrabold sm:text-4xl">{t('cart.title')}</h1>
          {count > 0 && <span className="chip">{t('cart.items', { n: count })}</span>}
        </div>

        {!ready ? (
          <div className="grid h-60 place-items-center text-navy/50">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : !items.length ? (
          <div className="card mx-auto max-w-lg p-10 text-center">
            <ShoppingCart className="mx-auto h-16 w-16 text-brand" />
            <h2 className="mt-4 text-2xl font-bold">{t('cart.empty')}</h2>
            <p className="mt-2 text-navy/65">{t('cart.emptyText')}</p>
            <Link href="/shop" className="btn btn-primary mt-6">
              {t('cart.continue')}
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-5">
            <div className="space-y-3 lg:col-span-3">
              {items.map((i) => (
                <div key={i.id} className="card flex gap-3 p-3 sm:gap-4 sm:p-4">
                  <Link href={`/shop/${i.slug}`} className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-brand-50 sm:h-28 sm:w-28">
                    <ProductImage product={{ images: i.image ? [i.image] : [], art: i.art }} alt={i.name.en} />
                  </Link>
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-2">
                      <Link href={`/shop/${i.slug}`} className="line-clamp-2 font-bold hover:text-brand">
                        {tx(i.name)}
                      </Link>
                      <button type="button" onClick={() => remove(i.id)} className="-mr-1 -mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-lg text-navy/40 hover:bg-red-50 hover:text-red-600" aria-label={t('cart.remove')}>
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-1 text-sm">
                      {i.price != null ? (
                        <>
                          <span className="font-bold">{formatINR(i.price)}</span>
                          {i.discountPercent > 0 && <span className="ml-2 text-navy/45 line-through">{formatINR(i.mrp)}</span>}
                        </>
                      ) : (
                        <span className="font-semibold text-brand">{t('product.priceOnRequest')}</span>
                      )}
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-2">
                      <Stepper value={i.qty} onChange={(q) => setQty(i.id, q)} />
                      {i.price != null && <span className="font-display text-lg font-bold">{formatINR(i.price * i.qty)}</span>}
                    </div>
                  </div>
                </div>
              ))}
              <Link href="/shop" className="inline-flex items-center gap-2 px-1 py-2 font-semibold text-brand hover:underline">
                <ArrowLeft className="h-4 w-4" /> {t('cart.continue')}
              </Link>
            </div>

            <div className="lg:col-span-2">
              <form onSubmit={placeOrder} noValidate className="card relative space-y-5 p-5 sm:p-6 lg:sticky lg:top-24">
                <Honeypot value={form.website} onChange={(v) => setForm((f) => ({ ...f, website: v }))} />
                <dl className="space-y-2 text-[16px]">
                  <div className="flex justify-between">
                    <dt className="text-navy/65">{t('cart.subtotal')}</dt>
                    <dd className="font-semibold">{formatINR(mrpTotal)}</dd>
                  </div>
                  {discount > 0 && (
                    <div className="flex justify-between text-green-700">
                      <dt>{t('cart.discount')}</dt>
                      <dd className="font-semibold">− {formatINR(discount)}</dd>
                    </div>
                  )}
                  <div className="flex justify-between border-t border-navy/10 pt-3 text-xl">
                    <dt className="font-bold">{t('cart.total')}</dt>
                    <dd className="font-display font-extrabold text-brand">{formatINR(total)}</dd>
                  </div>
                </dl>
                {unpriced && (
                  <p className="flex gap-2 rounded-xl bg-sun/20 p-3 text-sm text-navy/80">
                    <Info className="h-5 w-5 shrink-0" /> {t('cart.someOnRequest')}
                  </p>
                )}

                <div className="space-y-4 border-t border-navy/10 pt-5">
                  <h2 className="text-lg font-bold">{t('cart.details')}</h2>
                  <Field id="c-name" label={t('form.name')} error={errors.name}>
                    <input id="c-name" className={`input ${errors.name ? 'input-error' : ''}`} value={form.name} onChange={set('name')} placeholder={t('form.namePh')} autoComplete="name" />
                  </Field>
                  <Field id="c-mobile" label={t('form.mobile')} error={errors.mobile}>
                    <input id="c-mobile" className={`input ${errors.mobile ? 'input-error' : ''}`} value={form.mobile} onChange={set('mobile')} placeholder={t('form.mobilePh')} inputMode="numeric" autoComplete="tel" maxLength={14} />
                  </Field>
                  <Field id="c-address" label={t('form.address')} error={errors.address}>
                    <textarea id="c-address" rows={2} className={`input ${errors.address ? 'input-error' : ''}`} value={form.address} onChange={set('address')} placeholder={t('form.addressPh')} autoComplete="street-address" />
                  </Field>
                  <Field id="c-note" label={t('form.note').replace(/ \(.*\)/, '')} optional optionalText={t('form.optional')}>
                    <input id="c-note" className="input" value={form.note} onChange={set('note')} />
                  </Field>
                </div>

                <button type="submit" className="btn btn-wa btn-lg w-full" disabled={sending}>
                  {sending ? <Loader2 className="h-5 w-5 animate-spin" /> : <WhatsAppIcon className="h-6 w-6" />}
                  {sending ? t('cart.placing') : t('cart.place')}
                </button>
                <p className="text-center text-sm text-navy/55">{t('cart.payNote')}</p>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
