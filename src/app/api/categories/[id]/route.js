import Category from '@/models/Category';
import Product from '@/models/Product';
import { HttpError, json, pick, readJson, route, slugify } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';

export const PUT = route(async (req, { id }) => {
  await requireAdmin(req);
  const body = await readJson(req);
  const data = pick(body, ['name', 'order', 'active']);
  if (body.slug) data.slug = slugify(body.slug);
  const cat = await Category.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  if (!cat) throw new HttpError(404, 'Category not found');
  return json(cat);
});

export const DELETE = route(async (req, { id }) => {
  await requireAdmin(req);
  const inUse = await Product.countDocuments({ category: id });
  if (inUse) throw new HttpError(400, `This category has ${inUse} product(s). Move or delete them first.`);
  const cat = await Category.findByIdAndDelete(id);
  if (!cat) throw new HttpError(404, 'Category not found');
  return json({ message: 'Category deleted' });
});
