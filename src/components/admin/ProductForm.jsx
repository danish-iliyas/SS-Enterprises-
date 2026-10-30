'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Loader2, Plus, Save, Trash2 } from 'lucide-react';
import useData from './useData';
import { useToast } from './Toast';
import ImageUploader from './ImageUploader';
import { BiInput, Loading, PageTitle, Toggle } from './ui';
import { api } from '@/lib/api';
import { formatINR, offerPrice } from '@/lib/format';

const blank = (discount = 30) => ({
  name: { en: '', hi: '' },
  category: '',
  brand: '',
  mrp: '',
  discountPercent: discount,
  stock: 1,
  available: true,
  featured: false,
  shortDescription: { en: '', hi: '' },
  description: { en: '', hi: '' },
  specs: [],
  images: [],
});

export default function ProductForm({ id }) {
  const router = useRouter();
  const toast = useToast();
  const { data: cats } = useData('/api/categories?all=true');
  const { data: settings } = useData('/api/settings');
  const { data: existing, loading } = useData(id ? `/api/products/${id}` : null);
  const [form, setForm] = useState(null);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (id && existing?.product) {
      const p = existing.product;
      setForm({ ...blank(), ...p, category: p.category?._id || '', mrp: p.mrp ?? '', images: p.images || [], specs: p.specs || [] });
    } else if (!id && settings && !form) {
      setForm(blank(settings.defaultDiscount ?? 30));
    }
  }, [id, existing, settings, form]);

  if ((id && loading) || !form) return <Loading />;

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));
  const price = form.mrp === '' ? null : offerPrice(Number(form.mrp), Number(form.discountPercent));

  const save = async (e) => {
    e.preventDefault();
    const errs = {};
    if (!form.name.en.trim()) errs.name = 'Enter the product name';
    if (!form.category) errs.category = 'Choose a category';
    setErrors(errs);
    if (Object.keys(errs).length) return window.scrollTo({ top: 0, behavior: 'smooth' });

    setSaving(true);
    const body = {
      ...form,
      mrp: form.mrp === '' ? null : Number(form.mrp),
      discountPercent: Number(form.discountPercent) || 0,
      stock: Math.max(0, Number(form.stock) || 0),
    };
    try {
      await api(id ? `/api/products/${id}` : '/api/products', { method: id ? 'PUT' : 'POST', body });
      toast(id ? 'Product saved' : 'Product added');
      router.push('/admin/products');
      router.refresh();
    } catch (err) {
      toast(err.message, 'error');
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} noValidate>
      <Link href="/admin/products" className="mb-3 inline-flex items-center gap-1.5 font-semibold text-brand">
        <ArrowLeft className="h-4 w-4" /> All products
      </Link>
      <PageTitle title={id ? 'Edit Product' : 'Add Product'} />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <section className="card space-y-5 p-5 sm:p-6">
            <BiInput label="Product name" value={form.name} onChange={(v) => set('name', v)} required />
            {errors.name && <p className="field-error !-mt-3">{errors.name}</p>}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="pf-cat" className="label">Category <span className="text-red-500">*</span></label>
                <select id="pf-cat" className={`input ${errors.category ? 'input-error' : ''}`} value={form.category} onChange={(e) => set('category', e.target.value)}>
                  <option value="">Choose…</option>
                  {cats?.map((c) => (
                    <option key={c._id} value={c._id}>{c.name.en}</option>
                  ))}
                </select>
                {errors.category && <p className="field-error">{errors.category}</p>}
                <Link href="/admin/categories" className="mt-1 inline-block text-sm font-semibold text-brand">Manage categories →</Link>
              </div>
              <div>
                <label htmlFor="pf-brand" className="label">Brand / compatible with</label>
                <input id="pf-brand" className="input" value={form.brand} onChange={(e) => set('brand', e.target.value)} placeholder="optional" />
              </div>
            </div>
            <BiInput label="Short description (shown on cards)" value={form.shortDescription} onChange={(v) => set('shortDescription', v)} />
            <BiInput label="Full description" value={form.description} onChange={(v) => set('description', v)} textarea rows={4} />
          </section>

          <section className="card p-5 sm:p-6">
            <ImageUploader value={form.images} onChange={(v) => set('images', v)} />
          </section>

          <section className="card p-5 sm:p-6">
            <p className="label">Technical specifications</p>
            <div className="space-y-2">
              {form.specs.map((s, i) => (
                <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
                  <input className="input" placeholder="e.g. Capacity" value={s.label} onChange={(e) => set('specs', form.specs.map((x, n) => (n === i ? { ...x, label: e.target.value } : x)))} />
                  <input className="input" placeholder="e.g. 12 Litres" value={s.value} onChange={(e) => set('specs', form.specs.map((x, n) => (n === i ? { ...x, value: e.target.value } : x)))} />
                  <button type="button" className="btn btn-ghost !px-3 text-red-600" onClick={() => set('specs', form.specs.filter((_, n) => n !== i))} aria-label="Remove">
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <button type="button" className="btn btn-outline btn-sm" onClick={() => set('specs', [...form.specs, { label: '', value: '' }])}>
                <Plus className="h-4 w-4" /> Add specification
              </button>
            </div>
          </section>
        </div>

        <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
          <section className="card space-y-4 p-5 sm:p-6">
            <h2 className="text-lg font-bold">Price & offer</h2>
            <div>
              <label htmlFor="pf-mrp" className="label">MRP (₹)</label>
              <input id="pf-mrp" type="number" min={0} inputMode="numeric" className="input" value={form.mrp} onChange={(e) => set('mrp', e.target.value)} placeholder="Leave empty for 'price on request'" />
            </div>
            <div>
              <label htmlFor="pf-disc" className="label">Offer discount (%)</label>
              <div className="flex flex-wrap gap-2">
                {[0, 10, 20, 30, 40].map((d) => (
                  <button key={d} type="button" onClick={() => set('discountPercent', d)} className={`chip ${Number(form.discountPercent) === d ? 'chip-active' : ''}`}>
                    {d}%
                  </button>
                ))}
                <input id="pf-disc" type="number" min={0} max={90} className="input !min-h-[40px] !w-20 !py-1" value={form.discountPercent} onChange={(e) => set('discountPercent', e.target.value)} aria-label="Custom discount" />
              </div>
            </div>
            <div className="rounded-xl bg-brand-50 p-4">
              <p className="text-sm font-semibold text-navy/60">Customer pays</p>
              {price != null ? (
                <p className="font-display text-3xl font-extrabold text-brand">
                  {formatINR(price)}{' '}
                  {Number(form.discountPercent) > 0 && <span className="text-base font-semibold text-navy/45 line-through">{formatINR(Number(form.mrp))}</span>}
                </p>
              ) : (
                <p className="font-bold">Price on request</p>
              )}
            </div>
          </section>

          <section className="card space-y-4 p-5 sm:p-6">
            <h2 className="text-lg font-bold">Stock</h2>
            <div>
              <label htmlFor="pf-stock" className="label">Quantity in stock</label>
              <input id="pf-stock" type="number" min={0} inputMode="numeric" className="input" value={form.stock} onChange={(e) => set('stock', e.target.value)} />
            </div>
            <Toggle checked={form.available} onChange={(v) => set('available', v)} label="Available for sale" />
            <Toggle checked={form.featured} onChange={(v) => set('featured', v)} label="Show on homepage" />
          </section>

          <button type="submit" className="btn btn-primary btn-lg w-full" disabled={saving}>
            {saving ? <Loader2 className="h-5 w-5 animate-spin" /> : <Save className="h-5 w-5" />} {id ? 'Save changes' : 'Add product'}
          </button>
        </aside>
      </div>
    </form>
  );
}
