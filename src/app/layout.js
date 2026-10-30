import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { getI18n } from '@/lib/lang';
import { getSettings } from '@/lib/queries';
import { SITE_URL } from '@/lib/constants';
import { settings as defaultSettings } from '@/data/seed';
import { LanguageProvider } from '@/components/providers/LanguageProvider';
import { SiteProvider } from '@/components/providers/SiteProvider';
import { CartProvider } from '@/components/providers/CartProvider';

const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' });
const display = Poppins({ subsets: ['latin'], weight: ['600', '700', '800'], variable: '--font-display', display: 'swap' });

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'SS Enterprises – Home Appliance Repair & RO Service in Ballia',
    template: '%s | SS Enterprises Ballia',
  },
  description:
    'RO water purifier, AC, cooler, washing machine, fridge, geyser repair and electrical services in Ballia, Uttar Pradesh. Home service, genuine spare parts. Call or WhatsApp 81828 18841.',
  keywords: [
    'RO Repair in Ballia', 'RO Water Purifier in Ballia', 'AC Repair in Ballia', 'AC Gas Filling in Ballia',
    'Washing Machine Repair in Ballia', 'Cooler Repair in Ballia', 'Fridge Repair in Ballia',
    'Electrical Services in Ballia', 'Home Appliance Repair in Ballia', 'SS Enterprises Ballia',
  ],
  applicationName: 'SS Enterprises',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'SS Enterprises',
    title: 'SS Enterprises – Home Appliance Repair & RO Service in Ballia',
    description: 'Repair, installation, maintenance and spare parts for RO, AC, cooler, washing machine, fridge and geyser in Ballia.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'SS Enterprises Ballia' }],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: '/' },
  icons: { icon: '/icon.svg', apple: '/apple-icon.png' },
  formatDetection: { telephone: true },
};

export const viewport = {
  themeColor: '#0755E8',
  width: 'device-width',
  initialScale: 1,
};

async function loadSettings() {
  try {
    return await getSettings();
  } catch (err) {
    console.error('Settings unavailable, using defaults:', err.message);
    return { ...defaultSettings };
  }
}

function localBusinessJsonLd(s) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HomeAndConstructionBusiness',
    additionalType: 'https://schema.org/ElectronicsStore',
    name: s.businessName || 'SS Enterprises',
    description: 'Home appliance repair, maintenance, installation and spare parts in Ballia, Uttar Pradesh.',
    url: SITE_URL,
    telephone: `+91${s.phone}`,
    image: `${SITE_URL}/og-image.png`,
    priceRange: '₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: s.address?.en || 'Garwar Road',
      addressLocality: 'Ballia',
      addressRegion: 'Uttar Pradesh',
      addressCountry: 'IN',
    },
    areaServed: { '@type': 'City', name: 'Ballia' },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '09:00',
      closes: '20:00',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Home appliance services',
      itemListElement: ['RO Repair', 'AC Repair', 'AC Gas Filling', 'Cooler Repair', 'Washing Machine Repair', 'Fridge Repair', 'Geyser Repair', 'Electrical Wiring'].map(
        (name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: `${name} in Ballia` } })
      ),
    },
  };
}

export default async function RootLayout({ children }) {
  const [{ lang }, settings] = await Promise.all([getI18n(), loadSettings()]);

  return (
    <html lang={lang === 'hi' ? 'hi-Latn' : 'en'} className={`${body.variable} ${display.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd(settings)) }}
        />
        <LanguageProvider initialLang={lang}>
          <SiteProvider settings={settings}>
            <CartProvider>{children}</CartProvider>
          </SiteProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
