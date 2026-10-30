import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { listCategories, listServices } from '@/lib/queries';
import { SITE_URL } from '@/lib/constants';

export const revalidate = 3600;

export default async function sitemap() {
  const now = new Date();
  const pages = ['', '/services', '/shop', '/book-service', '/about', '/contact'].map((p) => ({
    url: `${SITE_URL}${p}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: p === '' ? 1 : 0.8,
  }));

  try {
    await connectDB();
    const [services, categories, products] = await Promise.all([
      listServices(),
      listCategories(),
      Product.find({}, 'slug updatedAt').lean(),
    ]);
    return [
      ...pages,
      ...services.map((s) => ({ url: `${SITE_URL}/services/${s.slug}`, lastModified: s.updatedAt, priority: 0.9 })),
      ...categories.map((c) => ({ url: `${SITE_URL}/shop?category=${c.slug}`, lastModified: now, priority: 0.6 })),
      ...products.map((p) => ({ url: `${SITE_URL}/shop/${p.slug}`, lastModified: p.updatedAt, priority: 0.7 })),
    ];
  } catch {
    return pages;
  }
}
