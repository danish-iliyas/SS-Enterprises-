'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  CalendarCheck, ExternalLink, FolderTree, Inbox, LayoutDashboard, LogOut, Menu, MessageSquareQuote,
  Package, Settings, UserCog, Wrench, X,
} from 'lucide-react';
import Logo from '@/components/ui/Logo';
import { ToastProvider } from './Toast';
import { api } from '@/lib/api';

const NAV = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/bookings', label: 'Bookings', icon: CalendarCheck },
  { href: '/admin/enquiries', label: 'Enquiries & Orders', icon: Inbox },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: FolderTree },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { href: '/admin/content', label: 'Website Content', icon: Settings },
  { href: '/admin/account', label: 'My Account', icon: UserCog },
];

const active = (path, href) => (href === '/admin' ? path === '/admin' : path.startsWith(href));

function SideNav({ pathname, onLogout }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-[72px] items-center px-5">
        <Logo light sub="Admin Panel" />
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
        {NAV.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex min-h-[48px] items-center gap-3 rounded-xl px-3 font-semibold transition ${
              active(pathname, href) ? 'bg-white text-navy' : 'text-white/75 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Icon className="h-5 w-5" /> {label}
          </Link>
        ))}
      </nav>
      <div className="space-y-1 border-t border-white/10 p-3">
        <a href="/" target="_blank" className="flex min-h-[44px] items-center gap-3 rounded-xl px-3 font-semibold text-white/75 hover:bg-white/10">
          <ExternalLink className="h-5 w-5" /> View website
        </a>
        <button type="button" onClick={onLogout} className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-3 font-semibold text-red-300 hover:bg-white/10">
          <LogOut className="h-5 w-5" /> Log out
        </button>
      </div>
    </div>
  );
}

export default function AdminShell({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const logout = async () => {
    await api('/api/auth/logout', { method: 'POST' }).catch(() => {});
    router.replace('/admin/login');
    router.refresh();
  };

  return (
    <ToastProvider>
      <div className="min-h-screen bg-surface">
        <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 bg-navy lg:block">
          <SideNav pathname={pathname} onLogout={logout} />
        </aside>

        {/* Mobile top bar + drawer */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-navy px-4 lg:hidden">
          <Logo light sub="Admin" />
          <button type="button" onClick={() => setOpen(true)} className="grid h-11 w-11 place-items-center rounded-lg text-white" aria-label="Menu">
            <Menu className="h-7 w-7" />
          </button>
        </header>
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-navy/60" onClick={() => setOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-72 bg-navy">
              <button type="button" onClick={() => setOpen(false)} className="absolute right-3 top-4 grid h-10 w-10 place-items-center text-white" aria-label="Close">
                <X className="h-6 w-6" />
              </button>
              <SideNav pathname={pathname} onLogout={logout} />
            </aside>
          </div>
        )}

        <main className="lg:pl-64">
          <div className="mx-auto max-w-6xl p-4 sm:p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </ToastProvider>
  );
}
