import Link from 'next/link';
import { CalendarCheck } from 'lucide-react';
import Art from '@/components/ui/Art';
import { makeT, pickLang } from '@/lib/i18n';
import { imageUrl } from '@/lib/format';

export function ServiceVisual({ service, large = false, className = '' }) {
  const alt = `${pickLang(service.name, 'en')} service in Ballia`;
  if (service.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={imageUrl(service.image, !large)}
        alt={alt}
        title={service.imageCredit || undefined}
        loading="lazy"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return <Art kind={service.icon} className={`h-full w-full ${className}`} label={alt} />;
}

export default function ServiceCard({ service, lang }) {
  const t = makeT(lang);
  const href = `/services/${service.slug}`;
  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-brand-50" tabIndex={-1}>
        <ServiceVisual service={service} className="transition duration-500 group-hover:scale-105" />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-xl font-bold">
          <Link href={href} className="hover:text-brand">
            {pickLang(service.name, lang)}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-[15px] text-navy/65">{pickLang(service.short, lang)}</p>
        {/* Full-width buttons: same size on every card and in both languages */}
        <div className="mt-5 grid gap-2">
          <Link href={`/book-service?appliance=${service.appliance}`} className="btn btn-primary !min-h-[48px] whitespace-nowrap">
            <CalendarCheck className="h-5 w-5" /> {t('services.book')}
          </Link>
          <Link href={href} className="btn btn-outline !min-h-[48px] whitespace-nowrap">
            {t('services.view')}
          </Link>
        </div>
      </div>
    </article>
  );
}
