import Booking from '@/models/Booking';
import { HttpError, json, readJson, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';

export const POST = route(async (req, { id }) => {
  await requireAdmin(req);
  const text = String((await readJson(req)).text || '').trim();
  if (!text) throw new HttpError(400, 'Note cannot be empty');

  const booking = await Booking.findByIdAndUpdate(id, { $push: { notes: { text } } }, { new: true });
  if (!booking) throw new HttpError(404, 'Booking not found');
  return json(booking);
});
