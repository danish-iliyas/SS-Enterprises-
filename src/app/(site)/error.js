'use client';

import { useEffect } from 'react';
import { Phone, RotateCcw } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { useLang } from '@/components/providers/LanguageProvider';
import { useSite } from '@/components/providers/SiteProvider';
import { msg, waLink } from '@/lib/whatsapp';
import { telHref } from '@/lib/format';

// If a page fails (e.g. database unreachable) customers can still call or WhatsApp.
export default function SiteError({ error, reset }) {
  const { t, lang } = useLang();
  const site = useSite();
  useEffect(() => console.error(error), [error]);

  return (
    <div className="section">
      <div className="container-x max-w-lg text-center">
        <h1 className="text-3xl font-extrabold">{t('misc.error')}</h1>
        <p className="mt-2 text-lg text-navy/65">{t('book.side.text')}</p>
        <div className="mt-8 grid gap-2.5">
          <a href={telHref(site.phone)} className="btn btn-primary btn-lg">
            <Phone className="h-5 w-5" /> {t('nav.callNow')}
          </a>
          <a href={waLink(msg.general(lang), site.whatsapp)} target="_blank" rel="noopener" className="btn btn-wa btn-lg">
            <WhatsAppIcon /> {t('contact.whatsappNow')}
          </a>
          <button type="button" onClick={reset} className="btn btn-outline">
            <RotateCcw className="h-5 w-5" /> {t('misc.retry')}
          </button>
        </div>
      </div>
    </div>
  );
}
