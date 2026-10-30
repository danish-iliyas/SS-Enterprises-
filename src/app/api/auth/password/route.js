import Admin from '@/models/Admin';
import { HttpError, json, readJson, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';

export const PUT = route(async (req) => {
  const me = await requireAdmin(req);
  const { currentPassword, newPassword, username } = await readJson(req);
  if (!newPassword || String(newPassword).length < 6) throw new HttpError(400, 'New password must be at least 6 characters');

  const admin = await Admin.findById(me._id).select('+password');
  if (!(await admin.matchPassword(String(currentPassword || '')))) throw new HttpError(400, 'Current password is wrong');

  admin.password = String(newPassword);
  if (username?.trim()) admin.username = username.trim().toLowerCase();
  await admin.save();
  return json({ message: 'Password updated' });
});
