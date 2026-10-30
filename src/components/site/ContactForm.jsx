'use client';

import { useState } from 'react';
import { CheckCircle2, Loader2, Send } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import Field, { Honeypot } from '@/components/ui/Field';
import { useLang } from '@/components/providers/LanguageProvider';
import { useSite } from '@/components/providers/SiteProvider';
import { api } from '@/lib/api';
import { msg, waLink } from '@/lib/whatsapp';
import { MOBILE_RX } from '@/lib/constants';

const EMPTY = { name: '', mobile: '', message: '', website: '' };

export default function ContactForm() {
  const { t } = useLang();
  const site = useSite();
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [state, setState] = useState('idle');
  const [sent, setSent] = useState(null);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.trim()) errs.name = t('form.required');
    if (!MOBILE_RX.test(form.mobile.replace(/\D/g, '').slice(-10))) errs.mobile = t('form.invalidMobile');
    if (!form.message.trim()) errs.message = t('form.required');
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setState('sending');
    try {
      await api('/api/enquiries', { method: 'POST', body: { ...form, type: 'contact' } });
      setSent(form);
      setForm(EMPTY);
      setState('idle');
    } catch {
      setState('error');
    }
  };

  if (sent) {
    return (
      <div className="card p-8 text-center">
        <CheckCircle2 className="mx-auto h-14 w-14 text-green-600" />
        <h3 className="mt-4 text-2xl font-bold">{t('contact.sent')}</h3>
        <p className="mt-2 text-navy/70">{t('contact.sentText')}</p>
        <a href={waLink(msg.contact(sent), site.whatsapp)} target="_blank" rel="noopener" className="btn btn-wa mt-6">
          <WhatsAppIcon /> {t('book.sendWa')}
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="card relative grid gap-5 p-5 sm:grid-cols-2 sm:p-8">
      <Honeypot value={form.website} onChange={(v) => setForm((f) => ({ ...f, website: v }))} />
      <Field id="cf-name" label={t('form.name')} error={errors.name}>
        <input id="cf-name" className={`input ${errors.name ? 'input-error' : ''}`} value={form.name} onChange={set('name')} placeholder={t('form.namePh')} autoComplete="name" />
      </Field>
      <Field id="cf-mobile" label={t('form.mobile')} error={errors.mobile}>
        <input id="cf-mobile" className={`input ${errors.mobile ? 'input-error' : ''}`} value={form.mobile} onChange={set('mobile')} placeholder={t('form.mobilePh')} inputMode="numeric" autoComplete="tel" maxLength={14} />
      </Field>
      <Field id="cf-msg" label={t('contact.message')} error={errors.message} className="sm:col-span-2">
        <textarea id="cf-msg" rows={4} className={`input ${errors.message ? 'input-error' : ''}`} value={form.message} onChange={set('message')} placeholder={t('contact.messagePh')} maxLength={1500} />
      </Field>
      {state === 'error' && <p className="field-error sm:col-span-2">{t('form.error')}</p>}
      <div className="grid gap-2 sm:col-span-2 sm:grid-cols-2">
        <button type="submit" className="btn btn-primary btn-lg" disabled={state === 'sending'}>
          {state === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          {state === 'sending' ? t('form.submitting') : t('contact.send')}
        </button>
        <a href={waLink(msg.contact(form), site.whatsapp)} target="_blank" rel="noopener" className="btn btn-wa btn-lg">
          <WhatsAppIcon /> {t('contact.whatsappNow')}
        </a>
      </div>
    </form>
  );
}
