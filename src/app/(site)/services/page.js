import Link from 'next/link';
import { CalendarCheck, CheckCircle2 } from 'lucide-react';
import PageHeader from '@/components/site/PageHeader';
import { ServiceVisual } from '@/components/site/ServiceCard';
import CtaBand from '@/components/site/CtaBand';
import WhyChoose from '@/components/site/WhyChoose';
import SectionHeading from '@/components/ui/SectionHeading';
import { getI18n } from '@/lib/lang';
import { getSettings, listServices } from '@/lib/queries';

export const metadata = {
  title: 'Appliance Repair Services in Ballia – RO, AC, Cooler, Fridge, Washing Machine',
  description:
    'RO repair, AC repair & gas filling, cooler repair, washing machine repair, fridge repair, geyser repair and electrical services at your home in Ballia.',
  alternates: { canonical: '/services' },
};

export default async function ServicesPage() {
  const { lang, t, tx } = await getI18n();
  const [services, settings] = await Promise.all([listServices(), getSettings()]);

  return (
    <>
      <PageHeader
        title={t('services.pageTitle')}
        subtitle={t('services.pageSubtitle')}
        crumbs={[{ label: t('misc.home'), href: '/' }, { label: t('nav.services') }]}
      >
        <div className="no-scrollbar -mx-4 mt-6 flex gap-2 overflow-x-auto px-4 pb-1">
          {services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="chip shrink-0">
              {tx(s.name)}
            </a>
          ))}
        </div>
      </PageHeader>

      <section className="section">
        <div className="container-x space-y-6 sm:space-y-8">
          {services.map((s, i) => (
            <article
              key={s._id}
              id={s.slug}
              className="card scroll-mt-28 grid overflow-hidden md:grid-cols-5"
            >
              <Link
                href={`/services/${s.slug}`}
                className={`relative aspect-[4/3] bg-brand-50 md:col-span-2 md:aspect-auto ${i % 2 ? 'md:order-2' : ''}`}
                tabIndex={-1}
              >
                <ServiceVisual service={s} large className="md:absolute md:inset-0" />
              </Link>
              <div className="p-6 sm:p-8 md:col-span-3">
                <h2 className="text-2xl font-extrabold sm:text-3xl">
                  <Link href={`/services/${s.slug}`} className="hover:text-brand">
                    {tx(s.name)}
                  </Link>
                </h2>
                <p className="mt-2 text-navy/70">{tx(s.description)}</p>
                <ul className="mt-5 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                  {s.offerings.map((o) => (
                    <li key={o.en} className="flex items-start gap-2 font-medium">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                      {tx(o)}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-2 sm:flex-row">
                  <Link href={`/book-service?appliance=${s.appliance}`} className="btn btn-primary">
                    <CalendarCheck className="h-5 w-5" /> {t('services.book')}
                  </Link>
                  <Link href={`/services/${s.slug}`} className="btn btn-outline">
                    {t('services.view')}
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeading kicker={t('why.kicker')} title={t('why.title')} />
          <WhyChoose lang={lang} />
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
