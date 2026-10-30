import Enquiry, { ENQUIRY_TYPES } from '@/models/Enquiry';
import Product from '@/models/Product';
import { cleanMobile, json, pageParams, pick, readJson, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';
import { rateLimit } from '@/lib/rateLimit';

// Public: contact form, product enquiry, or cart order enquiry.
export const POST = route(async (req) => {
  rateLimit(req, { key: 'enquiry' });
  const body = await readJson(req);
  if (body.website) return json({ ok: true }, { status: 201 }); // honeypot

  const data = pick(body, ['type', 'name', 'mobile', 'message', 'address']);
  if (!ENQUIRY_TYPES.includes(data.type)) data.type = 'general';
  if (data.mobile) data.mobile = cleanMobile(data.mobile);

  // Prices are re-read from the database so the stored total can be trusted.
  const rawItems = Array.isArray(body.items) ? body.items.slice(0, 50) : [];
  if (rawItems.length) {
    const products = await Product.find({ _id: { $in: rawItems.map((i) => i.product).filter(Boolean) } });
    const byId = new Map(products.map((p) => [String(p._id), p]));
    data.items = rawItems
      .map((i) => {
        const p = byId.get(String(i.product));
        if (!p) return null;
        return { product: p._id, name: p.name.en, qty: Math.max(1, Math.min(99, parseInt(i.qty, 10) || 1)), price: p.price };
      })
      .filter(Boolean);
    const priced = data.items.filter((i) => i.price != null);
    data.total = priced.length ? priced.reduce((s, i) => s + i.price * i.qty, 0) : null;
  }

  const enquiry = await Enquiry.create(data);
  return json({ id: enquiry._id, total: enquiry.total, items: enquiry.items }, { status: 201 });
});

export const GET = route(async (req) => {
  await requireAdmin(req);
  const sp = req.nextUrl.searchParams;
  const { page, limit, skip } = pageParams(sp);
  const filter = {};
  if (sp.get('type')) filter.type = sp.get('type');
  if (sp.get('status')) filter.status = sp.get('status');

  const [items, total] = await Promise.all([
    Enquiry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Enquiry.countDocuments(filter),
  ]);
  return json({ items, total, page, pages: Math.ceil(total / limit) || 1 });
});
