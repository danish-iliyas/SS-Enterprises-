import PageHeader from '@/components/site/PageHeader';
import ContactBlock from '@/components/site/ContactBlock';
import ContactForm from '@/components/site/ContactForm';
import { getI18n } from '@/lib/lang';
import { getSettings } from '@/lib/queries';

export const metadata = {
  title: 'Contact Us – Call or WhatsApp 81828 18841',
  description:
    'Contact SS Enterprises, Garwar Road, Ballia for RO, AC, cooler, washing machine, fridge, geyser repair and spare parts. Call or WhatsApp 81828 18841.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const { lang, t } = await getI18n();
  const settings = await getSettings();
  return (
    <>
      <PageHeader
        title={t('contact.title')}
        subtitle={t('contact.subtitle')}
        crumbs={[{ label: t('misc.home'), href: '/' }, { label: t('nav.contact') }]}
      />
      <section className="section !pt-10">
        <div className="container-x">
          <ContactBlock settings={settings} lang={lang} />
        </div>
      </section>
      <section className="section bg-surface">
        <div className="container-x max-w-3xl">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold">{t('contact.formTitle')}</h2>
            <p className="mt-2 text-lg text-navy/65">{t('contact.formSubtitle')}</p>
          </div>
          <ContactForm />
        </div>
      </section>
    </>
  );
}
