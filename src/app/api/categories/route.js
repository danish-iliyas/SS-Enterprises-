import Category from '@/models/Category';
import { HttpError, json, pick, readJson, route, slugify } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';
import { listCategories } from '@/lib/queries';

export const GET = route(async (req) => json(await listCategories({ all: req.nextUrl.searchParams.get('all') === 'true' })));

export const POST = route(async (req) => {
  await requireAdmin(req);
  const body = await readJson(req);
  const data = pick(body, ['name', 'order', 'active']);
  if (!data.name?.en) throw new HttpError(400, 'Category name (English) is required');
  data.slug = slugify(body.slug || data.name.en);
  return json(await Category.create(data), { status: 201 });
});
