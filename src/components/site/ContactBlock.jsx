import { Clock, MapPin, Navigation, Phone } from 'lucide-react';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { makeT, pickLang } from '@/lib/i18n';
import { msg, waLink } from '@/lib/whatsapp';
import { prettyPhone, telHref } from '@/lib/format';

export function MapEmbed({ settings, className = '' }) {
  const src = settings.mapEmbedUrl;
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-brand-50 ${className}`}>
      {src ? (
        <iframe
          src={src}
          title="SS Enterprises location on Google Maps"
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-dots p-6 text-center">
          <div>
            <MapPin className="mx-auto h-10 w-10 text-brand" />
            <p className="mt-2 font-semibold">Garwar Road, Ballia</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ContactBlock({ settings, lang }) {
  const t = makeT(lang);
  const tx = (o) => pickLang(o, lang);
  const directions = settings.mapLink || `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.address?.en || 'Garwar Road Ballia')}`;

  const items = [
    {
      icon: Phone,
      title: t('contact.phone'),
      body: (
        <a href={telHref(settings.phone)} className="text-xl font-bold text-navy hover:text-brand">
          +91 {prettyPhone(settings.phone)}
        </a>
      ),
      tone: 'bg-brand text-white',
    },
    {
      icon: WhatsAppIcon,
      title: t('contact.whatsapp'),
      body: (
        <a href={waLink(msg.general(lang), settings.whatsapp)} target="_blank" rel="noopener" className="text-xl font-bold text-navy hover:text-green-600">
          +91 {prettyPhone(settings.whatsapp)}
        </a>
      ),
      tone: 'bg-whatsapp text-white',
    },
    { icon: MapPin, title: t('contact.address'), body: <p className="font-semibold">{tx(settings.address)}</p>, tone: 'bg-sun text-navy' },
    tx(settings.hours) && {
      icon: Clock,
      title: t('contact.hours'),
      body: (
        <p className="font-semibold">
          {tx(settings.hours)}
          {tx(settings.serviceArea) && <span className="mt-0.5 block text-sm font-normal text-navy/60">{t('contact.area')}: {tx(settings.serviceArea)}</span>}
        </p>
      ),
      tone: 'bg-navy text-white',
    },
  ].filter(Boolean);

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      <div className="grid content-start gap-3 lg:col-span-2">
        {items.map(({ icon: Icon, title, body, tone }) => (
          <div key={title} className="card flex items-start gap-4 p-4 sm:p-5">
            <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${tone}`}>
              <Icon className="h-6 w-6" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold uppercase tracking-wide text-navy/50">{title}</p>
              <div className="mt-0.5">{body}</div>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-2 gap-2 pt-1">
          <a href={telHref(settings.phone)} className="btn btn-primary">
            <Phone className="h-5 w-5" /> {t('contact.callNow')}
          </a>
          <a href={waLink(msg.general(lang), settings.whatsapp)} target="_blank" rel="noopener" className="btn btn-wa">
            <WhatsAppIcon /> {t('nav.whatsapp')}
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-3 lg:col-span-3">
        <MapEmbed settings={settings} className="min-h-[300px] flex-1 shadow-card" />
        <a href={directions} target="_blank" rel="noopener" className="btn btn-navy w-full sm:w-auto sm:self-start">
          <Navigation className="h-5 w-5" /> {t('contact.directions')}
        </a>
      </div>
    </div>
  );
}
