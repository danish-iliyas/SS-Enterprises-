import Booking, { BOOKING_STATUSES } from '@/models/Booking';
import { HttpError, json, pick, readJson, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';

export const GET = route(async (req, { id }) => {
  await requireAdmin(req);
  const booking = await Booking.findById(id);
  if (!booking) throw new HttpError(404, 'Booking not found');
  return json(booking);
});

export const PATCH = route(async (req, { id }) => {
  await requireAdmin(req);
  const updates = pick(await readJson(req), ['status', 'preferredDate', 'preferredTime', 'serviceType', 'address', 'problem']);
  if (updates.status && !BOOKING_STATUSES.includes(updates.status)) throw new HttpError(400, 'Invalid status');

  const booking = await Booking.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
  if (!booking) throw new HttpError(404, 'Booking not found');
  return json(booking);
});

export const DELETE = route(async (req, { id }) => {
  await requireAdmin(req);
  const booking = await Booking.findByIdAndDelete(id);
  if (!booking) throw new HttpError(404, 'Booking not found');
  return json({ message: 'Booking deleted' });
});
