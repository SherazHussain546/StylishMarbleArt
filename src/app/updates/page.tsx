
import type { Metadata } from 'next';
import { content } from '@/lib/content';
import UpdatesPageClient from './updates-page-client';

// SEO Metadata for the Updates page
export async function generateMetadata(): Promise<Metadata> {
  const englishTitle = 'Recent Projects & Workshop Updates | Stylish Marble Art Karachi';
  const urduTitle = 'حالیہ پروجیکٹس اور ورکشاپ اپ ڈیٹس | سٹائلش ماربل آرٹ کراچی';
  const englishDescription = 'See the latest marble projects, custom gravestones, and workshop highlights from Stylish Marble Art in Karachi, Pakistan.';
  const urduDescription = 'کراچی، پاکستان میں سٹائلش ماربل آرٹ کے تازہ ترین ماربل پروجیکٹس، کسٹم قبر کے پتھر اور ورکشاپ کی جھلکیاں دیکھیں۔';

  return {
    title: `${englishTitle} | ${urduTitle}`,
    description: `${englishDescription} | ${urduDescription}`,
    keywords: [
      'Stylish Marble Art updates',
      'Karachi marble news',
      'marble projects Karachi',
      'marble craftsmanship Pakistan',
      'custom marble news',
      'recent work Karachi',
      'سٹائلش ماربل آرٹ اپ ڈیٹس',
      'کراچی ماربل اپ ڈیٹس',
      'سنگ مرمر کے منصوبے',
    ],
    openGraph: {
      title: englishTitle,
      description: englishDescription,
      images: [
        {
          url: '/SMAHeader.png',
          width: 1200,
          height: 630,
          alt: 'Recent project by Stylish Marble Art in Karachi',
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
