'use client';

import { useEffect, useState } from 'react';
import { Loader2, Plus, Save, Trash2 } from 'lucide-react';
import useData from '@/components/admin/useData';
import { useToast } from '@/components/admin/Toast';
import ImageUploader from '@/components/admin/ImageUploader';
import { BiInput, Loading, PageTitle, Toggle } from '@/components/admin/ui';
import { api } from '@/lib/api';

function Section({ title, subtitle, children }) {
  return (
    <section className="card space-y-5 p-5 sm:p-6">
      <div>
        <h2 className="text-lg font-bold">{title}</h2>
        {subtitle && <p className="text-sm text-navy/55">{subtitle}</p>}
      </div>
      {children}
    </section>
  );
}

export default function ContentAdmin() {
  const toast = useToast();
  const { data, loading, error } = useData('/api/settings');
  const [s, setS] = useState(null);
  const [applyAll, setApplyAll] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (data) setS(data);
  }, [data]);

  if (loading || !s) return error ? <p className="card p-6 text-red-600">{error}</p> : <Loading />;

  const set = (k, v) => setS((x) => ({ ...x, [k]: v }));
  const setBanner = (i, patch) => set('banners', s.banners.map((b, n) => (n === i ? { ...b, ...patch } : b)));

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      const saved = await api('/api/settings', { method: 'PUT', body: { ...s, applyDiscountToAll: applyAll } });
      setS(saved);
      setApplyAll(false);
      toast(applyAll ? `Saved. ${saved.defaultDiscount}% offer applied to all products.` : 'Website content saved');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-6">
      <PageTitle title="Website Content" subtitle="Changes appear on the website right after saving." />

      <Section title="Shop details">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="c-bn">Business name</label>
            <input id="c-bn" className="input" value={s.businessName} onChange={(e) => set('businessName', e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="c-email">Email (optional)</label>
            <input id="c-email" type="email" className="input" value={s.email || ''} onChange={(e) => set('email', e.target.value)} />
          </div>
        </div>
        <BiInput label="Tagline" value={s.tagline} onChange={(v) => set('tagline', v)} />
        <BiInput label="About the shop (About Us page)" value={s.about} onChange={(v) => set('about', v)} textarea rows={6} />
      </Section>

      <Section title="Contact details" subtitle="Used for every Call and WhatsApp button on the website.">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="c-phone">Phone number</label>
            <input id="c-phone" className="input" inputMode="numeric" value={s.phone} onChange={(e) => set('phone', e.target.value)} />
          </div>
          <div>
            <label className="label" htmlFor="c-wa">WhatsApp number</label>
            <input id="c-wa" className="input" inputMode="numeric" value={s.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} />
            <p className="mt-1 text-sm text-navy/50">10-digit number is fine; 91 is added automatically.</p>
          </div>
        </div>
        <BiInput label="Shop address" value={s.address} onChange={(v) => set('address', v)} />
        <BiInput label="Working hours" value={s.hours} onChange={(v) => set('hours', v)} />
        <BiInput label="Service area" value={s.serviceArea} onChange={(v) => set('serviceArea', v)} />
        <div>
          <label className="label" htmlFor="c-map">Google Maps embed</label>
          <textarea id="c-map" rows={2} className="input" value={s.mapEmbedUrl} onChange={(e) => set('mapEmbedUrl', e.target.value)} placeholder='Google Maps → Share → Embed a map → copy HTML and paste here' />
        </div>
        <div>
          <label className="label" htmlFor="c-maplink">Google Maps link (for “Get Directions”)</label>
          <input id="c-maplink" className="input" value={s.mapLink} onChange={(e) => set('mapLink', e.target.value)} placeholder="https://maps.app.goo.gl/…" />
        </div>
      </Section>

      <Section title="Offer" subtitle="Default discount for new products, shown as “30% OFF”.">
        <div className="flex flex-wrap items-center gap-2">
          {[0, 10, 20, 25, 30, 40].map((d) => (
            <button key={d} type="button" onClick={() => set('defaultDiscount', d)} className={`chip ${s.defaultDiscount === d ? 'chip-active' : ''}`}>
              {d}%
            </button>
          ))}
          <input type="number" min={0} max={90} className="input !min-h-[40px] !w-24" value={s.defaultDiscount} onChange={(e) => set('defaultDiscount', Number(e.target.value))} aria-label="Default discount" />
        </div>
        <label className="flex items-start gap-3 rounded-xl bg-sun/15 p-4">
          <input type="checkbox" className="mt-1 h-5 w-5" checked={applyAll} onChange={(e) => setApplyAll(e.target.checked)} />
          <span>
            <span className="block font-semibold">Also apply {s.defaultDiscount}% to ALL existing products</span>
            <span className="text-sm text-navy/60">Otherwise only new products get this discount.</span>
          </span>
        </label>
      </Section>

      <Section title="Homepage banner" subtitle="Optional. Upload a photo of your shop or technician to replace the illustration. The first active banner is shown.">
        {s.banners.map((b, i) => (
          <div key={b._id || i} className="space-y-4 rounded-2xl border-2 border-navy/10 p-4">
            <ImageUploader label="Banner photo" multiple={false} value={b.image ? [b.image] : []} onChange={(v) => setBanner(i, { image: v[0] || null })} />
            <BiInput label="Heading (leave empty to use the default)" value={b.title} onChange={(v) => setBanner(i, { title: v })} />
            <BiInput label="Sub-heading" value={b.subtitle} onChange={(v) => setBanner(i, { subtitle: v })} />
            <div className="flex items-center justify-between">
              <Toggle checked={b.active} onChange={(v) => setBanner(i, { active: v })} label="Active" />
              <button type="button" className="btn btn-ghost btn-sm text-red-600" onClick={() => set('banners', s.banners.filter((_, n) => n !== i))}>
                <Trash2 className="h-4 w-4" /> Remove banner
              </button>
            </div>
          </div>
        ))}
        <button type="button" className="btn btn-outline" onClick={() => set('banners', [...s.banners, { image: null, title: { en: '', hi: '' }, subtitle: { en: '', hi: '' }, active: true }])}>
          <Plus className="h-5 w-5" /> Add banner
        </button>
      </Section>

      <div className="sticky bottom-4 z-10">
        <button type="submit" className="btn btn-primary btn-lg w-full shadow-lift" disabled={busy}>
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />} Save website content
        </button>
      </div>
    </form>
  );
}
