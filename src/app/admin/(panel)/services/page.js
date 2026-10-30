'use client';

import { useState } from 'react';
import { Loader2, Pencil, Plus, Save, Trash2, Wrench } from 'lucide-react';
import useData from '@/components/admin/useData';
import { useToast } from '@/components/admin/Toast';
import ImageUploader from '@/components/admin/ImageUploader';
import { BiInput, BiList, Empty, Loading, Modal, PageTitle, Toggle } from '@/components/admin/ui';
import { ServiceVisual } from '@/components/site/ServiceCard';
import { api } from '@/lib/api';
import { APPLIANCES } from '@/lib/constants';
import { ART_KINDS } from '@/lib/art';

const blank = () => ({
  name: { en: '', hi: '' }, short: { en: '', hi: '' }, description: { en: '', hi: '' },
  appliance: 'ro', icon: 'ro', offerings: [], problems: [], solutions: [], image: null, order: 99, active: true,
});

function ServiceEditor({ initial, onSaved, onClose }) {
  const toast = useToast();
  const [s, setS] = useState(initial);
  const [busy, setBusy] = useState(false);
  const set = (k, v) => setS((x) => ({ ...x, [k]: v }));

  const save = async (e) => {
    e.preventDefault();
    if (!s.name.en.trim()) return toast('Enter the service name', 'error');
    setBusy(true);
    try {
      const saved = await api(s._id ? `/api/services/${s._id}` : '/api/services', { method: s._id ? 'PUT' : 'POST', body: s });
      onSaved(saved);
      toast('Service saved');
      onClose();
    } catch (err) {
      toast(err.message, 'error');
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-5">
      <BiInput label="Service name" value={s.name} onChange={(v) => set('name', v)} required />
      <BiInput label="Short line (on cards)" value={s.short} onChange={(v) => set('short', v)} />
      <BiInput label="Description" value={s.description} onChange={(v) => set('description', v)} textarea rows={4} />
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label className="label" htmlFor="sv-app">Booking appliance</label>
          <select id="sv-app" className="input" value={s.appliance} onChange={(e) => set('appliance', e.target.value)}>
            {APPLIANCES.map((a) => <option key={a.value} value={a.value}>{a.label.en}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="sv-icon">Illustration</label>
          <select id="sv-icon" className="input" value={s.icon} onChange={(e) => set('icon', e.target.value)}>
            {ART_KINDS.map((k) => <option key={k} value={k}>{k.replace('_', ' ')}</option>)}
          </select>
        </div>
        <div>
          <label className="label" htmlFor="sv-order">Order</label>
          <input id="sv-order" type="number" className="input" value={s.order} onChange={(e) => set('order', Number(e.target.value))} />
        </div>
      </div>
      <ImageUploader label="Photo (optional — replaces the illustration)" multiple={false} value={s.image ? [s.image] : []} onChange={(v) => set('image', v[0] || null)} />
      <div>
        <label className="label" htmlFor="sv-credit">Photo credit (only if the photo is not yours)</label>
        <input id="sv-credit" className="input" value={s.imageCredit || ''} onChange={(e) => set('imageCredit', e.target.value)} placeholder="Leave empty for your own photos" />
      </div>
      <BiList label="What we offer" items={s.offerings} onChange={(v) => set('offerings', v)} />
      <BiList label="Common problems" items={s.problems} onChange={(v) => set('problems', v)} />
      <BiList label="How we solve it" items={s.solutions} onChange={(v) => set('solutions', v)} />
      <Toggle checked={s.active} onChange={(v) => set('active', v)} label="Show on website" />
      <button className="btn btn-primary btn-lg w-full" disabled={busy}>
        {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />} Save service
      </button>
    </form>
  );
}

export default function ServicesAdmin() {
  const toast = useToast();
  const { data, setData, loading, error } = useData('/api/services?all=true');
  const [editing, setEditing] = useState(null);

  const saved = (svc) =>
    setData((d) => {
      const exists = d.some((x) => x._id === svc._id);
      return (exists ? d.map((x) => (x._id === svc._id ? svc : x)) : [...d, svc]).sort((a, b) => a.order - b.order);
    });

  const remove = async (svc) => {
    if (!confirm(`Delete service "${svc.name.en}"?`)) return;
    try {
      await api(`/api/services/${svc._id}`, { method: 'DELETE' });
      setData((d) => d.filter((x) => x._id !== svc._id));
      toast('Service deleted');
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  return (
    <>
      <PageTitle
        title="Services"
        subtitle="Edit service text in English and Hinglish, add photos, or hide a service."
        action={<button type="button" className="btn btn-primary" onClick={() => setEditing(blank())}><Plus className="h-5 w-5" /> Add Service</button>}
      />
      {loading && !data ? (
        <Loading />
      ) : error ? (
        <p className="card p-6 text-red-600">{error}</p>
      ) : !data.length ? (
        <Empty icon={Wrench} title="No services yet" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((s) => (
            <div key={s._id} className={`card overflow-hidden ${!s.active ? 'opacity-60' : ''}`}>
              <div className="aspect-[16/9] bg-brand-50">
                <ServiceVisual service={s} />
              </div>
              <div className="p-4">
                <p className="font-bold">{s.name.en}</p>
                <p className="text-sm text-navy/55">{s.name.hi}</p>
                <div className="mt-3 flex gap-2">
                  <button type="button" className="btn btn-outline btn-sm flex-1" onClick={() => setEditing(s)}>
                    <Pencil className="h-4 w-4" /> Edit
                  </button>
                  <button type="button" className="btn btn-ghost btn-sm text-red-600" onClick={() => remove(s)} aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?._id ? 'Edit service' : 'Add service'} wide>
        {editing && <ServiceEditor initial={editing} onSaved={saved} onClose={() => setEditing(null)} />}
      </Modal>
    </>
  );
}
