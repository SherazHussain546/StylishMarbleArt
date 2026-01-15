
import { MetadataRoute } from 'next';
import { content } from '@/lib/content';

const BASE_URL = 'https://www.stylishmarbleart.com';

export default function sitemap(): MetadataRoute.Sitemap {
  // Static pages
  const staticRoutes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' },
    { url: '/services', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/gallery', priority: 0.8, changeFrequency: 'weekly' },
    { url: '/updates', priority: 0.7, changeFrequency: 'weekly' },
    { url: '/about', priority: 0.7, changeFrequency: 'yearly' },
    { url: '/contact', priority: 0.5, changeFrequency: 'yearly' },
  ].map((route) => ({
    url: `${BASE_URL}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency as 'weekly' | 'monthly' | 'yearly',
    priority: route.priority,
  }));

  // Dynamic marble pages
  const marbleRoutes = content.marbleTypes.types.map((marble) => ({
    url: `${BASE_URL}/marbles/${marble.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...marbleRoutes];
}

    