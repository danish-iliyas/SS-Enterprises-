// Downloads free stock photos (Pexels licence: free for commercial use, no attribution required),
// compresses them to WebP and stores them in MongoDB for services and sample products.
//   npm run photos
// Items not listed here keep their illustration until the owner uploads a real photo in Admin.
import mongoose from 'mongoose';
import Service from '../src/models/Service.js';
import Product from '../src/models/Product.js';
import { saveImage, deleteImages } from '../src/lib/images.js';

const pexels = (id) => `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=1600`;

// service slug → Pexels photo id, or { url, credit } for photos whose licence needs a credit line
const SERVICE_PHOTOS = {
  'ro-water-purifier-service': 36847822, // water purifier units
  'ac-repair-service': 38788452, // wall-mounted split AC
  'cooler-repair-service': {
    // Traditional desert cooler, North India — Wikimedia Commons, CC BY-SA 1.0
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Air_cooler.jpg',
    credit: 'Photo: Utkarshsingh.1992 / Wikimedia Commons, CC BY-SA 1.0',
  },
  'washing-machine-repair': 7282378, // front-load washing machine
  'fridge-repair-service': 9551373, // open refrigerator
  'geyser-repair-service': 28479466, // wall-mounted water heater
  'electrical-wiring-service': 257736, // electrician at switchboard
  'home-electrical-repair': 33531832, // testing wires with multimeter
};

// product slug → Pexels photo id (representative photos for sample products)
const PRODUCT_PHOTOS = {
  'ro-uv-water-purifier-wall-mount-12-l': 36847822,
  'ro-mineral-water-purifier-10-l': 416528,
  'ro-tap-faucet-steel-finish': 3787025,
  'ro-smps-adapter-24v': 12320170,
  'ac-capacitor-45-5-mfd': 7116599,
  'cooler-motor-high-speed': 34194564,
  'modular-switchboard-4-switch-1-socket': 12996907,
};

const cache = new Map();
async function photo(src, name) {
  const id = typeof src === 'object' ? src.url : src;
  if (!cache.has(id)) {
    const url = typeof src === 'object' ? src.url : pexels(src);
    const res = await fetch(url, { headers: { 'User-Agent': 'SSEnterprisesSite/1.0 (photo import script)' } });
    if (!res.ok) throw new Error(`Download failed for ${url}: ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    cache.set(id, buf);
  }
  // A separate stored copy per item, so deleting one item never breaks another.
  return saveImage(cache.get(id), `${name}.jpg`);
}

async function main() {
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI missing (check .env.local)');
  await mongoose.connect(process.env.MONGODB_URI);

  for (const [slug, id] of Object.entries(SERVICE_PHOTOS)) {
    const s = await Service.findOne({ slug });
    if (!s) continue;
    const img = await photo(id, slug);
    await deleteImages([s.image]);
    s.image = img._id;
    s.imageCredit = typeof id === 'object' ? id.credit : '';
    await s.save();
    console.log(`service  ${slug}: ${Math.round(img.originalSize / 1024)}KB → ${Math.round(img.size / 1024)}KB`);
  }

  for (const [slug, id] of Object.entries(PRODUCT_PHOTOS)) {
    const p = await Product.findOne({ slug });
    if (!p) continue;
    const img = await photo(id, slug);
    await deleteImages(p.images);
    p.images = [img._id];
    await p.save();
    console.log(`product  ${slug}: ${Math.round(img.originalSize / 1024)}KB → ${Math.round(img.size / 1024)}KB`);
  }

  await mongoose.disconnect();
  console.log('Done ✔');
}

main().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
