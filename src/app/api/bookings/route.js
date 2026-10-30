import Booking from '@/models/Booking';
import { cleanMobile, escapeRx, json, pageParams, pick, readJson, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';
import { rateLimit } from '@/lib/rateLimit';

// Public: customer submits a service booking request.
export const POST = route(async (req) => {
  rateLimit(req, { key: 'booking' });
  const body = await readJson(req);
  if (body.website) return json({ ok: true }, { status: 201 }); // honeypot field for bots

  const data = pick(body, ['name', 'mobile', 'appliance', 'serviceType', 'problem', 'address', 'preferredDate', 'preferredTime', 'language']);
  if (data.mobile) data.mobile = cleanMobile(data.mobile);
  if (!data.preferredDate) delete data.preferredDate;

  const booking = await Booking.create(data);
  return json({ id: booking._id, bookingNo: booking.bookingNo }, { status: 201 });
});

// Admin: list with filters (appliance, status, date range, search) and pagination.
export const GET = route(async (req) => {
  await requireAdmin(req);
  const sp = req.nextUrl.searchParams;
  const { page, limit, skip } = pageParams(sp);

  const filter = {};
  if (sp.get('appliance')) filter.appliance = sp.get('appliance');
  if (sp.get('status')) filter.status = sp.get('status');
  const from = sp.get('from');
  const to = sp.get('to');
  if (from || to) {
    filter.createdAt = {};
    if (from) filter.createdAt.$gte = new Date(`${from}T00:00:00`);
    if (to) filter.createdAt.$lte = new Date(`${to}T23:59:59.999`);
  }
  if (sp.get('q')) {
    const rx = new RegExp(escapeRx(sp.get('q')), 'i');
    filter.$or = [{ name: rx }, { mobile: rx }, { bookingNo: rx }, { address: rx }];
  }

  const [items, total] = await Promise.all([
    Booking.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Booking.countDocuments(filter),
  ]);
  return json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
});
