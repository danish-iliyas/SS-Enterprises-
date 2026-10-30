'use client';

import { useEffect } from 'react';
import { Loader2, X } from 'lucide-react';

const TONES = {
  amber: 'bg-amber-100 text-amber-800',
  sky: 'bg-sky-100 text-sky-800',
  blue: 'bg-blue-100 text-blue-800',
  violet: 'bg-violet-100 text-violet-800',
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-700',
  slate: 'bg-slate-100 text-slate-700',
};

export function Badge({ tone = 'slate', children }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-bold ${TONES[tone]}`}>{children}</span>;
}

export function Spinner({ className = 'h-6 w-6' }) {
  return <Loader2 className={`animate-spin text-brand ${className}`} />;
}

export function PageTitle({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-2xl font-extrabold sm:text-3xl">{title}</h1>
        {subtitle && <p className="mt-1 text-navy/60">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Empty({ icon: Icon, title, text, action }) {
  return (
    <div className="card p-10 text-center">
      {Icon && <Icon className="mx-auto h-12 w-12 text-navy/25" />}
      <p className="mt-3 text-lg font-bold">{title}</p>
      {text && <p className="mt-1 text-navy/55">{text}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function Loading() {
  return (
    <div className="grid h-48 place-items-center">
      <Spinner className="h-8 w-8" />
    </div>
  );
}

export function Modal({ open, onClose, title, children, wide = false }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-navy/50 sm:items-center sm:p-4" onClick={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
        className={`flex max-h-[92vh] w-full flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl ${wide ? 'sm:max-w-3xl' : 'sm:max-w-lg'}`}
      >
        <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
          <h2 className="text-lg font-bold">{title}</h2>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-lg hover:bg-surface" aria-label="Close">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="overflow-y-auto p-5">{children}</div>
      </div>
    </div>
  );
}

export function Pager({ page, pages, onPage }) {
  if (pages <= 1) return null;
  return (
    <div className="mt-5 flex items-center justify-center gap-2">
      <button type="button" className="btn btn-outline btn-sm" disabled={page <= 1} onClick={() => onPage(page - 1)}>
        ← Prev
      </button>
      <span className="px-2 text-sm font-semibold text-navy/60">
        Page {page} of {pages}
      </span>
      <button type="button" className="btn btn-outline btn-sm" disabled={page >= pages} onClick={() => onPage(page + 1)}>
        Next →
      </button>
    </div>
  );
}

export function Toggle({ checked, onChange, label }) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-3">
      <span className="relative">
        <input type="checkbox" className="peer sr-only" checked={!!checked} onChange={(e) => onChange(e.target.checked)} />
        <span className="block h-7 w-12 rounded-full bg-navy/15 transition peer-checked:bg-green-500" />
        <span className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow transition peer-checked:translate-x-5" />
      </span>
      {label && <span className="font-semibold">{label}</span>}
    </label>
  );
}

// English + Hinglish inputs side by side for bilingual content.
export function BiInput({ label, value, onChange, textarea = false, rows = 3, required = false }) {
  const v = value || { en: '', hi: '' };
  const Tag = textarea ? 'textarea' : 'input';
  return (
    <div>
      <p className="label">
        {label} {required && <span className="text-red-500">*</span>}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        <div className="relative">
          <span className="absolute right-3 top-2 rounded bg-brand-50 px-1.5 text-[11px] font-bold text-brand">EN</span>
          <Tag className="input !pr-12" rows={rows} value={v.en || ''} onChange={(e) => onChange({ ...v, en: e.target.value })} placeholder="English" />
        </div>
        <div className="relative">
          <span className="absolute right-3 top-2 rounded bg-sun/30 px-1.5 text-[11px] font-bold text-navy">HI</span>
          <Tag className="input !pr-12" rows={rows} value={v.hi || ''} onChange={(e) => onChange({ ...v, hi: e.target.value })} placeholder="Hinglish" />
        </div>
      </div>
    </div>
  );
}

// Edits a list of bilingual lines (one per row).
export function BiList({ label, items = [], onChange }) {
  const update = (i, patch) => onChange(items.map((it, n) => (n === i ? { ...it, ...patch } : it)));
  return (
    <div>
      <p className="label">{label}</p>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="grid gap-2 rounded-xl bg-surface p-2 sm:grid-cols-[1fr_1fr_auto]">
            <input className="input" value={it.en || ''} onChange={(e) => update(i, { en: e.target.value })} placeholder="English" />
            <input className="input" value={it.hi || ''} onChange={(e) => update(i, { hi: e.target.value })} placeholder="Hinglish" />
            <button type="button" className="btn btn-ghost btn-sm text-red-600" onClick={() => onChange(items.filter((_, n) => n !== i))}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" className="btn btn-outline btn-sm" onClick={() => onChange([...items, { en: '', hi: '' }])}>
          + Add line
        </button>
      </div>
    </div>
  );
}
