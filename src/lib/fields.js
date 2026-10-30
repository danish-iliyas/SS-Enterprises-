import Product from '@/models/Product';
import { slugify } from './http';

// Fields admins may set through the API (everything else is ignored).
export const PRODUCT_FIELDS = [
  'name', 'category', 'shortDescription', 'description', 'specs', 'mrp', 'discountPercent',
  'stock', 'available', 'featured', 'images', 'brand',
];
export const SERVICE_FIELDS = ['appliance', 'icon', 'name', 'short', 'description', 'offerings', 'problems', 'solutions', 'image', 'imageCredit', 'order', 'active'];
export const TESTIMONIAL_FIELDS = ['name', 'location', 'text', 'rating', 'active', 'order'];

export const normaliseProduct = (data) => {
  // Only an explicitly blank MRP means "price on request"; a missing key leaves the price untouched.
  if (data.mrp === '') data.mrp = null;
  if (Array.isArray(data.specs)) data.specs = data.specs.filter((s) => s?.label?.trim() && s?.value?.trim());
  return data;
};

export async function uniqueProductSlug(base, ignoreId) {
  const root = slugify(base) || 'product';
  let slug = root;
  for (let i = 2; await Product.exists({ slug, _id: { $ne: ignoreId } }); i += 1) slug = `${root}-${i}`;
  return slug;
}
