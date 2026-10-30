import Art, { CATEGORY_ART } from './Art';
import { imageUrl } from '@/lib/format';

// Uploaded product photo (compressed WebP from MongoDB) or a category illustration.
export default function ProductImage({ product, imageId, alt, large = false, className = '' }) {
  const id = imageId ?? product?.images?.[0];
  if (id) {
    return (
      // Plain <img>: files are already compressed WebP and cached for a year.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={imageUrl(id, !large)}
        alt={alt}
        loading={large ? 'eager' : 'lazy'}
        decoding="async"
        className={`h-full w-full object-cover ${className}`}
      />
    );
  }
  return <Art kind={CATEGORY_ART[product?.category?.slug] || product?.art || 'tools'} className={`h-full w-full ${className}`} label={alt} />;
}
