import { notFound } from 'next/navigation';
import { BadgeCheck, Truck, Wrench } from 'lucide-react';
import PageHeader from '@/components/site/PageHeader';
import ProductCard from '@/components/site/ProductCard';
import ProductGallery from '@/components/site/ProductGallery';
import ProductActions from '@/components/site/ProductActions';
import Price, { OfferBadge, StockBadge } from '@/components/ui/Price';
import { getI18n } from '@/lib/lang';
import { getProduct } from '@/lib/queries';
import { SITE_URL } from '@/lib/constants';
import { imageUrl } from '@/lib/format';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = await getProduct(slug);
  if (!data) return { title: 'Product not found' };
  const p = data.product;
  const img = p.images?.[0] ? `${SITE_URL}${imageUrl(p.images[0])}` : undefined;
  return {
    title: `${p.name.en} – Buy in Ballia`,
    description: `${p.shortDescription?.en || p.name.en}. ${p.discountPercent ? `${p.discountPercent}% off. ` : ''}Available at SS Enterprises, Ballia. Order on WhatsApp 81828 18841.`,
    alternates: { canonical: `/shop/${p.slug}` },
    openGraph: { title: p.name.en, images: img ? [{ url: img }] : undefined },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const { lang, t, tx } = await getI18n();
  const data = await getProduct(slug);
  if (!data) notFound();
  const { product: p, related } = data;
  const inStock = p.available && p.stock > 0;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name.en,
    description: p.description?.en || p.shortDescription?.en,
    category: p.category?.name?.en,
    ...(p.brand && { brand: { '@type': 'Brand', name: p.brand } }),
    image: p.images?.map((id) => `${SITE_URL}${imageUrl(id)}`),
    ...(p.price != null && {
      offers: {
        '@type': 'Offer',
        priceCurrency: 'INR',
        price: p.price,
        availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        seller: { '@type': 'LocalBusiness', name: 'SS Enterprises' },
        url: `${SITE_URL}/shop/${p.slug}`,
      },
    }),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="hidden sm:block">
        <PageHeader
          crumbs={[
            { label: t('misc.home'), href: '/' },
            { label: t('nav.shop'), href: '/shop' },
            { label: tx(p.category?.name), href: `/shop?category=${p.category?.slug}` },
          ]}
        />
      </div>

      <section className="section !pt-4 sm:!pt-10">
        <div className="container-x grid gap-8 lg:grid-cols-2 lg:gap-12">
          <ProductGallery product={p} />

          <div>
            <p className="text-sm font-bold uppercase tracking-wider text-brand">{tx(p.category?.name)}</p>
            <h1 className="mt-1 text-2xl font-extrabold sm:text-3xl">{tx(p.name)}</h1>
            {p.brand && (
              <p className="mt-1 text-navy/60">
                {t('product.brand')}: <span className="font-semibold text-navy">{p.brand}</span>
              </p>
            )}

            <div className="mt-5 rounded-2xl bg-surface p-5">
              {p.price != null && p.discountPercent > 0 && <OfferBadge discount={p.discountPercent} lang={lang} className="mb-3" />}
              <Price product={p} lang={lang} size="lg" />
              <div className="mt-3">
                <StockBadge product={p} lang={lang} />
              </div>
            </div>

            {tx(p.shortDescription) && <p className="mt-5 text-lg text-navy/75">{tx(p.shortDescription)}</p>}

            <ProductActions product={p} />

            <ul className="mt-6 grid gap-3 text-[15px] font-medium sm:grid-cols-3">
              <li className="flex items-center gap-2 rounded-xl bg-surface px-3 py-3">
                <BadgeCheck className="h-5 w-5 shrink-0 text-green-600" /> {t('hero.genuine')}
              </li>
              <li className="flex items-center gap-2 rounded-xl bg-surface px-3 py-3">
                <Truck className="h-5 w-5 shrink-0 text-brand" /> {t('product.homeDelivery')}
              </li>
              <li className="flex items-center gap-2 rounded-xl bg-surface px-3 py-3">
                <Wrench className="h-5 w-5 shrink-0 text-sun-600" /> {t('product.installHelp')}
              </li>
            </ul>
            <p className="mt-4 text-sm text-navy/55">{t('product.note')}</p>
          </div>
        </div>

        <div className="container-x mt-10 grid gap-6 lg:grid-cols-2">
          {tx(p.description) && (
            <div className="card p-6 sm:p-7">
              <h2 className="text-xl font-bold">{t('product.description')}</h2>
              <p className="mt-3 whitespace-pre-line text-navy/75">{tx(p.description)}</p>
            </div>
          )}
          {p.specs?.length > 0 && (
            <div className="card overflow-hidden">
              <h2 className="p-6 pb-3 text-xl font-bold sm:px-7">{t('product.specs')}</h2>
              <dl className="divide-y divide-navy/10">
                {p.specs.map((s) => (
                  <div key={s.label} className="grid grid-cols-2 gap-4 px-6 py-3 sm:px-7">
                    <dt className="text-navy/60">{s.label}</dt>
                    <dd className="font-semibold">{s.value}</dd>
                  </div>
                ))}
                <div className="grid grid-cols-2 gap-4 px-6 py-3 sm:px-7">
                  <dt className="text-navy/60">{t('product.availability')}</dt>
                  <dd>
                    <StockBadge product={p} lang={lang} />
                  </dd>
                </div>
              </dl>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className="section bg-surface">
          <div className="container-x">
            <h2 className="mb-8 text-2xl font-extrabold sm:text-3xl">{t('product.related')}</h2>
            <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
              {related.map((r) => (
                <ProductCard key={r._id} product={r} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
