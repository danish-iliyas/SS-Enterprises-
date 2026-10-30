'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FolderTree, Loader2, Plus, Save, Trash2 } from 'lucide-react';
import useData from '@/components/admin/useData';
import { useToast } from '@/components/admin/Toast';
import { Empty, Loading, PageTitle, Toggle } from '@/components/admin/ui';
import { api } from '@/lib/api';

function CategoryRow({ cat, onSaved, onDeleted }) {
  const toast = useToast();
  const [v, setV] = useState({ name: cat.name, order: cat.order, active: cat.active });
  const [busy, setBusy] = useState(false);
  const dirty = JSON.stringify(v) !== JSON.stringify({ name: cat.name, order: cat.order, active: cat.active });

  const save = async () => {
    setBusy(true);
    try {
      onSaved({ ...(await api(`/api/categories/${cat._id}`, { method: 'PUT', body: v })), count: cat.count });
      toast('Category saved');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setBusy(false);
    }
  };

  const remove = async () => {
    if (!confirm(`Delete category "${cat.name.en}"?`)) return;
    try {
      await api(`/api/categories/${cat._id}`, { method: 'DELETE' });
      onDeleted(cat._id);
      toast('Category deleted');
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  return (
    <div className="card grid gap-3 p-4 md:grid-cols-[1fr_1fr_80px_auto_auto] md:items-center">
      <input className="input" value={v.name.en} onChange={(e) => setV({ ...v, name: { ...v.name, en: e.target.value } })} aria-label="English name" placeholder="English" />
      <input className="input" value={v.name.hi || ''} onChange={(e) => setV({ ...v, name: { ...v.name, hi: e.target.value } })} aria-label="Hinglish name" placeholder="Hinglish" />
      <input className="input text-center" type="number" value={v.order} onChange={(e) => setV({ ...v, order: Number(e.target.value) })} aria-label="Order" title="Display order" />
      <Toggle checked={v.active} onChange={(a) => setV({ ...v, active: a })} label={v.active ? 'Shown' : 'Hidden'} />
      <div className="flex items-center gap-2">
        <Link href={`/admin/products`} className="text-sm font-semibold text-navy/55">{cat.count} products</Link>
        <button type="button" className="btn btn-primary btn-sm" disabled={!dirty || busy} onClick={save}>
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />} Save
        </button>
        <button type="button" className="btn btn-ghost btn-sm text-red-600" onClick={remove} aria-label="Delete">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export default function CategoriesAdmin() {
  const toast = useToast();
  const { data, setData, loading, error } = useData('/api/categories?all=true');
  const [name, setName] = useState({ en: '', hi: '' });
  const [busy, setBusy] = useState(false);

  const add = async (e) => {
    e.preventDefault();
    if (!name.en.trim()) return;
    setBusy(true);
    try {
      const cat = await api('/api/categories', { method: 'POST', body: { name, order: (data?.length || 0) + 1 } });
      setData((d) => [...d, { ...cat, count: 0 }]);
      setName({ en: '', hi: '' });
      toast('Category added');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <PageTitle title="Product Categories" subtitle="Lower order number shows first in the shop." />
      <form onSubmit={add} className="card mb-6 grid gap-3 p-4 sm:grid-cols-[1fr_1fr_auto]">
        <input className="input" placeholder="New category (English)" value={name.en} onChange={(e) => setName({ ...name, en: e.target.value })} />
        <input className="input" placeholder="Hinglish name" value={name.hi} onChange={(e) => setName({ ...name, hi: e.target.value })} />
        <button className="btn btn-primary" disabled={busy || !name.en.trim()}>
          {busy ? <Loader2 className="h-5 w-5 animate-spin" /> : <Plus className="h-5 w-5" />} Add
        </button>
      </form>

      {loading && !data ? (
        <Loading />
      ) : error ? (
        <p className="card p-6 text-red-600">{error}</p>
      ) : !data.length ? (
        <Empty icon={FolderTree} title="No categories yet" />
      ) : (
        <div className="space-y-3">
          {data.map((c) => (
            <CategoryRow
              key={c._id}
              cat={c}
              onSaved={(u) => setData((d) => d.map((x) => (x._id === u._id ? u : x)))}
              onDeleted={(id) => setData((d) => d.filter((x) => x._id !== id))}
            />
          ))}
        </div>
      )}
    </>
  );
}
