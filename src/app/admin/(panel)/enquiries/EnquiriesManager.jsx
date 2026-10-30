'use client';

import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Inbox, Loader2, MapPin, Phone, Trash2 } from 'lucide-react';
import useData from '@/components/admin/useData';
import { useToast } from '@/components/admin/Toast';
import { Badge, Empty, Loading, Modal, PageTitle, Pager } from '@/components/admin/ui';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { api } from '@/lib/api';
import { ENQUIRY_STATUS, ENQUIRY_TYPE } from '@/lib/constants';
import { formatDate, formatINR, telHref } from '@/lib/format';
import { waLink } from '@/lib/whatsapp';

function EnquiryDetail({ enquiry, onChange, onDelete }) {
  const toast = useToast();
  const [note, setNote] = useState(enquiry.adminNote || '');
  const [busy, setBusy] = useState('');

  const update = async (patch, key) => {
    setBusy(key);
    try {
      onChange(await api(`/api/enquiries/${enquiry._id}`, { method: 'PATCH', body: patch }));
      toast('Saved');
    } catch (err) {
      toast(err.message, 'error');
    } finally {
      setBusy('');
    }
  };

  const remove = async () => {
    if (!confirm('Delete this enquiry?')) return;
    try {
      await api(`/api/enquiries/${enquiry._id}`, { method: 'DELETE' });
      toast('Enquiry deleted');
      onDelete(enquiry._id);
    } catch (err) {
      toast(err.message, 'error');
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone={enquiry.type === 'order' ? 'green' : 'blue'}>{ENQUIRY_TYPE[enquiry.type]}</Badge>
        <Badge tone={ENQUIRY_STATUS[enquiry.status].tone}>{ENQUIRY_STATUS[enquiry.status].label}</Badge>
        <span className="text-sm text-navy/50">{formatDate(enquiry.createdAt, true)}</span>
      </div>

      <div className="rounded-2xl bg-surface p-4">
        <p className="text-xl font-bold">{enquiry.name}</p>
        <p className="font-semibold text-navy/70">+91 {enquiry.mobile}</p>
        {enquiry.address && (
          <p className="mt-1 flex items-start gap-1.5 text-[15px]">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand" /> {enquiry.address}
          </p>
        )}
        <div className="mt-3 grid grid-cols-2 gap-2">
          <a href={telHref(enquiry.mobile)} className="btn btn-primary btn-sm">
            <Phone className="h-4 w-4" /> Call
          </a>
          <a href={waLink(`Namaste ${enquiry.name} ji, SS Enterprises se baat kar rahe hain.`, `91${enquiry.mobile}`)} target="_blank" rel="noopener" className="btn btn-wa btn-sm">
            <WhatsAppIcon className="h-4 w-4" /> WhatsApp
          </a>
        </div>
      </div>

      {enquiry.message && (
        <div>
          <p className="text-sm text-navy/50">Message</p>
          <p className="whitespace-pre-line font-medium">{enquiry.message}</p>
        </div>
      )}

      {enquiry.items?.length > 0 && (
        <div className="overflow-hidden rounded-2xl border border-navy/10">
          <table className="w-full text-[15px]">
            <thead className="bg-surface text-left text-sm text-navy/60">
              <tr>
                <th className="p-3">Item</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy/10">
              {enquiry.items.map((i, n) => (
                <tr key={n}>
                  <td className="p-3 font-medium">{i.name}</td>
                  <td className="p-3 text-center">{i.qty}</td>
                  <td className="p-3 text-right">{i.price != null ? formatINR(i.price * i.qty) : 'On request'}</td>
                </tr>
              ))}
            </tbody>
            {enquiry.total != null && (
              <tfoot>
                <tr className="bg-surface font-bold">
                  <td className="p-3" colSpan={2}>Total (offer price)</td>
                  <td className="p-3 text-right text-brand">{formatINR(enquiry.total)}</td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      )}

      <div>
        <p className="label">Status</p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {Object.entries(ENQUIRY_STATUS).map(([k, s]) => (
            <button key={k} type="button" disabled={!!busy} onClick={() => enquiry.status !== k && update({ status: k }, k)} className={`btn btn-sm !min-h-[46px] ${enquiry.status === k ? 'btn-navy' : 'btn-outline'}`}>
              {busy === k && <Loader2 className="h-4 w-4 animate-spin" />} {s.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="enq-note" className="label">Internal note</label>
        <textarea id="enq-note" rows={2} className="input" value={note} onChange={(e) => setNote(e.target.value)} placeholder="e.g. Delivered on 12 Nov, paid cash" />
        <button type="button" className="btn btn-primary btn-sm mt-2" disabled={busy === 'note'} onClick={() => update({ adminNote: note }, 'note')}>
          {busy === 'note' && <Loader2 className="h-4 w-4 animate-spin" />} Save note
        </button>
      </div>

      <button type="button" onClick={remove} className="btn btn-ghost w-full text-red-600 hover:!bg-red-50">
        <Trash2 className="h-5 w-5" /> Delete enquiry
      </button>
    </div>
  );
}

export default function EnquiriesManager() {
  const params = useSearchParams();
  const [filters, setFilters] = useState({ type: '', status: params.get('status') || '', page: 1 });
  const [openId, setOpenId] = useState(null);

  const url = useMemo(() => {
    const qs = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => v && qs.set(k, v));
    return `/api/enquiries?${qs}`;
  }, [filters]);
  const { data, setData, loading, error } = useData(url);
  const open = data?.items.find((e) => e._id === openId);
  const setF = (k, v) => setFilters((f) => ({ ...f, [k]: v, page: 1 }));

  return (
    <>
      <PageTitle title="Enquiries & Orders" subtitle="Contact form messages, product enquiries and cart orders." />

      <div className="card mb-4 grid gap-3 p-4 sm:grid-cols-2">
        <select className="input" value={filters.type} onChange={(e) => setF('type', e.target.value)} aria-label="Type">
          <option value="">All types</option>
          {Object.entries(ENQUIRY_TYPE).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
        <select className="input" value={filters.status} onChange={(e) => setF('status', e.target.value)} aria-label="Status">
          <option value="">All statuses</option>
          {Object.entries(ENQUIRY_STATUS).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>
      </div>

      {loading && !data ? (
        <Loading />
      ) : error ? (
        <p className="card p-6 text-red-600">{error}</p>
      ) : !data.items.length ? (
        <Empty icon={Inbox} title="No enquiries found" />
      ) : (
        <>
          <div className="card divide-y divide-navy/10 overflow-hidden">
            {data.items.map((e) => (
              <button key={e._id} type="button" onClick={() => setOpenId(e._id)} className="grid w-full gap-1 p-4 text-left hover:bg-surface sm:grid-cols-[1.2fr_2fr_auto] sm:items-center sm:gap-4">
                <span className="min-w-0">
                  <span className="block truncate font-bold">{e.name}</span>
                  <span className="block text-sm text-navy/60">+91 {e.mobile} · {formatDate(e.createdAt, true)}</span>
                </span>
                <span className="min-w-0 truncate text-[15px] text-navy/70">
                  {e.items?.length ? `${e.items.length} item(s)${e.total != null ? ` · ${formatINR(e.total)}` : ''}` : e.message}
                </span>
                <span className="flex gap-1.5">
                  <Badge tone={e.type === 'order' ? 'green' : 'blue'}>{ENQUIRY_TYPE[e.type]}</Badge>
                  <Badge tone={ENQUIRY_STATUS[e.status].tone}>{ENQUIRY_STATUS[e.status].label}</Badge>
                </span>
              </button>
            ))}
          </div>
          <Pager page={data.page} pages={data.pages} onPage={(p) => setFilters((f) => ({ ...f, page: p }))} />
        </>
      )}

      <Modal open={!!open} onClose={() => setOpenId(null)} title="Enquiry details">
        {open && (
          <EnquiryDetail
            enquiry={open}
            onChange={(en) => setData((d) => ({ ...d, items: d.items.map((x) => (x._id === en._id ? en : x)) }))}
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
