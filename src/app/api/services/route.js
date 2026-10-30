import Service from '@/models/Service';
import { HttpError, json, pick, readJson, route, slugify } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';
import { listServices } from '@/lib/queries';
import { SERVICE_FIELDS } from '@/lib/fields';

export const GET = route(async (req) => json(await listServices({ all: req.nextUrl.searchParams.get('all') === 'true' })));

export const POST = route(async (req) => {
  await requireAdmin(req);
  const body = await readJson(req);
  const data = pick(body, SERVICE_FIELDS);
  if (!data.name?.en) throw new HttpError(400, 'Service name (English) is required');
  data.slug = slugify(body.slug || data.name.en);
  return json(await Service.create(data), { status: 201 });
});
