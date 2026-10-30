import Link from 'next/link';
import { Clock, MapPin, Phone } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { makeT, pickLang } from '@/lib/i18n';
import { msg, waLink } from '@/lib/whatsapp';
import { prettyPhone, telHref } from '@/lib/format';
import { NAV_LINKS } from './navLinks';

export default function Footer({ lang, settings, services = [] }) {
  const t = makeT(lang);
  const tx = (o) => pickLang(o, lang);
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-navy text-white/75">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand/30 blur-3xl" />
      <div className="container-x relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo light />
          <p className="mt-4 max-w-sm">{t('footer.about')}</p>
          <p className="mt-3 font-display text-lg font-semibold text-sun">{t('brand.tagline')}</p>
          <a
            href={waLink(msg.general(lang), settings.whatsapp)}
            target="_blank"
            rel="noopener"
            className="btn btn-wa mt-5"
          >
            <WhatsAppIcon /> {t('contact.whatsappNow')}
          </a>
        </div>

        <div className="lg:col-span-2">
          <h3 className="mb-4 text-lg font-bold !text-white">{t('footer.quick')}</h3>
          <ul className="space-y-2.5">
            {NAV_LINKS.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-sun">
                  {t(n.key)}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/book-service" className="hover:text-sun">
                {t('nav.book')}
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-4 text-lg font-bold !text-white">{t('footer.services')}</h3>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={`/services/${s.slug}`} className="hover:text-sun">
                  {tx(s.name)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="mb-4 text-lg font-bold !text-white">{t('footer.contact')}</h3>
          <ul className="space-y-4">
            <li className="flex gap-3">
              <MapPin className="mt-1 h-5 w-5 shrink-0 text-sun" />
              <span>{tx(settings.address)}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-1 h-5 w-5 shrink-0 text-sun" />
              <a href={telHref(settings.phone)} className="font-semibold text-white hover:text-sun">
                +91 {prettyPhone(settings.phone)}
              </a>
            </li>
            <li className="flex gap-3">
              <WhatsAppIcon className="mt-1 h-5 w-5 shrink-0 text-sun" />
              <a href={waLink('', settings.whatsapp)} target="_blank" rel="noopener" className="font-semibold text-white hover:text-sun">
                +91 {prettyPhone(settings.whatsapp)}
              </a>
            </li>
            {tx(settings.hours) && (
              <li className="flex gap-3">
                <Clock className="mt-1 h-5 w-5 shrink-0 text-sun" />
                <span>{tx(settings.hours)}</span>
              </li>
            )}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-white/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} SS Enterprises, Ballia. {t('footer.rights')}
          </p>
          <p className="max-w-xl sm:text-right">{t('footer.disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
}
