'use client';

import Link from 'next/link';
import ProductImage from '@/components/ui/ProductImage';
import WhatsAppIcon from '@/components/ui/WhatsAppIcon';
import Price, { OfferBadge, StockBadge } from '@/components/ui/Price';
import AddToCartButton from './AddToCartButton';
import { useLang } from '@/components/providers/LanguageProvider';
import { useSite } from '@/components/providers/SiteProvider';
import { msg, waLink } from '@/lib/whatsapp';
import { SITE_URL } from '@/lib/constants';

export default function ProductCard({ product }) {
  const { lang, t, tx } = useLang();
  const site = useSite();
  const href = `/shop/${product.slug}`;
  const name = tx(product.name);
  const inStock = product.available && product.stock > 0;

  const wa = waLink(
    msg.product({ name: product.name.en, price: product.price, url: `${SITE_URL}${href}` }, lang),
    site.whatsapp
  );

  return (
    <article className="card card-hover group flex flex-col overflow-hidden">
      <Link href={href} className="relative block aspect-[4/3] overflow-hidden bg-brand-50" aria-label={name}>
        <ProductImage product={product} alt={product.name.en} className="transition duration-500 group-hover:scale-105" />
        {product.price != null && product.discountPercent > 0 && (
          <OfferBadge discount={product.discountPercent} lang={lang} className="absolute left-3 top-3" />
        )}
        {!inStock && (
          <span className="absolute inset-x-0 bottom-0 bg-navy/80 py-1.5 text-center text-sm font-bold text-white">
            {t('product.outOfStock')}
          </span>
        )}
      </Link>

      {/* Compact body: name, price, stock, buttons. Full description is on the product page. */}
      <div className="@container flex flex-1 flex-col p-3 sm:p-4">
        <p className="truncate text-[11px] font-bold uppercase tracking-wider text-brand">{tx(product.category?.name)}</p>
        <h3 className="mt-0.5 line-clamp-2 text-[15px] font-bold leading-snug sm:text-base">
          <Link href={href} className="hover:text-brand">
            {name}
          </Link>
        </h3>
        <div className="mt-2 [&_.text-2xl]:text-xl">
          <Price product={product} lang={lang} />
        </div>
        <div className="mt-1 text-[13px] [&_.text-sm]:text-[13px]">
          <StockBadge product={product} lang={lang} />
        </div>

        <div className="mt-auto flex gap-2 pt-3">
          <AddToCartButton product={product} short className="btn btn-primary btn-sm !min-h-[44px] flex-1 !px-2" />
          <a
            href={wa}
            target="_blank"
            rel="noopener"
            className="btn btn-wa btn-sm !min-h-[44px] !px-3"
            aria-label={t('product.whatsappBuy')}
            title={t('product.whatsappBuy')}
          >
            <WhatsAppIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </article>
  );
}
