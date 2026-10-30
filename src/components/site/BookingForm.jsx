'use client';

import { useMemo, useState } from 'react';
import { CalendarCheck, CheckCircle2, Loader2, Phone, RotateCcw } from 'lucide-react';
import Art from '@/components/ui/Art';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import Field, { Honeypot } from '@/components/ui/Field';
import { useLang } from '@/components/providers/LanguageProvider';
import { useSite } from '@/components/providers/SiteProvider';
import { api, openWhatsApp } from '@/lib/api';
import { msg, waLink } from '@/lib/whatsapp';
import { telHref } from '@/lib/format';
import { APPLIANCES, MOBILE_RX, TIME_SLOTS } from '@/lib/constants';

const ART = { ro: 'ro', ac: 'ac', cooler: 'cooler', washing_machine: 'washing_machine', refrigerator: 'refrigerator', geyser: 'geyser', electrical: 'electrical', other: 'tools' };

const today = () => {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
};

const empty = (appliance = '') => ({
  name: '', mobile: '', appliance, serviceType: '', problem: '', address: '', preferredDate: '', preferredTime: '', website: '',
});

export default function BookingForm({ initialAppliance = '' }) {
  const { t, lang } = useLang();
  const site = useSite();
  const [form, setForm] = useState(() => empty(initialAppliance));
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | error
  const [done, setDone] = useState(null);

  const appliance = useMemo(() => APPLIANCES.find((a) => a.value === form.appliance), [form.appliance]);
  const set = (k) => (e) => {
    const v = e.target.value;
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
  };

  const chooseAppliance = (value) => {
    setForm((f) => ({ ...f, appliance: value, serviceType: '' }));
    setErrors((er) => ({ ...er, appliance: undefined }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = t('form.required');
    if (!MOBILE_RX.test(form.mobile.replace(/\D/g, '').slice(-10))) e.mobile = t('form.invalidMobile');
    if (!form.appliance) e.appliance = t('form.required');
    if (!form.serviceType) e.serviceType = t('form.required');
    if (!form.address.trim()) e.address = t('form.required');
    return e;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) {
      document.getElementById(`b-${Object.keys(e)[0]}`)?.focus();
      return;
    }

    setStatus('sending');
    // serviceType is saved in English so the shop sees one consistent value.
    const serviceEn = appliance.services.find((s) => s.en === form.serviceType)?.en || form.serviceType;
    const payload = { ...form, mobile: form.mobile.replace(/\D/g, '').slice(-10), serviceType: serviceEn, language: lang };
    try {
      const res = await api('/api/bookings', { method: 'POST', body: payload });
      const waUrl = waLink(msg.booking({ ...payload, bookingNo: res.bookingNo }), site.whatsapp);
      setDone({ bookingNo: res.bookingNo, waUrl });
      setStatus('idle');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      openWhatsApp(waUrl);
    } catch (err) {
      if (err.errors) setErrors(err.errors);
      setStatus('error');
    }
  };

  if (done) {
    return (
      <div className="card p-6 text-center sm:p-10">
        <span className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-600">
          <CheckCircle2 className="h-11 w-11" />
        </span>
        <h2 className="mt-5 text-3xl font-extrabold">{t('book.successTitle')}</h2>
        <p className="mt-2 text-lg text-navy/70">{t('book.successText')}</p>
        <p className="mx-auto mt-5 inline-flex items-center gap-2 rounded-xl bg-surface px-4 py-2 font-semibold">
          {t('book.bookingNo')} <span className="font-display text-xl text-brand">{done.bookingNo}</span>
        </p>
        <div className="mx-auto mt-6 grid max-w-md gap-2.5">
          <a href={done.waUrl} target="_blank" rel="noopener" className="btn btn-wa btn-lg w-full">
            <WhatsAppIcon className="h-6 w-6" /> {t('book.sendWa')}
          </a>
          <p className="text-sm text-navy/55">{t('book.sendWaHint')}</p>
          <a href={telHref(site.phone)} className="btn btn-outline w-full">
            <Phone className="h-5 w-5" /> {t('book.callDirect')}
          </a>
          <button type="button" onClick={() => { setForm(empty()); setDone(null); }} className="btn btn-ghost w-full">
            <RotateCcw className="h-5 w-5" /> {t('book.another')}
          </button>
        </div>
      </div>
    );
  }

  const fallbackWa = waLink(
    msg.booking({ ...form, serviceType: form.serviceType || '-', appliance: form.appliance || 'other' }),
    site.whatsapp
  );

  return (
    <form onSubmit={submit} noValidate className="card relative overflow-hidden">
      <Honeypot value={form.website} onChange={(v) => setForm((f) => ({ ...f, website: v }))} />

      {/* Step 1 */}
      <div className="p-5 sm:p-8">
        <h2 className="flex items-center gap-3 text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand font-display text-white">1</span>
          {t('book.step1')}
        </h2>

        <fieldset className="mt-5">
          <legend id="b-appliance" tabIndex={-1} className="label">
            {t('form.appliance')} <span className="text-red-500">*</span>
          </legend>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {APPLIANCES.map((a) => {
              const active = form.appliance === a.value;
              return (
                <button
                  key={a.value}
                  type="button"
                  onClick={() => chooseAppliance(a.value)}
                  aria-pressed={active}
                  className={`group flex flex-col items-center overflow-hidden rounded-2xl border-2 text-center transition ${
                    active ? 'border-brand bg-brand-50 ring-4 ring-brand/15' : 'border-navy/10 bg-white hover:border-brand/50'
                  }`}
                >
                  <Art kind={ART[a.value]} className="aspect-[4/3] w-full" />
                  <span className={`flex min-h-[44px] w-full items-center justify-center px-1.5 py-2 text-[14px] font-bold leading-tight ${active ? 'text-brand' : ''}`}>
                    {a.label[lang]}
                  </span>
                </button>
              );
            })}
          </div>
          {errors.appliance && <p className="field-error">{errors.appliance}</p>}
        </fieldset>

        <Field id="b-serviceType" label={t('form.serviceType')} error={errors.serviceType} className="mt-5">
          {appliance ? (
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-labelledby="b-serviceType">
              {appliance.services.map((s) => (
                <button
                  key={s.en}
                  type="button"
                  role="radio"
                  aria-checked={form.serviceType === s.en}
                  onClick={() => set('serviceType')({ target: { value: s.en } })}
                  className={`chip !min-h-[46px] !text-[15px] ${form.serviceType === s.en ? 'chip-active' : ''}`}
                >
                  {s[lang]}
                </button>
              ))}
            </div>
          ) : (
            <p id="b-serviceType" tabIndex={-1} className="rounded-xl bg-surface px-4 py-3 text-navy/55">
              {t('form.chooseAppliance')}
            </p>
          )}
        </Field>

        <Field id="b-problem" label={t('form.problem')} optional optionalText={t('form.optional')} className="mt-5">
          <textarea id="b-problem" rows={3} className="input" value={form.problem} onChange={set('problem')} placeholder={t('form.problemPh')} maxLength={1000} />
        </Field>
      </div>

      {/* Step 2 */}
      <div className="border-t border-navy/10 bg-surface/60 p-5 sm:p-8">
        <h2 className="flex items-center gap-3 text-xl font-bold">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-brand font-display text-white">2</span>
          {t('book.step2')}
        </h2>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <Field id="b-name" label={t('form.name')} error={errors.name}>
            <input id="b-name" className={`input ${errors.name ? 'input-error' : ''}`} value={form.name} onChange={set('name')} placeholder={t('form.namePh')} autoComplete="name" maxLength={80} />
          </Field>
          <Field id="b-mobile" label={t('form.mobile')} error={errors.mobile}>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 font-semibold text-navy/50">+91</span>
              <input id="b-mobile" className={`input !pl-14 ${errors.mobile ? 'input-error' : ''}`} value={form.mobile} onChange={set('mobile')} placeholder={t('form.mobilePh')} inputMode="numeric" autoComplete="tel-national" maxLength={14} />
            </div>
          </Field>
          <Field id="b-address" label={t('form.address')} error={errors.address} className="sm:col-span-2">
            <textarea id="b-address" rows={2} className={`input ${errors.address ? 'input-error' : ''}`} value={form.address} onChange={set('address')} placeholder={t('form.addressPh')} autoComplete="street-address" maxLength={500} />
          </Field>
          <Field id="b-date" label={t('form.date')} optional optionalText={t('form.optional')}>
            <input id="b-date" type="date" min={today()} className="input" value={form.preferredDate} onChange={set('preferredDate')} />
          </Field>
          <Field id="b-time" label={t('form.time')} optional optionalText={t('form.optional')}>
            <select id="b-time" className="input" value={form.preferredTime} onChange={set('preferredTime')}>
              <option value="">{t('form.select')}</option>
              {TIME_SLOTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s[lang]}
                </option>
              ))}
            </select>
          </Field>
        </div>

        {status === 'error' && (
          <div className="mt-5 rounded-xl border-2 border-red-200 bg-red-50 p-4 text-red-800" role="alert">
            <p className="font-semibold">{t('form.error')}</p>
            <a href={fallbackWa} target="_blank" rel="noopener" className="btn btn-wa btn-sm mt-3">
              <WhatsAppIcon /> {t('book.sendWa')}
            </a>
          </div>
        )}

        <button type="submit" className="btn btn-primary btn-lg mt-6 w-full" disabled={status === 'sending'}>
          {status === 'sending' ? <Loader2 className="h-5 w-5 animate-spin" /> : <CalendarCheck className="h-5 w-5" />}
          {status === 'sending' ? t('form.submitting') : t('form.submit')}
        </button>
      </div>
    </form>
  );
}
