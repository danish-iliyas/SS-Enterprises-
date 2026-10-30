import Testimonial from '@/models/Testimonial';
import { json, pick, readJson, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';
import { listTestimonials } from '@/lib/queries';
import { TESTIMONIAL_FIELDS } from '@/lib/fields';

export const GET = route(async (req) => json(await listTestimonials({ all: req.nextUrl.searchParams.get('all') === 'true' })));

export const POST = route(async (req) => {
  await requireAdmin(req);
  return json(await Testimonial.create(pick(await readJson(req), TESTIMONIAL_FIELDS)), { status: 201 });
});
