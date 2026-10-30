'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { CalendarCheck, Clock, MapPin, Menu, Phone, ShoppingCart, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import LanguageSwitch from './LanguageSwitch';
import { useLang } from '@/components/providers/LanguageProvider';
import { useSite } from '@/components/providers/SiteProvider';
import { useCart } from '@/components/providers/CartProvider';
import { msg, waLink } from '@/lib/whatsapp';
import { prettyPhone, telHref } from '@/lib/format';
import { NAV_LINKS as NAV, isActive } from './navLinks';

function CartButton() {
  const { count } = useCart();
  const { t } = useLang();
  return (
    <Link href="/cart" className="btn btn-ghost relative !min-h-[44px] !px-2 sm:!px-3" aria-label={`${t('nav.cart')} (${count})`}>
      <ShoppingCart className="h-6 w-6" />
      {count > 0 && (
        <span className="absolute right-0.5 top-0.5 grid h-5 min-w-[20px] place-items-center rounded-full bg-sun px-1 text-xs font-extrabold text-navy ring-2 ring-white">
          {count}
        </span>
      )}
    </Link>
  );
}

export default function Header() {
  const pathname = usePathname();
  const { t, tx, lang } = useLang();
  const site = useSite();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => (document.body.style.overflow = '');
  }, [open]);

  const wa = waLink(msg.general(lang), site.whatsapp);

  return (
    <>
      {/* Top info strip (tablet & desktop) */}
      <div className="hidden bg-navy text-sm text-white/80 md:block">
        <div className="container-x flex h-10 items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-sun" />
              {tx(site.address) || 'Garwar Road, Ballia'}
            </span>
            {tx(site.hours) && (
              <span className="hidden items-center gap-1.5 lg:inline-flex">
                <Clock className="h-4 w-4 text-sun" />
                {tx(site.hours)}
              </span>
            )}
          </div>
          <a href={telHref(site.phone)} className="inline-flex items-center gap-1.5 font-semibold text-white hover:text-sun">
            <Phone className="h-4 w-4 text-sun" /> +91 {prettyPhone(site.phone)}
          </a>
        </div>
      </div>

      <header
        className={`sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow ${
          scrolled ? 'border-navy/10 shadow-[0_6px_20px_-12px_rgba(16,36,77,.25)]' : 'border-transparent'
        }`}
      >
        <div className="container-x flex h-[68px] items-center justify-between gap-2 sm:h-[72px] sm:gap-3">
          <Link href="/" aria-label="SS Enterprises – Home" className="shrink-0">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-[15px] font-semibold transition ${
                  isActive(pathname, n.href) ? 'bg-brand-50 text-brand' : 'text-navy/80 hover:text-brand'
                }`}
              >
                {t(n.key.replace('nav.', 'navd.'))}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            <LanguageSwitch compact className="xl:hidden" />
            <LanguageSwitch className="hidden xl:inline-flex" />
            <CartButton />
            <a href={telHref(site.phone)} className="btn btn-outline btn-sm hidden !min-h-[44px] whitespace-nowrap lg:inline-flex">
              <Phone className="h-4 w-4" /> {t('nav.call')}
            </a>
            <a href={wa} target="_blank" rel="noopener" className="btn btn-wa btn-sm hidden !min-h-[44px] whitespace-nowrap lg:inline-flex">
              <WhatsAppIcon /> {t('nav.whatsapp')}
            </a>
            <button
              type="button"
              className="btn btn-ghost !min-h-[44px] !px-1.5 sm:!px-2.5 lg:hidden"
              onClick={() => setOpen(true)}
              aria-label={t('nav.menu')}
              aria-expanded={open}
            >
              <Menu className="h-7 w-7" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-50 overflow-hidden lg:hidden ${open ? '' : 'pointer-events-none invisible'}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-navy/50 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 flex h-full w-[86%] max-w-sm flex-col bg-white shadow-2xl transition-transform duration-300 ${
            open ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex h-[72px] items-center justify-between border-b border-navy/10 px-4">
            <Logo />
            <button type="button" onClick={() => setOpen(false)} className="btn btn-ghost !px-2.5" aria-label="Close">
              <X className="h-7 w-7" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto p-4" aria-label="Mobile">
            {NAV.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className={`mb-1 flex min-h-[54px] items-center rounded-xl px-4 text-lg font-semibold ${
                  isActive(pathname, n.href) ? 'bg-brand-50 text-brand' : 'text-navy hover:bg-surface'
                }`}
              >
                {t(n.key)}
              </Link>
            ))}
            <div className="mt-4 rounded-2xl bg-surface p-4">
              <p className="mb-2 text-sm font-semibold text-navy/60">{t('nav.language')}</p>
              <LanguageSwitch className="w-full justify-between [&>a]:flex-1" />
            </div>
          </nav>
          <div className="grid gap-2 border-t border-navy/10 p-4 pb-safe">
            <Link href="/book-service" className="btn btn-primary w-full">
              <CalendarCheck className="h-5 w-5" /> {t('nav.book')}
            </Link>
            <div className="grid grid-cols-2 gap-2">
              <a href={telHref(site.phone)} className="btn btn-outline">
                <Phone className="h-5 w-5" /> {t('nav.call')}
              </a>
              <a href={wa} target="_blank" rel="noopener" className="btn btn-wa">
                <WhatsAppIcon /> {t('nav.whatsapp')}
              </a>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
