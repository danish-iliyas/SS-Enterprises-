'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Package, Pencil, Plus, Search, Star, Trash2 } from 'lucide-react';
import useData from '@/components/admin/useData';
import { useToast } from '@/components/admin/Toast';
import { Empty, Loading, PageTitle, Pager, Toggle } from '@/components/admin/ui';
import ProductImage from '@/components/ui/ProductImage';
import { api } from '@/lib/api';
import { formatINR } from '@/lib/format';

function StockInput({ product, onSave }) {
  const [v, setV] = useState(product.stock);
  useEffect(() => setV(product.stock), [product.stock]);
  return (
    <input
      type="number"
      min={0}
      inputMode="numeric"
      className="input !min-h-[40px] !w-20 !px-2 !py-1 text-center"
      value={v}
      onChange={(e) => setV(e.target.value)}
      onBlur={() => Number(v) !== product.stock && onSave({ stock: Math.max(0, Number(v) || 0) })}
      aria-label="Stock"
    />
  );
}

export default function ProductsAdmin() {
  const toast = useToast();
  const [filters, setFilters] = useState({ category: '', q: '', page: 1 });
  const [search, setSearch] = useState('');
  const { data: cats } = useData('/api/categories?all=true');

  const url = useMemo(() => {
    const qs = new URLSearchParams({ limit: '30', sort: 'newest' });
    Object.entries(filters).forEach(([k, v]) => v && qs.set(k, v));
    return `/api/products?${qs}`;
  }, [filters]);
  const { data, setData, loading, error } = useData(url);

  useEffect(() => {
    const id = setTimeout(() => setFilters((f) => (f.q === search ? f : { ...f, q: search, page: 1 })), 400);
    return () => clearTimeout(id);
  }, [search]);

  const patch = async (p, body) => {
    try {
      const updated = await api(`/api/products/${p._id}`, { method: 'PATCH', body });
      setData((d) => ({ ...d, items: d.items.map((x) => (x._id === p._id ? updated : x)) }));
      toast('Product updated');
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const remove = async (p) => {
    if (!confirm(`Delete "${p.name.en}"? Its photos will also be deleted.`)) return;
    try {
      await api(`/api/products/${p._id}`, { method: 'DELETE' });
      setData((d) => ({ ...d, items: d.items.filter((x) => x._id !== p._id), total: d.total - 1 }));
      toast('Product deleted');
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  return (
    <>
      <PageTitle
        title="Products"
        subtitle="Change stock and availability right here. Tap Edit for price, photos and details."
        action={
          <Link href="/admin/products/new" className="btn btn-primary">
            <Plus className="h-5 w-5" /> Add Product
          </Link>
        }
      />

      <div className="card mb-4 grid gap-3 p-4 sm:grid-cols-2">
        <label className="relative">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/40" />
          <input className="input !pl-11" placeholder="Search products" value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
        <select className="input" value={filters.category} onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value, page: 1 }))} aria-label="Category">
          <option value="">All categories</option>
          {cats?.map((c) => (
            <option key={c._id} value={c.slug}>{c.name.en} ({c.count})</option>
          ))}
        </select>
      </div>

      {loading && !data ? (
        <Loading />
      ) : error ? (
        <p className="card p-6 text-red-600">{error}</p>
      ) : !data.items.length ? (
        <Empty
          icon={Package}
          title="No products found"
          action={<Link href="/admin/products/new" className="btn btn-primary"><Plus className="h-5 w-5" /> Add Product</Link>}
        />
      ) : (
        <>
          <div className="space-y-3">
            {data.items.map((p) => (
              <div key={p._id} className={`card flex flex-col gap-4 p-4 md:flex-row md:items-center ${!p.available ? 'opacity-75' : ''}`}>
                <div className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-brand-50">
                    <ProductImage product={p} alt="" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand">{p.category?.name?.en}</p>
                    <p className="line-clamp-2 font-bold">{p.name.en}</p>
                    <p className="text-[15px]">
                      {p.price != null ? (
                        <>
                          <span className="font-bold">{formatINR(p.price)}</span>{' '}
                          <span className="text-navy/45 line-through">{formatINR(p.mrp)}</span>{' '}
                          <span className="font-semibold text-green-700">{p.discountPercent}% off</span>
                        </>
                      ) : (
                        <span className="text-navy/55">Price on request</span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-3 border-t border-navy/10 pt-3 md:border-0 md:pt-0">
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    Stock <StockInput product={p} onSave={(b) => patch(p, b)} />
                  </label>
                  <Toggle checked={p.available} onChange={(v) => patch(p, { available: v })} label={p.available ? 'Available' : 'Hidden'} />
                  <button
                    type="button"
                    onClick={() => patch(p, { featured: !p.featured })}
                    className={`grid h-10 w-10 place-items-center rounded-lg ${p.featured ? 'bg-sun text-navy' : 'bg-surface text-navy/40'}`}
                    title={p.featured ? 'Shown on homepage' : 'Show on homepage'}
                    aria-label="Featured on homepage"
                  >
                    <Star className={`h-5 w-5 ${p.featured ? 'fill-navy' : ''}`} />
                  </button>
                  <Link href={`/admin/products/${p._id}`} className="btn btn-outline btn-sm">
                    <Pencil className="h-4 w-4" /> Edit
                  </Link>
                  <button type="button" onClick={() => remove(p)} className="btn btn-ghost btn-sm text-red-600" aria-label="Delete">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <Pager page={data.page} pages={data.pages} onPage={(pg) => setFilters((f) => ({ ...f, page: pg }))} />
        </>
      )}
    </>
  );
}
