import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import FloatingWhatsApp from '@/components/layout/FloatingWhatsApp';
import { getI18n } from '@/lib/lang';
import { getSettings, listServices } from '@/lib/queries';
import { settings as defaultSettings } from '@/data/seed';

export default async function SiteLayout({ children }) {
  const { lang } = await getI18n();
  const [settings, services] = await Promise.all([
    getSettings().catch(() => defaultSettings),
    listServices().catch(() => []),
  ]);

  return (
    <>
      <Header />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <Footer lang={lang} settings={settings} services={services} />
      <div className="h-16 lg:hidden" aria-hidden />
      <MobileBottomNav />
      <FloatingWhatsApp />
    </>
  );
}
