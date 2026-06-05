import type { Metadata } from 'next';
import GalleryPageClient from './gallery-page-client';
import { content } from '@/lib/content';

// SEO Metadata for the Gallery page
export async function generateMetadata(): Promise<Metadata> {
  const englishTitle = 'Marble Work Portfolio | Custom Headstones & Kitchens | Karachi';
  const urduTitle = 'ماربل ورک پورٹ فولیو | کسٹم کتبے اور کچن | کراچی';
  const englishDescription = 'Browse our gallery of premium Ziarat White gravestones, Black Granite headstones, and custom marble kitchen countertops crafted in Karachi, Pakistan.';
  const urduDescription = 'کراچی، پاکستان میں تیار کردہ پریمیم زیارت وائٹ کتبوں، بلیک گرینائٹ یادگاروں اور کسٹم ماربل کچن کاؤنٹر ٹاپس کی ہماری گیلری دیکھیں۔';

  return {
    title: `${englishTitle} | ${urduTitle}`,
    description: `${englishDescription} | ${urduDescription}`,
    keywords: [
      'marble gallery Karachi',
      'headstone portfolio Pakistan',
      'custom marble designs Karachi',
      'gravestone photos Pakistan',
      'kitchen marble Karachi images',
      'Islamic stonemasonry Karachi',
      'ماربل گیلری کراچی',
      'کتبوں کے ڈیزائن',
    ],
    openGraph: {
      title: englishTitle,
      description: englishDescription,
      url: 'https://www.stylishmarbleart.com/gallery',
      siteName: 'Stylish Marble Art',
      images: [
        {
          url: '/Gallery/Grave/8.png',
          width: 800,
          height: 800,
          alt: 'Premium Marble Gravestone by Stylish Marble Art',
        },
      ],
    },
  };
}

export default function GalleryPage() {
  return <GalleryPageClient />;
}
