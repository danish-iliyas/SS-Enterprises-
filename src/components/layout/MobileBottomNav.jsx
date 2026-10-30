'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Phone, ShoppingBag, Wrench } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { useLang } from '@/components/providers/LanguageProvider';
import { useSite } from '@/components/providers/SiteProvider';
import { msg, waLink } from '@/lib/whatsapp';
import { telHref } from '@/lib/format';
import { isActive } from './navLinks';

// Fixed bottom bar on phones: the five things customers need most.
export default function MobileBottomNav() {
  const pathname = usePathname();
  const { t, lang } = useLang();
  const site = useSite();

  const item = 'flex flex-1 flex-col items-center justify-center gap-0.5 py-2 text-[12px] font-semibold';
  const links = [
    { href: '/', icon: Home, label: t('nav.home') },
    { href: '/services', icon: Wrench, label: t('nav.servicesShort') },
    { href: '/shop', icon: ShoppingBag, label: t('nav.shopShort') },
  ];

  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-navy/10 bg-white/95 shadow-[0_-8px_24px_-12px_rgba(16,36,77,.25)] backdrop-blur pb-safe lg:hidden"
    >
      <div className="flex h-16 items-stretch">
        {links.map(({ href, icon: Icon, label }) => {
          const active = isActive(pathname, href);
          return (
            <Link key={href} href={href} className={`${item} ${active ? 'text-brand' : 'text-navy/70'}`} aria-current={active ? 'page' : undefined}>
              <Icon className={`h-6 w-6 ${active ? 'stroke-[2.5]' : ''}`} />
              {label}
            </Link>
          );
        })}
        <a href={telHref(site.phone)} className={`${item} text-navy/70`}>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-brand text-white">
            <Phone className="h-4 w-4" />
          </span>
          {t('nav.call')}
        </a>
        <a href={waLink(msg.general(lang), site.whatsapp)} target="_blank" rel="noopener" className={`${item} text-navy/70`}>
          <span className="grid h-7 w-7 place-items-center rounded-full bg-whatsapp text-white">
            <WhatsAppIcon className="h-4 w-4" />
          </span>
          {t('nav.whatsapp')}
        </a>
      </div>
    </nav>
  );
}
