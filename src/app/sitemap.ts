
import { MetadataRoute } from 'next';
import { content } from '@/lib/content';

const BASE_URL = 'https://www.stylishmarbleart.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages with optimized frequencies and priorities
  const staticRoutes = [
    { url: '/', priority: 1.0, changeFrequency: 'daily' },
    { url: '/services', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/gallery', priority: 0.9, changeFrequency: 'daily' },
    { url: '/locator', priority: 0.8, changeFrequency: 'daily' },
    { url: '/quran', priority: 0.9, changeFrequency: 'weekly' },
    { url: '/reviews', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/about', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/faq', priority: 0.7, changeFrequency: 'monthly' },
    { url: '/contact', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/updates', priority: 0.8, changeFrequency: 'weekly' },
  ].map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as 'daily' | 'weekly' | 'monthly' | 'yearly',
    priority: route.priority,
  }));

  // Dynamic marble product pages
  const marbleRoutes = content.marbleTypes.types.map((marble) => ({
    url: `${BASE_URL}/marbles/${marble.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...marbleRoutes];
}
