import Admin from '@/models/Admin';
import { HttpError, json, readJson, route } from '@/lib/http';
import { rateLimit } from '@/lib/rateLimit';
import { SESSION_COOKIE, SESSION_MAX_AGE, signSession } from '@/lib/session';

export const POST = route(async (req) => {
  rateLimit(req, { key: 'login', limit: 10 });
  const { username, password } = await readJson(req);
  if (!username || !password) throw new HttpError(400, 'Username and password are required');

  const admin = await Admin.findOne({ username: String(username).toLowerCase().trim() }).select('+password');
  if (!admin || !(await admin.matchPassword(String(password)))) throw new HttpError(401, 'Wrong username or password');

  const res = json({ admin: { id: admin._id, username: admin.username, name: admin.name } });
  res.cookies.set(SESSION_COOKIE, await signSession({ id: String(admin._id) }), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SESSION_MAX_AGE,
  });
  return res;
});
