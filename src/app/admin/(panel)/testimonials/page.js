'use client';

import { useState } from 'react';
import { Loader2, MessageSquareQuote, Pencil, Plus, Save, Trash2 } from 'lucide-react';
import useData from '@/components/admin/useData';
import { useToast } from '@/components/admin/Toast';
import { BiInput, Badge, Empty, Loading, Modal, PageTitle, Toggle } from '@/components/admin/ui';
import { Stars } from '@/components/site/Testimonials';
import { api } from '@/lib/api';

const blank = () => ({ name: '', location: '', text: { en: '', hi: '' }, rating: 5, active: true, order: 0 });

function Editor({ initial, onSaved, onClose }) {
  const toast = useToast();
  const [t, setT] = useState(initial);
  const [busy, setBusy] = useState(false);

  const save = async (e) => {
    e.preventDefault();
    if (!t.name.trim() || !t.text.en.trim()) return toast('Name and review (English) are required', 'error');
    setBusy(true);
    try {
      onSaved(await api(t._id ? `/api/testimonials/${t._id}` : '/api/testimonials', { method: t._id ? 'PUT' : 'POST', body: t }));
      toast('Review saved');
      onClose();
    } catch (err) {
      toast(err.message, 'error');
      setBusy(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="label" htmlFor="t-name">Customer name</label>
          <input id="t-name" className="input" value={t.name} onChange={(e) => setT({ ...t, name: e.target.value })} />
        </div>
        <div>
          <label className="label" htmlFor="t-loc">Village / area</label>
          <input id="t-loc" className="input" value={t.location} onChange={(e) => setT({ ...t, location: e.target.value })} />
        </div>
      </div>
      <BiInput label="Review" value={t.text} onChange={(v) => setT({ ...t, text: v })} textarea required />
      <div>
        <p className="label">Rating</p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button key={n} type="button" onClick={() => setT({ ...t, rating: n })} className={`chip ${t.rating === n ? 'chip-active' : ''}`}>
              {n} ★
            </button>
          ))}
        </div>
      </div>
      <Toggle checked={t.active} onChange={(v) => setT({ ...t, active: v })} label="Show on website" />
      <button className="btn btn-primary w-full" disabled={busy}>
        {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />} Save review
      </button>
    </form>
  );
}

export default function TestimonialsAdmin() {
  const toast = useToast();
  const { data, setData, loading, error } = useData('/api/testimonials?all=true');
  const [editing, setEditing] = useState(null);

  const remove = async (r) => {
    if (!confirm(`Delete review by ${r.name}?`)) return;
    try {
      await api(`/api/testimonials/${r._id}`, { method: 'DELETE' });
      setData((d) => d.filter((x) => x._id !== r._id));
      toast('Review deleted');
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  return (
    <>
      <PageTitle
        title="Customer Reviews"
        subtitle="Replace the sample reviews with real ones from your customers."
        action={<button type="button" className="btn btn-primary" onClick={() => setEditing(blank())}><Plus className="h-5 w-5" /> Add Review</button>}
      />
      {loading && !data ? (
        <Loading />
      ) : error ? (
        <p className="card p-6 text-red-600">{error}</p>
      ) : !data.length ? (
        <Empty icon={MessageSquareQuote} title="No reviews yet" />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {data.map((r) => (
            <div key={r._id} className="card p-5">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold">{r.name} <span className="font-normal text-navy/50">{r.location}</span></p>
                  <Stars value={r.rating} />
                </div>
                {!r.active && <Badge>Hidden</Badge>}
              </div>
              <p className="mt-3 text-[15px] text-navy/75">“{r.text.en}”</p>
              <div className="mt-4 flex gap-2">
                <button type="button" className="btn btn-outline btn-sm flex-1" onClick={() => setEditing(r)}><Pencil className="h-4 w-4" /> Edit</button>
                <button type="button" className="btn btn-ghost btn-sm text-red-600" onClick={() => remove(r)} aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?._id ? 'Edit review' : 'Add review'}>
        {editing && (
          <Editor
            initial={editing}
            onClose={() => setEditing(null)}
            onSaved={(r) => setData((d) => (d.some((x) => x._id === r._id) ? d.map((x) => (x._id === r._id ? r : x)) : [r, ...d]))}
          />
        )}
      </Modal>
    </>
  );
}
