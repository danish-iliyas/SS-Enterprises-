'use client';

import { useEffect, useState } from 'react';
import { Check, ShoppingCart } from 'lucide-react';
import { useCart } from '@/components/providers/CartProvider';
import { useLang } from '@/components/providers/LanguageProvider';

// `short` shows a one-word label on narrow cards (needs an @container parent).
export default function AddToCartButton({ product, qty = 1, className = 'btn btn-primary', short = false }) {
  const { add } = useCart();
  const { t } = useLang();
  const [added, setAdded] = useState(false);
  const inStock = product.available && product.stock > 0;

  useEffect(() => {
    if (!added) return;
    const id = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(id);
  }, [added]);

  const full = added ? t('product.added') : inStock ? t('product.addToCart') : t('product.outOfStock');
  const brief = added ? t('product.added') : inStock ? t('product.add') : t('product.soldOut');

  return (
    <button
      type="button"
      disabled={!inStock}
      onClick={() => {
        add(product, qty);
        setAdded(true);
      }}
      className={`${className} whitespace-nowrap ${added ? '!bg-green-600' : ''}`}
      aria-label={full}
      aria-live="polite"
    >
      {added ? <Check className="h-5 w-5" /> : <ShoppingCart className="h-5 w-5" />}
      {short ? (
        <>
          <span className="@[220px]:hidden">{brief}</span>
          <span className="hidden @[220px]:inline">{full}</span>
        </>
      ) : (
        full
      )}
    </button>
  );
}
