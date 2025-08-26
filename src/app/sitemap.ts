import { MetadataRoute } from 'next'
import { content } from '@/lib/content';

const BASE_URL = 'https://www.stylishmarbleart.com';

export default function sitemap(): MetadataRoute.Sitemap {
  
  // Static pages
  const staticRoutes = [
    '',
    '/services',
    '/gallery',
    '/about',
    '/contact',
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic marble pages
  const marbleRoutes = content.marbleTypes.types.map((marble) => ({
    url: `${BASE_URL}/marbles/${marble.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...marbleRoutes,
  ];
}
