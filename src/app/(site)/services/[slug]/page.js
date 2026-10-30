import Link from 'next/link';
import { notFound } from 'next/navigation';
import { AlertTriangle, CalendarCheck, CheckCircle2, Phone, Wrench } from 'lucide-react';
import PageHeader from '@/components/site/PageHeader';
import ServiceCard, { ServiceVisual } from '@/components/site/ServiceCard';
import CtaBand from '@/components/site/CtaBand';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { getI18n } from '@/lib/lang';
import { getService, getSettings, listServices } from '@/lib/queries';
import { msg, waLink } from '@/lib/whatsapp';
import { telHref } from '@/lib/format';
import { SITE_URL } from '@/lib/constants';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const s = await getService(slug);
  if (!s) return { title: 'Service not found' };
  return {
    title: `${s.name.en} Repair & Service in Ballia`,
    description: `${s.short?.en || ''} Home service in Ballia and nearby areas by SS Enterprises. Call or WhatsApp 81828 18841.`,
    alternates: { canonical: `/services/${slug}` },
    openGraph: { title: `${s.name.en} Service in Ballia | SS Enterprises`, description: s.short?.en },
  };
}

function ListCard({ title, items, icon: Icon, tone, tx }) {
  if (!items?.length) return null;
  return (
    <div className="card p-6 sm:p-7">
      <h2 className="flex items-center gap-3 text-xl font-bold">
        <span className={`grid h-10 w-10 place-items-center rounded-xl ${tone}`}>
          <Icon className="h-5 w-5" />
        </span>
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map((o) => (
          <li key={o.en} className="flex items-start gap-2.5 text-[16px]">
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand" />
            <span>{tx(o)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const { lang, t, tx } = await getI18n();
  const [service, settings, all] = await Promise.all([getService(slug), getSettings(), listServices()]);
  if (!service) notFound();

  const name = tx(service.name);
  const wa = waLink(msg.service(name, lang), settings.whatsapp);
  const bookHref = `/book-service?appliance=${service.appliance}`;
  const others = all.filter((s) => s.slug !== slug).slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${service.name.en} Service`,
    serviceType: service.name.en,
    description: service.description?.en,
    areaServed: { '@type': 'City', name: 'Ballia' },
    provider: { '@type': 'LocalBusiness', name: 'SS Enterprises', telephone: `+91${settings.phone}`, url: SITE_URL },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageHeader
        title={name}
        subtitle={tx(service.short)}
        crumbs={[
          { label: t('misc.home'), href: '/' },
          { label: t('nav.services'), href: '/services' },
          { label: name },
        ]}
      />

      <section className="section !pt-10">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="card overflow-hidden">
              <div className="aspect-[16/9] bg-brand-50">
                <ServiceVisual service={service} large />
              </div>
              {service.image && service.imageCredit && (
                <p className="px-6 pt-2 text-xs text-navy/45 sm:px-8">{service.imageCredit}</p>
              )}
              <div className="prose-ss p-6 text-[17px] text-navy/80 sm:p-8">
                <p>{tx(service.description)}</p>
              </div>
            </div>

            <ListCard title={t('services.whatWeOffer')} items={service.offerings} icon={Wrench} tone="bg-brand-50 text-brand" tx={tx} />
            <div className="grid gap-6 md:grid-cols-2">
              <ListCard title={t('services.problems')} items={service.problems} icon={AlertTriangle} tone="bg-amber-50 text-amber-600" tx={tx} />
              <ListCard title={t('services.solutions')} items={service.solutions} icon={CheckCircle2} tone="bg-green-50 text-green-600" tx={tx} />
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="card overflow-hidden">
              <div className="bg-navy p-6 text-white">
                <h2 className="text-xl font-bold !text-white">{t('services.needHelp', { s: name })}</h2>
                <p className="mt-2 text-white/70">{t('services.needHelpText')}</p>
              </div>
              <div className="grid gap-2.5 p-5">
                <Link href={bookHref} className="btn btn-primary btn-lg w-full">
                  <CalendarCheck className="h-5 w-5" /> {t('nav.book')}
                </Link>
                <a href={wa} target="_blank" rel="noopener" className="btn btn-wa btn-lg w-full">
                  <WhatsAppIcon /> {t('services.enquire')}
                </a>
                <a href={telHref(settings.phone)} className="btn btn-outline w-full">
                  <Phone className="h-5 w-5" /> {t('nav.callNow')}
                </a>
              </div>
              <ul className="space-y-2 border-t border-navy/10 p-5 text-[15px] font-medium text-navy/75">
                {['book.trust1', 'book.trust2', 'book.trust3'].map((k) => (
                  <li key={k} className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-600" /> {t(k)}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      {others.length > 0 && (
        <section className="section bg-surface">
          <div className="container-x">
            <h2 className="mb-8 text-2xl font-extrabold sm:text-3xl">{t('services.other')}</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {others.map((s) => (
                <ServiceCard key={s._id} service={s} lang={lang} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-x">
          <CtaBand lang={lang} settings={settings} waMessage={msg.service(name, lang)} bookHref={bookHref} />
        </div>
      </section>
    </>
  );
}
