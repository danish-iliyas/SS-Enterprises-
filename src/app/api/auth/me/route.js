import { json, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';

export const GET = route(async (req) => {
  const { _id, username, name } = await requireAdmin(req);
  return json({ id: _id, username, name });
});
