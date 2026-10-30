import Link from 'next/link';
import { CalendarCheck, Phone } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { makeT } from '@/lib/i18n';
import { msg, waLink } from '@/lib/whatsapp';
import { telHref } from '@/lib/format';

export default function CtaBand({ lang, settings, title, text, waMessage, bookHref = '/book-service' }) {
  const t = makeT(lang);
  return (
    <div className="relative overflow-hidden rounded-4xl bg-brand px-6 py-10 text-white shadow-lift sm:px-12 sm:py-12">
      <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/10" />
      <div className="pointer-events-none absolute -bottom-20 right-32 h-48 w-48 rounded-full bg-sun/25" />
      <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-extrabold !text-white sm:text-3xl">{title || t('cta.title')}</h2>
          <p className="mt-2 text-lg text-white/80">{text || t('cta.text')}</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-3 lg:shrink-0">
          <Link href={bookHref} className="btn btn-sun">
            <CalendarCheck className="h-5 w-5" /> {t('nav.book')}
          </Link>
          <a href={telHref(settings.phone)} className="btn bg-white text-navy hover:bg-white/90">
            <Phone className="h-5 w-5" /> {t('nav.callNow')}
          </a>
          <a href={waLink(waMessage || msg.general(lang), settings.whatsapp)} target="_blank" rel="noopener" className="btn btn-wa">
            <WhatsAppIcon /> {t('nav.whatsapp')}
          </a>
        </div>
      </div>
    </div>
  );
}
