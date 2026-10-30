'use client';

import { useState } from 'react';
import ProductImage from '@/components/ui/ProductImage';
import { OfferBadge } from '@/components/ui/Price';
import { useLang } from '@/components/providers/LanguageProvider';

export default function ProductGallery({ product }) {
  const { lang } = useLang();
  const images = product.images || [];
  const [active, setActive] = useState(images[0] || null);

  return (
    <div>
      <div className="card relative aspect-square overflow-hidden bg-brand-50">
        <ProductImage product={product} imageId={active} alt={product.name.en} large />
        {product.price != null && product.discountPercent > 0 && (
          <OfferBadge discount={product.discountPercent} lang={lang} className="absolute left-4 top-4 !text-sm" />
        )}
      </div>
      {images.length > 1 && (
        <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto">
          {images.map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 bg-brand-50 transition ${
                active === id ? 'border-brand' : 'border-transparent opacity-70 hover:opacity-100'
              }`}
              aria-label="Show image"
            >
              <ProductImage product={product} imageId={id} alt="" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
