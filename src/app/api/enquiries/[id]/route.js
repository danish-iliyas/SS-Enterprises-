import Enquiry, { ENQUIRY_STATUSES } from '@/models/Enquiry';
import { HttpError, json, pick, readJson, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';

export const PATCH = route(async (req, { id }) => {
  await requireAdmin(req);
  const updates = pick(await readJson(req), ['status', 'adminNote']);
  if (updates.status && !ENQUIRY_STATUSES.includes(updates.status)) throw new HttpError(400, 'Invalid status');
  const enquiry = await Enquiry.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!enquiry) throw new HttpError(404, 'Enquiry not found');
  return json(enquiry);
});

export const DELETE = route(async (req, { id }) => {
  await requireAdmin(req);
  const enquiry = await Enquiry.findByIdAndDelete(id);
  if (!enquiry) throw new HttpError(404, 'Enquiry not found');
  return json({ message: 'Enquiry deleted' });
});
