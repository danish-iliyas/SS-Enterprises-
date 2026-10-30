import Service from '@/models/Service';
import { HttpError, json, pick, readJson, route, slugify } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';
import { deleteImages } from '@/lib/images';
import { SERVICE_FIELDS } from '@/lib/fields';

export const PUT = route(async (req, { id }) => {
  await requireAdmin(req);
  const service = await Service.findById(id);
  if (!service) throw new HttpError(404, 'Service not found');

  const body = await readJson(req);
  const data = pick(body, SERVICE_FIELDS);
  if (body.slug) data.slug = slugify(body.slug);
  if ('image' in data && service.image && String(data.image) !== String(service.image)) await deleteImages([service.image]);

  service.set(data);
  await service.save();
  return json(service);
});

export const DELETE = route(async (req, { id }) => {
  await requireAdmin(req);
  const service = await Service.findByIdAndDelete(id);
  if (!service) throw new HttpError(404, 'Service not found');
  await deleteImages([service.image]);
  return json({ message: 'Service deleted' });
});
