import Testimonial from '@/models/Testimonial';
import { HttpError, json, pick, readJson, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';
import { TESTIMONIAL_FIELDS } from '@/lib/fields';

export const PUT = route(async (req, { id }) => {
  await requireAdmin(req);
  const t = await Testimonial.findByIdAndUpdate(id, pick(await readJson(req), TESTIMONIAL_FIELDS), {
    new: true,
    runValidators: true,
  });
  if (!t) throw new HttpError(404, 'Testimonial not found');
  return json(t);
});

export const DELETE = route(async (req, { id }) => {
  await requireAdmin(req);
  const t = await Testimonial.findByIdAndDelete(id);
  if (!t) throw new HttpError(404, 'Testimonial not found');
  return json({ message: 'Testimonial deleted' });
});
