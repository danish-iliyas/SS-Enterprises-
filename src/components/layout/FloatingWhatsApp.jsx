'use client';

import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { useLang } from '@/components/providers/LanguageProvider';
import { useSite } from '@/components/providers/SiteProvider';
import { msg, waLink } from '@/lib/whatsapp';

export default function FloatingWhatsApp() {
  const { lang, t } = useLang();
  const site = useSite();
  return (
    <a
      href={waLink(msg.general(lang), site.whatsapp)}
      target="_blank"
      rel="noopener"
      aria-label={`${t('nav.whatsapp')} – SS Enterprises`}
      className="group fixed bottom-[84px] right-4 z-40 flex items-center gap-2 lg:bottom-6 lg:right-6"
    >
      <span className="pointer-events-none hidden translate-x-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-navy opacity-0 shadow-lift transition group-hover:translate-x-0 group-hover:opacity-100 lg:block">
        {t('contact.whatsappNow')}
      </span>
      <span className="grid h-14 w-14 animate-ring place-items-center rounded-full bg-whatsapp text-white shadow-lift transition group-hover:scale-105">
        <WhatsAppIcon className="h-8 w-8" />
      </span>
    </a>
  );
}
