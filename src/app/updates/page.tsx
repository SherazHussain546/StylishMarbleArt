
import type { Metadata } from 'next';
import { content } from '@/lib/content';
import UpdatesPageClient from './updates-page-client';

// SEO Metadata for the Updates page
export async function generateMetadata(): Promise<Metadata> {
  const pageContent = content.updatesPage;
  const englishTitle = 'Updates & Community Work | Stylish Marble Art Karachi';
  const urduTitle = 'اپ ڈیٹس اور کمیونٹی ورک | سٹائلش ماربل آرٹ کراچی';
  const englishDescription = 'Stay updated with the latest news, projects, and community initiatives from Stylish Marble Art in Karachi, Pakistan. See our charity work and recent activities.';
  const urduDescription = 'کراچی، پاکستان میں سٹائلش ماربل آرٹ کی تازہ ترین خبروں، منصوبوں، اور کمیونٹی اقدامات سے باخبر رہیں۔ ہمارے فلاحی کام اور حالیہ سرگرمیاں دیکھیں۔';

  return {
    title: `${englishTitle} | ${urduTitle}`,
    description: `${englishDescription} | ${urduDescription}`,
    keywords: [
      'Stylish Marble Art updates',
      'Karachi charity updates',
      'community work Pakistan',
      'marble projects news',
      'Ramadan charity drive',
      'local news Karachi',
      'سٹائلش ماربل آرٹ اپ ڈیٹس',
      'کراچی فلاحی اپ ڈیٹس',
      'کمیونٹی ورک پاکستان',
    ],
    openGraph: {
      title: englishTitle,
      description: englishDescription,
      images: [
        {
          url: 'https://images.unsplash.com/photo-1521483451569-e33803c0330c?q=80&w=1200&auto=format&fit=crop',
          width: 1200,
          height: 630,
          alt: 'Community charity event by Stylish Marble Art in Karachi',
        },
      ],
    },
    alternates: {
      canonical: '/updates',
    },
  };
}

// Page Component
export default function UpdatesPage() {
  return <UpdatesPageClient />;
}

    