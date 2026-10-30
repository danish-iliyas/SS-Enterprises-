import { CheckCircle2, Phone } from 'lucide-react';
import PageHeader from '@/components/site/PageHeader';
import BookingForm from '@/components/site/BookingForm';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { getI18n } from '@/lib/lang';
import { getSettings } from '@/lib/queries';
import { APPLIANCES } from '@/lib/constants';
import { msg, waLink } from '@/lib/whatsapp';
import { prettyPhone, telHref } from '@/lib/format';

export const metadata = {
  title: 'Book Appliance Repair Service in Ballia',
  description: 'Book RO, AC, cooler, washing machine, fridge, geyser or electrical repair at your home in Ballia. Our technician will contact you shortly.',
  alternates: { canonical: '/book-service' },
};

export default async function BookServicePage({ searchParams }) {
  const sp = await searchParams;
  const { lang, t } = await getI18n();
  const settings = await getSettings();
  const appliance = APPLIANCES.some((a) => a.value === sp.appliance) ? sp.appliance : '';

  return (
    <>
      <PageHeader
        title={t('book.title')}
        subtitle={t('book.subtitle')}
        crumbs={[{ label: t('misc.home'), href: '/' }, { label: t('book.title') }]}
      />
      <section className="section !pt-8 sm:!pt-12">
        <div className="container-x grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <BookingForm initialAppliance={appliance} />
          </div>
          <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <div className="card overflow-hidden">
              <div className="bg-navy p-6">
                <h2 className="text-xl font-bold !text-white">{t('book.side.title')}</h2>
                <p className="mt-1 text-white/70">{t('book.side.text')}</p>
              </div>
              <div className="grid gap-2.5 p-5">
                <a href={telHref(settings.phone)} className="btn btn-primary btn-lg w-full">
                  <Phone className="h-5 w-5" /> +91 {prettyPhone(settings.phone)}
                </a>
                <a href={waLink(msg.general(lang), settings.whatsapp)} target="_blank" rel="noopener" className="btn btn-wa btn-lg w-full">
                  <WhatsAppIcon /> {t('contact.whatsappNow')}
                </a>
              </div>
            </div>
            <ul className="card space-y-3 p-5 font-medium">
              {['book.trust1', 'book.trust2', 'book.trust3', 'hero.genuine'].map((k) => (
                <li key={k} className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" /> {t(k)}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
