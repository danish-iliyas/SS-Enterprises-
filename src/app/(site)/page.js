import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import Hero, { OfferStrip } from '@/components/site/Hero';
import ServiceCard from '@/components/site/ServiceCard';
import ProductCard from '@/components/site/ProductCard';
import WhyChoose from '@/components/site/WhyChoose';
import HowItWorks from '@/components/site/HowItWorks';
import Testimonials from '@/components/site/Testimonials';
import ContactBlock from '@/components/site/ContactBlock';
import CtaBand from '@/components/site/CtaBand';
import SectionHeading from '@/components/ui/SectionHeading';
import { getI18n } from '@/lib/lang';
import { getSettings, listProducts, listServices, listTestimonials } from '@/lib/queries';

export const metadata = {
  title: { absolute: 'SS Enterprises Ballia – RO, AC, Cooler, Washing Machine & Fridge Repair' },
  description:
    'Home appliance repair in Ballia: RO water purifier service, AC repair & gas filling, cooler, washing machine, fridge, geyser and electrical work. Genuine spare parts at 30% off. Call 81828 18841.',
  alternates: { canonical: '/' },
};

export default async function HomePage() {
  const { lang, t } = await getI18n();
  const [settings, services, featured, testimonials] = await Promise.all([
    getSettings(),
    listServices(),
    listProducts({ featured: true, limit: 8 }),
    listTestimonials(),
  ]);
  const discount = settings.defaultDiscount ?? 30;

  return (
    <>
      <Hero lang={lang} settings={settings} />
      <OfferStrip lang={lang} discount={discount} />

      <section className="section">
        <div className="container-x">
          <SectionHeading kicker={t('services.kicker')} title={t('services.title')} subtitle={t('services.subtitle')} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <ServiceCard key={s._id} service={s} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-surface">
        <div className="container-x">
          <SectionHeading kicker={t('why.kicker')} title={t('why.title')} />
          <WhyChoose lang={lang} />
        </div>
      </section>

      {featured.items.length > 0 && (
        <section className="section">
          <div className="container-x">
            <SectionHeading
              align="left"
              kicker={t('products.kicker')}
              title={t('products.title')}
              subtitle={t('products.subtitle')}
              action={
                <Link href="/shop" className="btn btn-outline shrink-0">
                  {t('products.viewAll')} <ArrowRight className="h-5 w-5" />
                </Link>
              }
            />
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {featured.items.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <HowItWorks lang={lang} />

      {testimonials.length > 0 && (
        <section className="section bg-surface">
          <div className="container-x">
            <SectionHeading kicker={t('testi.kicker')} title={t('testi.title')} />
            <Testimonials items={testimonials} lang={lang} />
          </div>
        </section>
      )}

      <section className="section">
        <div className="container-x">
          <SectionHeading kicker={t('contact.kicker')} title={t('contact.title')} subtitle={t('contact.subtitle')} />
          <ContactBlock settings={settings} lang={lang} />
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-x">
          <CtaBand lang={lang} settings={settings} />
        </div>
      </section>
    </>
  );
}
