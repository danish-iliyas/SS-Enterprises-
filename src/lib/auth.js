import Admin from '@/models/Admin';
import { HttpError } from './http';
import { SESSION_COOKIE, verifySession } from './session';

// Use inside admin route handlers: throws 401 unless a valid admin session cookie is present.
export async function requireAdmin(req) {
  const payload = await verifySession(req.cookies.get(SESSION_COOKIE)?.value);
  if (!payload?.id) throw new HttpError(401, 'Please log in');
  const admin = await Admin.findById(payload.id);
  if (!admin) throw new HttpError(401, 'Account not found');
  return admin;
}
