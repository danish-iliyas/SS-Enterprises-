import Link from 'next/link';
import { PackageSearch, Search } from 'lucide-react';
import PageHeader from '@/components/site/PageHeader';
import ProductCard from '@/components/site/ProductCard';
import SortSelect from '@/components/site/SortSelect';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import { getI18n } from '@/lib/lang';
import { getSettings, listCategories, listProducts } from '@/lib/queries';
import { msg, waLink } from '@/lib/whatsapp';

export async function generateMetadata({ searchParams }) {
  const { category } = await searchParams;
  const cats = category ? await listCategories() : [];
  const cat = cats.find((c) => c.slug === category);
  return {
    title: cat ? `${cat.name.en} in Ballia – Buy Online` : 'Shop RO Water Purifiers & Appliance Spare Parts in Ballia',
    description:
      'Buy RO water purifiers, RO filters, membranes, pumps, AC, cooler and washing machine spare parts in Ballia at 30% off. Order easily on WhatsApp.',
    alternates: { canonical: category ? `/shop?category=${category}` : '/shop' },
  };
}

const PER_PAGE = 12;

export default async function ShopPage({ searchParams }) {
  const sp = await searchParams;
  const { lang, t, tx } = await getI18n();
  const category = typeof sp.category === 'string' ? sp.category : '';
  const q = typeof sp.q === 'string' ? sp.q.trim().slice(0, 60) : '';
  const sort = typeof sp.sort === 'string' ? sp.sort : '';
  const page = Math.max(1, parseInt(sp.page, 10) || 1);

  const [categories, data, settings] = await Promise.all([
    listCategories(),
    listProducts({ category: category || undefined, q: q || undefined, sort, page, limit: PER_PAGE }),
    getSettings(),
  ]);
  const active = categories.find((c) => c.slug === category);

  const href = (patch) => {
    const params = new URLSearchParams({ ...(category && { category }), ...(q && { q }), ...(sort && { sort }), ...patch });
    for (const [k, v] of [...params]) if (!v) params.delete(k);
    const s = params.toString();
    return `/shop${s ? `?${s}` : ''}`;
  };

  return (
    <>
      <PageHeader
        title={active ? tx(active.name) : t('shop.title')}
        subtitle={t('shop.subtitle')}
        crumbs={[
          { label: t('misc.home'), href: '/' },
          active ? { label: t('nav.shop'), href: '/shop' } : { label: t('nav.shop') },
          ...(active ? [{ label: tx(active.name) }] : []),
        ]}
      >
        <form action="/shop" className="mt-6 flex max-w-xl gap-2" role="search">
          {category && <input type="hidden" name="category" value={category} />}
          <label className="relative flex-1">
            <span className="sr-only">{t('shop.search')}</span>
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-navy/40" />
            <input name="q" defaultValue={q} placeholder={t('shop.search')} className="input !pl-12" type="search" />
          </label>
          <button className="btn btn-primary" type="submit">
            <Search className="h-5 w-5 sm:hidden" />
            <span className="hidden sm:inline">{t('shop.search').replace('…', '')}</span>
          </button>
        </form>
      </PageHeader>

      <section className="section !pt-8">
        <div className="container-x">
          {/* Category chips: horizontal scroll on phones */}
          <nav aria-label={t('shop.categories')} className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 pb-2">
            <Link href={href({ category: '', page: '' })} className={`chip shrink-0 ${!category ? 'chip-active' : ''}`}>
              {t('shop.all')}
            </Link>
            {categories.map((c) => (
              <Link
                key={c._id}
                href={href({ category: c.slug, page: '' })}
                className={`chip shrink-0 ${category === c.slug ? 'chip-active' : ''}`}
              >
                {tx(c.name)}
                <span className={`text-xs ${category === c.slug ? 'text-white/70' : 'text-navy/40'}`}>{c.count}</span>
              </Link>
            ))}
          </nav>

          <div className="mb-6 mt-4 flex items-center justify-between gap-3">
            <p className="font-semibold text-navy/60">{t('shop.results', { n: data.total })}</p>
            <SortSelect value={sort} />
          </div>

          {data.items.length ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
              {data.items.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <div className="card mx-auto max-w-lg p-10 text-center">
              <PackageSearch className="mx-auto h-14 w-14 text-brand" />
              <h2 className="mt-4 text-2xl font-bold">{t('shop.empty')}</h2>
              <p className="mt-2 text-navy/65">{t('shop.emptyText')}</p>
              <a href={waLink(msg.spareParts(lang) + q, settings.whatsapp)} target="_blank" rel="noopener" className="btn btn-wa mt-6">
                <WhatsAppIcon /> {t('shop.askPart')}
              </a>
            </div>
          )}

          {data.pages > 1 && (
            <nav className="mt-10 flex flex-wrap justify-center gap-2" aria-label="Pagination">
              {Array.from({ length: data.pages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={href({ page: n === 1 ? '' : String(n) })}
                  className={`chip min-w-[44px] justify-center ${n === page ? 'chip-active' : ''}`}
                  aria-current={n === page ? 'page' : undefined}
                >
                  {n}
                </Link>
              ))}
            </nav>
          )}

          <div className="mt-14 flex flex-col items-center justify-between gap-4 rounded-3xl bg-surface p-6 text-center sm:flex-row sm:p-8 sm:text-left">
            <div>
              <h2 className="text-xl font-bold">{t('shop.askPart')}</h2>
              <p className="mt-1 text-navy/65">{t('shop.emptyText')}</p>
            </div>
            <a href={waLink(msg.spareParts(lang), settings.whatsapp)} target="_blank" rel="noopener" className="btn btn-wa shrink-0">
              <WhatsAppIcon /> {t('nav.whatsapp')}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
