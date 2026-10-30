import Link from 'next/link';
import { Home, ShoppingBag, Wrench } from 'lucide-react';
import Header from '@/components/layout/Header';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import Art from '@/components/ui/Art';
import { getI18n } from '@/lib/lang';

export const metadata = { title: 'Page not found' };

export default async function NotFound() {
  const { t } = await getI18n();
  return (
    <>
      <Header />
      <main className="section">
        <div className="container-x max-w-xl text-center">
          <Art kind="tools" className="mx-auto aspect-[4/3] w-64 overflow-hidden rounded-3xl" />
          <p className="mt-6 font-display text-6xl font-extrabold text-brand">404</p>
          <h1 className="mt-2 text-3xl font-extrabold">{t('misc.notFound')}</h1>
          <p className="mt-2 text-lg text-navy/65">{t('misc.notFoundText')}</p>
          <div className="mt-8 grid gap-2 sm:grid-cols-3">
            <Link href="/" className="btn btn-primary">
              <Home className="h-5 w-5" /> {t('nav.home')}
            </Link>
            <Link href="/services" className="btn btn-outline">
              <Wrench className="h-5 w-5" /> {t('nav.servicesShort')}
            </Link>
            <Link href="/shop" className="btn btn-outline">
              <ShoppingBag className="h-5 w-5" /> {t('nav.shopShort')}
            </Link>
          </div>
        </div>
      </main>
      <MobileBottomNav />
    </>
  );
}
