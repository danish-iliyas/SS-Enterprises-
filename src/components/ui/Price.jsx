import { formatINR } from '@/lib/format';
import { makeT } from '@/lib/i18n';

export function OfferBadge({ discount, lang, className = '' }) {
  if (!discount) return null;
  return (
    <span className={`inline-flex items-center rounded-lg bg-sun px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-navy shadow-sm ${className}`}>
      {makeT(lang)('product.off', { d: discount })}
    </span>
  );
}

export default function Price({ product, lang, size = 'md' }) {
  const t = makeT(lang);
  if (product.price == null) {
    return <p className="font-semibold text-brand">{t('product.priceOnRequest')}</p>;
  }
  const big = size === 'lg';
  return (
    <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
      <span className={`font-display font-extrabold text-navy ${big ? 'text-4xl' : 'text-2xl'}`}>{formatINR(product.price)}</span>
      {product.discountPercent > 0 && (
        <>
          <span className={`text-navy/45 line-through ${big ? 'text-lg' : 'text-sm'}`}>
            {t('product.mrp')} {formatINR(product.mrp)}
          </span>
          {big && (
            <span className="w-full text-base font-semibold text-green-700">
              {t('product.youSave', { amt: formatINR(product.mrp - product.price) })} ({product.discountPercent}%)
            </span>
          )}
        </>
      )}
    </div>
  );
}

export function StockBadge({ product, lang }) {
  const t = makeT(lang);
  const inStock = product.available && product.stock > 0;
  if (!inStock) {
    return <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-600"><Dot c="bg-red-500" />{t('product.outOfStock')}</span>;
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700">
      <Dot c="bg-green-500" />
      {product.stock <= 3 ? t('product.lowStock', { n: product.stock }) : t('product.inStock')}
    </span>
  );
}

const Dot = ({ c }) => <span className={`h-2 w-2 rounded-full ${c}`} />;
