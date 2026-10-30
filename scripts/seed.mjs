// Seeds starter content. Safe to run again: existing records are kept.
//   npm run seed         -> adds anything missing
//   npm run seed:fresh   -> wipes catalogue/content (NOT bookings or enquiries) and re-creates it
import mongoose from 'mongoose';
import sharp from 'sharp';
import Admin from '../src/models/Admin.js';
import Category from '../src/models/Category.js';
import Product from '../src/models/Product.js';
import Service from '../src/models/Service.js';
import Setting from '../src/models/Setting.js';
import Testimonial from '../src/models/Testimonial.js';
import Image from '../src/models/Image.js';
import { saveImage } from '../src/lib/images.js';
import { artSvg } from '../src/lib/art.js';
import * as seed from '../src/data/seed.js';

const fresh = process.argv.includes('--fresh');
const slug = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);

async function artImage(kind, name) {
  const png = await sharp(Buffer.from(artSvg(kind))).png().toBuffer();
  return saveImage(png, `${name}.png`);
}

async function main() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI missing (check .env.local)');
  await mongoose.connect(process.env.MONGODB_URI);
  console.log(`Connected to ${mongoose.connection.name}`);

  if (fresh) {
    const imgs = [
      ...(await Product.distinct('images')),
      ...(await Service.distinct('image')),
    ].filter(Boolean);
    await Promise.all([
      Product.deleteMany({}),
      Category.deleteMany({}),
      Service.deleteMany({}),
      Testimonial.deleteMany({}),
      Setting.deleteMany({}),
      Image.deleteMany({ _id: { $in: imgs } }),
    ]);
    console.log('Cleared catalogue and content');
  }

  // Admin
  const username = (process.env.ADMIN_USERNAME || 'admin').toLowerCase();
  if (!(await Admin.exists({ username }))) {
    await Admin.create({ username, password: process.env.ADMIN_PASSWORD || 'ChangeMe@123', name: 'Shop Owner' });
    console.log(`Admin created: ${username}`);
  }

  // Settings
  if (!(await Setting.exists({ key: 'site' }))) {
    await Setting.create({ key: 'site', ...seed.settings });
    console.log('Settings created');
  }

  // Categories
  const catIds = {};
  for (const c of seed.categories) {
    const doc = await Category.findOneAndUpdate({ slug: c.slug }, { $setOnInsert: c }, { upsert: true, new: true });
    catIds[c.slug] = doc._id;
  }
  console.log(`Categories: ${seed.categories.length}`);

  // Services
  for (const [i, s] of seed.services.entries()) {
    if (await Service.exists({ slug: s.slug })) continue;
    await Service.create({ ...s, order: i + 1 });
  }
  console.log(`Services: ${seed.services.length}`);

  // Products (with generated, compressed WebP images stored in MongoDB)
  let created = 0;
  for (const { art, category, ...p } of seed.products) {
    const s = slug(p.name.en);
    if (await Product.exists({ slug: s })) continue;
    const img = await artImage(art, s);
    await Product.create({
      ...p,
      slug: s,
      category: catIds[category],
      discountPercent: seed.settings.defaultDiscount,
      images: [img._id],
    });
    created += 1;
  }
  console.log(`Products created: ${created}`);

  // Testimonials
  if (!(await Testimonial.estimatedDocumentCount())) {
    await Testimonial.insertMany(seed.testimonials);
    console.log(`Testimonials: ${seed.testimonials.length}`);
  }

  await mongoose.disconnect();
  console.log('Done ✔');
}

main().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
