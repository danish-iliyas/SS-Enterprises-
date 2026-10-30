import Link from 'next/link';
import { CheckCircle2, HeartHandshake, ShieldCheck, Store } from 'lucide-react';
import PageHeader from '@/components/site/PageHeader';
import CtaBand from '@/components/site/CtaBand';
import { MapEmbed } from '@/components/site/ContactBlock';
import Art from '@/components/ui/Art';
import { getI18n } from '@/lib/lang';
import { getSettings, listServices } from '@/lib/queries';
import { prettyPhone, telHref } from '@/lib/format';

export const metadata = {
  title: 'About Us – Trusted Appliance Repair Shop in Ballia',
  description:
    'SS Enterprises is a local home appliance repair, maintenance, installation and spare-parts business on Garwar Road, Ballia, Uttar Pradesh.',
  alternates: { canonical: '/about' },
};

export default async function AboutPage() {
  const { lang, t, tx } = await getI18n();
  const [settings, services] = await Promise.all([getSettings(), listServices()]);
  const about = tx(settings.about).split(/\n\s*\n/).filter(Boolean);

  return (
    <>
      <PageHeader
        title={t('about.title')}
        subtitle={t('about.subtitle')}
        crumbs={[{ label: t('misc.home'), href: '/' }, { label: t('nav.about') }]}
      />

      <section className="section">
        <div className="container-x grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="kicker">{t('about.introTitle')}</span>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{t('brand.promise')}</h2>
            <div className="prose-ss mt-5 text-lg text-navy/75">
              {about.map((p) => (
                <p key={p.slice(0, 20)}>{p}</p>
              ))}
            </div>
          </div>
          <div className="relative grid grid-cols-2 gap-4">
            {['ro', 'ac', 'washing_machine', 'electrical'].map((k, i) => (
              <div key={k} className={`card overflow-hidden ${i % 2 ? 'translate-y-6' : ''}`}>
                <Art kind={k} className="aspect-[4/3]" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <h2 className="text-center text-3xl font-extrabold sm:text-4xl">{t('about.servicesTitle')}</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {services.map((s) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="chip !min-h-[48px] !px-5 !text-base">
                <CheckCircle2 className="h-5 w-5 text-green-600" /> {tx(s.name)}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid gap-6 lg:grid-cols-2">
          <div className="card p-6 sm:p-8">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-brand text-white">
              <HeartHandshake className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-2xl font-extrabold">{t('about.commitTitle')}</h2>
            <ul className="mt-4 space-y-3">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="flex items-start gap-2.5 text-[17px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" /> {t(`about.commit${n}`)}
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-6 sm:p-8">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-sun text-navy">
              <ShieldCheck className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-2xl font-extrabold">{t('about.trustTitle')}</h2>
            <ul className="mt-4 space-y-3">
              {[1, 2, 3, 4].map((n) => (
                <li key={n} className="flex items-start gap-2.5 text-[17px]">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" /> {t(`about.trust${n}`)}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-navy text-sun">
              <Store className="h-7 w-7" />
            </span>
            <h2 className="mt-5 text-3xl font-extrabold">{t('about.shopTitle')}</h2>
            <dl className="mt-5 space-y-3 text-lg">
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-navy/50">{t('contact.address')}</dt>
                <dd className="font-semibold">{tx(settings.address)}</dd>
              </div>
              <div>
                <dt className="text-sm font-semibold uppercase tracking-wide text-navy/50">{t('contact.phone')}</dt>
                <dd>
                  <a href={telHref(settings.phone)} className="font-semibold text-brand">
                    +91 {prettyPhone(settings.phone)}
                  </a>
                </dd>
              </div>
              {tx(settings.hours) && (
                <div>
                  <dt className="text-sm font-semibold uppercase tracking-wide text-navy/50">{t('contact.hours')}</dt>
                  <dd className="font-semibold">{tx(settings.hours)}</dd>
                </div>
              )}
            </dl>
          </div>
          <MapEmbed settings={settings} className="aspect-[4/3] shadow-card" />
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <CtaBand lang={lang} settings={settings} />
        </div>
      </section>
    </>
  );
}
