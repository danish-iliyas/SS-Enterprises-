import { cache } from 'react';
import connectDB from './db';
import Product from '@/models/Product';
import Category from '@/models/Category';
import Service from '@/models/Service';
import Setting from '@/models/Setting';
import Testimonial from '@/models/Testimonial';
import { escapeRx } from './http';

// Plain JSON-safe objects for passing to client components.
const plain = (v) => JSON.parse(JSON.stringify(v));

const SORTS = {
  newest: { createdAt: -1 },
  price_asc: { mrp: 1 },
  price_desc: { mrp: -1 },
};

export async function listProducts({ category, q, featured, sort, page = 1, limit = 24 } = {}) {
  await connectDB();
  const filter = {};
  if (category) {
    const cat = await Category.findOne({ slug: category }).lean();
    if (!cat) return { items: [], total: 0, page, pages: 1 };
    filter.category = cat._id;
  }
  if (featured) filter.featured = true;
  if (q) {
    const rx = new RegExp(escapeRx(q), 'i');
    filter.$or = [{ 'name.en': rx }, { 'name.hi': rx }, { brand: rx }, { 'shortDescription.en': rx }];
  }
  const [items, total] = await Promise.all([
    Product.find(filter)
      .populate('category', 'slug name')
      .sort(SORTS[sort] || { featured: -1, available: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit),
    Product.countDocuments(filter),
  ]);
  return plain({ items, total, page, pages: Math.ceil(total / limit) || 1 });
}

export async function getProduct(key) {
  await connectDB();
  const product = await Product.findOne(/^[a-f\d]{24}$/i.test(key) ? { _id: key } : { slug: key }).populate(
    'category',
    'slug name'
  );
  if (!product) return null;
  const related = await Product.find({ category: product.category?._id, _id: { $ne: product._id } })
    .populate('category', 'slug name')
    .sort({ available: -1, featured: -1 })
    .limit(4);
  return plain({ product, related });
}

export async function listCategories({ all = false } = {}) {
  await connectDB();
  const [cats, counts] = await Promise.all([
    Category.find(all ? {} : { active: true }).sort({ order: 1, 'name.en': 1 }).lean(),
    Product.aggregate([{ $group: { _id: '$category', count: { $sum: 1 } } }]),
  ]);
  const byId = new Map(counts.map((c) => [String(c._id), c.count]));
  return plain(cats.map((c) => ({ ...c, count: byId.get(String(c._id)) || 0 })));
}

export const listServices = cache(async ({ all = false } = {}) => {
  await connectDB();
  return plain(await Service.find(all ? {} : { active: true }).sort({ order: 1 }).lean());
});

export async function getService(slug) {
  await connectDB();
  const s = await Service.findOne({ slug, active: true }).lean();
  return s ? plain(s) : null;
}

// cache(): one DB read per request even when several layouts/pages ask.
export const getSettings = cache(async () => {
  await connectDB();
  return plain(await Setting.get());
});

export async function listTestimonials({ all = false } = {}) {
  await connectDB();
  return plain(await Testimonial.find(all ? {} : { active: true }).sort({ order: 1, createdAt: -1 }).lean());
}
