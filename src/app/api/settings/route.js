import Setting from '@/models/Setting';
import Product from '@/models/Product';
import { json, pick, readJson, route } from '@/lib/http';
import { requireAdmin } from '@/lib/auth';
import { deleteImages } from '@/lib/images';

const FIELDS = [
  'businessName', 'tagline', 'phone', 'whatsapp', 'email', 'address', 'hours', 'serviceArea',
  'mapEmbedUrl', 'mapLink', 'about', 'defaultDiscount', 'banners',
];

export const GET = route(async () => json(await Setting.get()));

export const PUT = route(async (req) => {
  await requireAdmin(req);
  const settings = await Setting.get();
  const body = await readJson(req);
  const data = pick(body, FIELDS);

  if (data.phone) data.phone = String(data.phone).replace(/\D/g, '').slice(-10);
  if (data.whatsapp) {
    const digits = String(data.whatsapp).replace(/\D/g, '');
    data.whatsapp = digits.length === 10 ? `91${digits}` : digits;
  }
  // Google gives an <iframe> snippet; keep only its src URL.
  if (data.mapEmbedUrl?.includes('<iframe')) data.mapEmbedUrl = data.mapEmbedUrl.match(/src="([^"]+)"/)?.[1] || '';

  // Delete banner images that were removed.
  if (Array.isArray(data.banners)) {
    const keep = new Set(data.banners.map((b) => String(b.image || '')));
    await deleteImages(settings.banners.map((b) => b.image).filter((img) => img && !keep.has(String(img))));
  }

  settings.set(data);
  await settings.save();

  // Optional: apply the shop-wide offer (e.g. 30%) to every existing product.
  if (body.applyDiscountToAll === true) {
    await Product.updateMany({}, { discountPercent: settings.defaultDiscount });
  }
  return json(settings);
});
