import Product from '@/models/Product';
import { HttpError, json, pick, readJson, route, slugify } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';
import { deleteImages } from '@/lib/images';
import { getProduct } from '@/lib/queries';
import { PRODUCT_FIELDS, normaliseProduct, uniqueProductSlug } from '@/lib/fields';

// Public: product by slug or id, plus related products.
export const GET = route(async (req, { id }) => {
  const data = await getProduct(id);
  if (!data) throw new HttpError(404, 'Product not found');
  return json(data);
});

export const PUT = route(async (req, { id }) => {
  await requireAdmin(req);
  const product = await Product.findById(id);
  if (!product) throw new HttpError(404, 'Product not found');

  const body = await readJson(req);
  const data = normaliseProduct(pick(body, PRODUCT_FIELDS));
  if (body.slug && slugify(body.slug) !== product.slug) data.slug = await uniqueProductSlug(body.slug, product._id);

  // Delete images that were removed from the product.
  if (Array.isArray(data.images)) {
    const keep = new Set(data.images.map(String));
    await deleteImages(product.images.filter((img) => !keep.has(String(img))));
  }

  product.set(data);
  await product.save();
  return json(await product.populate('category', 'slug name'));
});

// Quick update from the product list (price, stock, availability, featured).
export const PATCH = route(async (req, { id }) => {
  await requireAdmin(req);
  const data = normaliseProduct(pick(await readJson(req), ['mrp', 'discountPercent', 'stock', 'available', 'featured']));
  const product = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true }).populate('category', 'slug name');
  if (!product) throw new HttpError(404, 'Product not found');
  return json(product);
});

export const DELETE = route(async (req, { id }) => {
  await requireAdmin(req);
  const product = await Product.findByIdAndDelete(id);
  if (!product) throw new HttpError(404, 'Product not found');
  await deleteImages(product.images);
  return json({ message: 'Product deleted' });
});
