'use client';

import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CalendarCheck, Loader2, MapPin, Phone, Search, StickyNote, Trash2 } from 'lucide-react';
import useData from '@/components/admin/useData';
import { useToast } from '@/components/admin/Toast';
import { Badge, Empty, Loading, Modal, PageTitle, Pager } from '@/components/admin/ui';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { api } from '@/lib/api';
import { APPLIANCES, BOOKING_STATUS, TIME_SLOTS, applianceLabel } from '@/lib/constants';
import { formatDate, telHref } from '@/lib/format';
import { waLink } from '@/lib/whatsapp';

const STATUS_KEYS = Object.keys(BOOKING_STATUS);

function BookingDetail({ booking, onChange, onDelete }) {
  const toast = useToast();
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState('');

  const update = async (patch, label) => {
    setBusy(label);
    try {
      onChange(await api(`/api/bookings/${booking._id}`, { method: 'PATCH', body: patch }));
      toast('Booking updated');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setBusy('');
    }
  };

  const addNote = async (e) => {
    e.preventDefault();
    if (!note.trim()) return;
    setBusy('note');
    try {
      onChange(await api(`/api/bookings/${booking._id}/notes`, { method: 'POST', body: { text: note } }));
      setNote('');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setBusy('');
    }
  };

  const remove = async () => {
    if (!confirm(`Delete booking ${booking.bookingNo}? This cannot be undone.`)) return;
    try {
      await api(`/api/bookings/${booking._id}`, { method: 'DELETE' });
      toast('Booking deleted');
      onDelete(booking._id);
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  const greet = `Namaste ${booking.name} ji, SS Enterprises se baat kar rahe hain. Aapki ${applianceLabel(booking.appliance)} (${booking.serviceType}) booking ${booking.bookingNo} ke baare mein.`;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <span className="font-display text-lg font-bold text-brand">{booking.bookingNo}</span>
        <Badge tone={BOOKING_STATUS[booking.status].tone}>{BOOKING_STATUS[booking.status].label}</Badge>
        <span className="text-sm text-navy/50">Received {formatDate(booking.createdAt, true)}</span>
      </div>

      <div className="rounded-2xl bg-surface p-4">
        <p className="text-xl font-bold">{booking.name}</p>
        <p className="font-semibold text-navy/70">+91 {booking.mobile}</p>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href={telHref(booking.mobile)} className="btn btn-primary btn-sm">
            <Phone className="h-4 w-4" /> Call
          </a>
          <a href={waLink(greet, `91${booking.mobile}`)} target="_blank" rel="noopener" className="btn btn-wa btn-sm">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>

      <dl className="grid gap-3 text-[15px] sm:grid-cols-2">
        <div>
          <dt className="text-sm text-navy/50">Appliance</dt>
          <dd className="font-semibold">{applianceLabel(booking.appliance)}</dd>
        </div>
        <div>
          <dt className="text-sm text-navy/50">Service</dt>
          <dd className="font-semibold">{booking.serviceType}</dd>
        </div>
        <div>
          <dt className="text-sm text-navy/50">Preferred date</dt>
          <dd className="font-semibold">{booking.preferredDate ? formatDate(booking.preferredDate) : '—'}</dd>
        </div>
        <div>
          <dt className="text-sm text-navy/50">Preferred time</dt>
          <dd className="font-semibold">{TIME_SLOTS.find((s) => s.value === booking.preferredTime)?.en || '—'}</dd>
        </div>
        <div className="sm:col-span-2">
          <dt className="text-sm text-navy/50">Address</dt>
          <dd className="flex items-start gap-1.5 font-semibold">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {booking.address}
          </dd>
        </div>
        {booking.problem && (
          <div className="sm:col-span-2">
            <dt className="text-sm text-navy/50">Problem</dt>
            <dd className="font-semibold">{booking.problem}</dd>
          </div>
        )}
      </dl>

      <div>
        <p className="label">Update status</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {STATUS_KEYS.map((s) => (
            <button
              key={s}
              type="button"
              disabled={!!busy}
              onClick={() => booking.status !== s && update({ status: s }, s)}
              className={`btn btn-sm !min-h-[46px] ${booking.status === s ? 'btn-navy' : 'btn-outline'}`}
            >
              {busy === s && <Loader2 className="h-4 w-4 animate-spin" />} {BOOKING_STATUS[s].label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="label flex items-center gap-2">
          <StickyNote className="h-4 w-4" /> Internal notes
        </p>
        {booking.notes?.length > 0 && (
          <ul className="mb-3 space-y-2">
            {booking.notes.map((n) => (
              <li key={n._id} className="rounded-xl bg-sun/15 p-3 text-[15px]">
                {n.text}
                <span className="mt-1 block text-xs text-navy/50">{formatDate(n.createdAt, true)}</span>
              </li>
            ))}
          </ul>
        )}
        <form onSubmit={addNote} className="flex gap-2">
          <input className="input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Technician Ravi assigned, visit at 4 PM" />
          <button className="btn btn-primary" disabled={busy === 'note'}>
            {busy === 'note' ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Add'}
          </button>
        </form>
      </div>

      <button type="button" onClick={remove} className="btn btn-ghost w-full text-red-600 hover:!bg-red-50">
        <Trash2 className="h-5 w-5" /> Delete booking
      </button>
    </div>
  );
}

export default function BookingsManager() {
  const params = useSearchParams();
  const [filters, setFilters] = useState({
    status: params.get('status') || '',
    appliance: '',
    from: '',
    to: '',
    q: '',
    page: 1,
  });
  const [search, setSearch] = useState('');
  const [openId, setOpenId] = useState(params.get('open'));

  const url = useMemo(() => {
    const qs = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => v && qs.set(k, v));
    return `/api/bookings?${qs}`;
  }, [filters]);
  const { data, setData, loading, error } = useData(url);

  useEffect(() => {
    const id = setTimeout(() => setFilters((f) => (f.q === search ? f : { ...f, q: search, page: 1 })), 400);
    return () => clearTimeout(id);
  }, [search]);

  const setF = (k, v) => setFilters((f) => ({ ...f, [k]: v, page: 1 }));
  const open = data?.items.find((b) => b._id === openId);
  const [single, setSingle] = useState(null);

  // Booking opened from the dashboard may not be on the current page — fetch it directly.
  useEffect(() => {
    if (openId && data && !open) api(`/api/bookings/${openId}`).then(setSingle).catch(() => setOpenId(null));
  }, [openId, data, open]);
  const current = open || (single?._id === openId ? single : null);

  const replace = (b) => {
    setData((d) => ({ ...d, items: d.items.map((x) => (x._id === b._id ? b : x)) }));
    if (single?._id === b._id) setSingle(b);
  };

  return (
    <>
      <PageTitle title="Service Bookings" subtitle="Call the customer, then update the status." />

      <div className="no-scrollbar -mx-4 mb-4 flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <button type="button" onClick={() => setF('status', '')} className={`chip shrink-0 ${!filters.status ? 'chip-active' : ''}`}>
          All
        </button>
        {STATUS_KEYS.map((s) => (
          <button key={s} type="button" onClick={() => setF('status', s)} className={`chip shrink-0 ${filters.status === s ? 'chip-active' : ''}`}>
            {BOOKING_STATUS[s].label}
          </button>
        ))}
      </div>

      <div className="card mb-4 grid gap-3 p-4 sm:grid-cols-2 lg:grid-cols-4">
        <label className="relative sm:col-span-2 lg:col-span-1">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/40" />
          <input className="input !pl-11" placeholder="Name, mobile, booking no." value={search} onChange={(e) => setSearch(e.target.value)} />
        </label>
        <select className="input" value={filters.appliance} onChange={(e) => setF('appliance', e.target.value)} aria-label="Appliance">
          <option value="">All appliances</option>
          {APPLIANCES.map((a) => (
            <option key={a.value} value={a.value}>{a.label.en}</option>
          ))}
        </select>
        <input type="date" className="input" value={filters.from} onChange={(e) => setF('from', e.target.value)} aria-label="From date" title="From date" />
        <input type="date" className="input" value={filters.to} onChange={(e) => setF('to', e.target.value)} aria-label="To date" title="To date" />
      </div>

      {loading && !data ? (
        <Loading />
      ) : error ? (
        <p className="card p-6 text-red-600">{error}</p>
      ) : !data.items.length ? (
        <Empty icon={CalendarCheck} title="No bookings found" text="Try a different filter." />
      ) : (
        <>
          <p className="mb-2 text-sm font-semibold text-navy/55">{data.total} booking(s)</p>
          <div className="card divide-y divide-navy/10 overflow-hidden">
            {data.items.map((b) => (
              <button key={b._id} type="button" onClick={() => setOpenId(b._id)} className="grid w-full gap-1 p-4 text-left hover:bg-surface sm:grid-cols-[1.3fr_1fr_1fr_auto] sm:items-center sm:gap-4">
                <span className="min-w-0">
                  <span className="block truncate font-bold">{b.name}</span>
                  <span className="block text-sm text-navy/60">+91 {b.mobile}</span>
                </span>
                <span className="min-w-0 text-[15px]">
                  <span className="block truncate font-semibold">{applianceLabel(b.appliance)}</span>
                  <span className="block truncate text-sm text-navy/60">{b.serviceType}</span>
                </span>
                <span className="text-sm text-navy/60">
                  {formatDate(b.createdAt, true)}
                  {b.preferredDate && <span className="block">Visit: {formatDate(b.preferredDate)}</span>}
                </span>
                <span>
                  <Badge tone={BOOKING_STATUS[b.status].tone}>{BOOKING_STATUS[b.status].label}</Badge>
                </span>
              </button>
            ))}
          </div>
          <Pager page={data.page} pages={data.pages} onPage={(p) => setFilters((f) => ({ ...f, page: p }))} />
        </>
      )}

      <Modal open={!!current} onClose={() => setOpenId(null)} title="Booking details">
        {current && (
          <BookingDetail
            booking={current}
            onChange={replace}
            onDelete={(id) => {
              setData((d) => ({ ...d, items: d.items.filter((x) => x._id !== id), total: d.total - 1 }));
              setOpenId(null);
            }}
          />
        )}
      </Modal>
    </>
  );
}
