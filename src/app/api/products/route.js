import Product from '@/models/Product';
import { HttpError, json, pick, readJson, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';
import { listProducts } from '@/lib/queries';
import { PRODUCT_FIELDS, normaliseProduct, uniqueProductSlug } from '@/lib/fields';

// Public: list products. Filters: category (slug), q, featured, sort, page, limit.
export const GET = route(async (req) => {
  const sp = req.nextUrl.searchParams;
  const data = await listProducts({
    category: sp.get('category') || undefined,
    q: sp.get('q') || undefined,
    featured: sp.get('featured') === 'true',
    sort: sp.get('sort') || undefined,
    page: Math.max(1, parseInt(sp.get('page'), 10) || 1),
    limit: Math.min(60, parseInt(sp.get('limit'), 10) || 24),
  });
  return json(data);
});

export const POST = route(async (req) => {
  await requireAdmin(req);
  const body = await readJson(req);
  const data = normaliseProduct(pick(body, PRODUCT_FIELDS));
  if (!data.name?.en) throw new HttpError(400, 'Product name (English) is required');
  data.slug = await uniqueProductSlug(body.slug || data.name.en);
  const product = await Product.create(data);
  return json(await product.populate('category', 'slug name'), { status: 201 });
});
