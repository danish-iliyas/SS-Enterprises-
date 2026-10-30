import Link from 'next/link';
import { ArrowRight, BadgeCheck, CalendarCheck, MapPin, Phone, Zap } from 'lucide-react';
import { heroSvg } from '@/lib/art';
import { makeT, pickLang } from '@/lib/i18n';
import { imageUrl, prettyPhone, telHref } from '@/lib/format';

export default function Hero({ lang, settings }) {
  const t = makeT(lang);
  const banner = settings.banners?.find((b) => b.active && b.image);
  const title = pickLang(banner?.title, lang) || t('hero.title');
  const subtitle = pickLang(banner?.subtitle, lang) || t('hero.subtitle');

  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="pointer-events-none absolute inset-0 bg-dots opacity-70 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-brand/10" />

      <div className="container-x relative grid items-center gap-10 py-10 sm:py-14 lg:grid-cols-2 lg:gap-6 lg:py-20">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 text-sm font-semibold text-navy shadow-card ring-1 ring-navy/5">
            <MapPin className="h-4 w-4 text-brand" /> {t('hero.badge')}
          </span>

          <h1 className="mt-5 text-[34px] font-extrabold leading-[1.12] sm:text-5xl lg:text-[56px]">{title}</h1>
          <p className="mt-5 max-w-xl text-lg text-navy/70 sm:text-xl">{subtitle}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/book-service" className="btn btn-primary btn-lg">
              <CalendarCheck className="h-5 w-5" /> {t('hero.book')}
            </Link>
            <Link href="/shop" className="btn btn-sun btn-lg">
              {t('hero.explore')} <ArrowRight className="h-5 w-5" />
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[15px] font-semibold text-navy/75">
            <a href={telHref(settings.phone)} className="inline-flex items-center gap-2 hover:text-brand">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-white">
                <Phone className="h-4 w-4" />
              </span>
              <span>
                <span className="block text-xs font-medium text-navy/50">{t('hero.callUs')}</span>
                +91 {prettyPhone(settings.phone)}
              </span>
            </a>
            <span className="inline-flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-green-600" /> {t('hero.genuine')}
            </span>
            <span className="inline-flex items-center gap-2">
              <Zap className="h-5 w-5 text-sun-600" /> {t('hero.quick')}
            </span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[560px]">
          {banner ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={imageUrl(banner.image)}
              alt="SS Enterprises technician service in Ballia"
              className="aspect-[7/6] w-full rounded-4xl object-cover shadow-lift"
              fetchPriority="high"
            />
          ) : (
            <div
              role="img"
              aria-label="Technician repairing home appliances – AC, RO water purifier and washing machine"
              className="[&>svg]:h-auto [&>svg]:w-full"
              dangerouslySetInnerHTML={{ __html: heroSvg() }}
            />
          )}

          <div className="absolute -bottom-3 left-0 hidden rounded-2xl bg-white p-4 shadow-lift ring-1 ring-navy/5 sm:block">
            <p className="font-display text-3xl font-extrabold text-brand">
              {settings.defaultDiscount ?? 30}% <span className="text-lg text-navy">OFF</span>
            </p>
            <p className="text-sm font-semibold text-navy/60">{t('hero.stat3')}</p>
          </div>
          <div className="absolute right-0 top-6 hidden rounded-2xl bg-navy p-4 text-white shadow-lift sm:block">
            <p className="font-display text-3xl font-extrabold text-sun">8+</p>
            <p className="text-sm font-semibold text-white/70">{t('hero.stat1')}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export function OfferStrip({ lang, discount = 30 }) {
  const t = makeT(lang);
  return (
    <div className="bg-sun">
      <div className="container-x flex flex-col items-start gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex items-center gap-3 font-display text-lg font-bold text-navy">
          <span className="rounded-lg bg-navy px-2.5 py-1 text-sm font-extrabold text-sun">{discount}% OFF</span>
          {t('offer.title', { d: discount })}
        </p>
        <Link href="/shop" className="btn btn-navy btn-sm">
          {t('offer.cta')} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
