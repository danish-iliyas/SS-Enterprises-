'use client';

import Link from 'next/link';
import { AlertTriangle, CalendarCheck, CheckCircle2, Clock, Inbox, Package, PhoneCall, Plus } from 'lucide-react';
import useData from '@/components/admin/useData';
import { Badge, Loading, PageTitle } from '@/components/admin/ui';
import { BOOKING_STATUS, ENQUIRY_TYPE, applianceLabel } from '@/lib/constants';
import { formatDate } from '@/lib/format';

const CARDS = [
  { key: 'totalBookings', label: 'Total Bookings', icon: CalendarCheck, tone: 'bg-brand text-white', href: '/admin/bookings' },
  { key: 'pendingBookings', label: 'Pending Bookings', icon: Clock, tone: 'bg-amber-400 text-navy', href: '/admin/bookings?status=pending' },
  { key: 'confirmedBookings', label: 'Confirmed / In Progress', icon: PhoneCall, tone: 'bg-sky-500 text-white', href: '/admin/bookings?status=confirmed' },
  { key: 'completedBookings', label: 'Completed Services', icon: CheckCircle2, tone: 'bg-green-500 text-white', href: '/admin/bookings?status=completed' },
  { key: 'totalProducts', label: 'Total Products', icon: Package, tone: 'bg-navy text-white', href: '/admin/products' },
  { key: 'newEnquiries', label: 'New Enquiries', icon: Inbox, tone: 'bg-sun text-navy', href: '/admin/enquiries?status=new' },
];

export default function Dashboard() {
  const { data, loading, error } = useData('/api/dashboard');

  return (
    <>
      <PageTitle
        title="Dashboard"
        subtitle="Today’s overview of your shop."
        action={
          <Link href="/admin/products/new" className="btn btn-primary">
            <Plus className="h-5 w-5" /> Add Product
          </Link>
        }
      />
      {loading && !data ? (
        <Loading />
      ) : error ? (
        <p className="card p-6 text-red-600">{error}</p>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
            {CARDS.map(({ key, label, icon: Icon, tone, href }) => (
              <Link key={key} href={href} className="card card-hover flex items-center gap-4 p-4 sm:p-5">
                <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${tone}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-3xl font-extrabold">{data[key]}</span>
                  <span className="block text-sm font-semibold leading-tight text-navy/55">{label}</span>
                </span>
              </Link>
            ))}
          </div>

          {data.outOfStock > 0 && (
            <Link href="/admin/products" className="mt-4 flex items-center gap-3 rounded-xl border-2 border-amber-200 bg-amber-50 p-4 font-semibold text-amber-900">
              <AlertTriangle className="h-5 w-5" /> {data.outOfStock} product(s) are out of stock or hidden. Tap to update stock.
            </Link>
          )}

          <div className="mt-6 grid gap-6 lg:grid-cols-5">
            <section className="card lg:col-span-3">
              <div className="flex items-center justify-between border-b border-navy/10 p-5">
                <h2 className="text-lg font-bold">Latest bookings</h2>
                <Link href="/admin/bookings" className="text-sm font-semibold text-brand">View all →</Link>
              </div>
              {data.recentBookings.length ? (
                <ul className="divide-y divide-navy/10">
                  {data.recentBookings.map((b) => (
                    <li key={b._id}>
                      <Link href={`/admin/bookings?open=${b._id}`} className="flex items-center justify-between gap-3 p-4 hover:bg-surface">
                        <span className="min-w-0">
                          <span className="block truncate font-semibold">{b.name} · {applianceLabel(b.appliance)}</span>
                          <span className="block truncate text-sm text-navy/55">{b.serviceType} · {formatDate(b.createdAt, true)}</span>
                        </span>
                        <Badge tone={BOOKING_STATUS[b.status]?.tone}>{BOOKING_STATUS[b.status]?.label}</Badge>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-6 text-navy/55">No bookings yet. They will appear here when customers book a service.</p>
              )}
            </section>

            <section className="card lg:col-span-2">
              <div className="flex items-center justify-between border-b border-navy/10 p-5">
                <h2 className="text-lg font-bold">Latest enquiries</h2>
                <Link href="/admin/enquiries" className="text-sm font-semibold text-brand">View all →</Link>
              </div>
              {data.recentEnquiries.length ? (
                <ul className="divide-y divide-navy/10">
                  {data.recentEnquiries.map((e) => (
                    <li key={e._id} className="p-4">
                      <div className="flex items-center justify-between gap-2">
                        <span className="truncate font-semibold">{e.name}</span>
                        <Badge tone={e.type === 'order' ? 'green' : 'blue'}>{ENQUIRY_TYPE[e.type]}</Badge>
                      </div>
                      <p className="truncate text-sm text-navy/55">{e.message || e.items?.map((i) => i.name).join(', ')}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="p-6 text-navy/55">No enquiries yet.</p>
              )}
            </section>
          </div>

          {data.byAppliance.length > 0 && (
            <section className="card mt-6 p-5">
              <h2 className="mb-4 text-lg font-bold">Bookings by appliance</h2>
              <div className="space-y-2.5">
                {data.byAppliance.map((a) => (
                  <div key={a._id} className="grid grid-cols-[140px_1fr_40px] items-center gap-3 text-sm">
                    <span className="truncate font-semibold">{applianceLabel(a._id)}</span>
                    <span className="h-3 overflow-hidden rounded-full bg-surface">
                      <span className="block h-full rounded-full bg-brand" style={{ width: `${(a.count / data.totalBookings) * 100}%` }} />
                    </span>
                    <span className="text-right font-bold">{a.count}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
