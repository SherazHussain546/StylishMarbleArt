import type { Metadata } from 'next';
import { content } from '@/lib/content';
import AboutPageClient from './about-page-client';

// SEO Metadata Optimized for the About page
export async function generateMetadata(): Promise<Metadata> {
  const pageContent = content.aboutPage;
  const englishTitle = 'About Stylish Marble Art | Karachi\'s Legacy Headstone Maker';
  const urduTitle = 'سٹائلش ماربل آرٹ کے بارے میں | کراچی کا قدیم کتبہ بنانے والا';
  const englishDescription = 'Discover the 50-year legacy of Stylish Marble Art in Karachi. Trusted experts in Ziarat White memorials, Black Granite headstones, and custom kitchen marble across Pakistan.';
  const urduDescription = 'کراچی میں سٹائلش ماربل آرٹ کی 50 سالہ میراث دریافت کریں۔ پاکستان بھر میں زیارت وائٹ یادگاروں، بلیک گرینائٹ کتبوں اور کسٹم کچن ماربل کے قابل اعتماد ماہرین۔';

  return {
    title: `${englishTitle} | ${urduTitle}`,
    description: `${englishDescription} | ${urduDescription}`,
    keywords: [
      'about Stylish Marble Art', 
      'marble history Karachi', 
      'family business marble Pakistan', 
      'stonemason Malir 15', 
      'Ziarat White experts Pakistan',
      'gravestone makers Karachi history',
      'headstone maker Malir 15',
      'ہمارے بارے میں', 
      'سنگ مرمر کی تاریخ', 
      'خاندانی کاروبار'
    ],
    openGraph: {
        title: englishTitle,
        description: englishDescription,
        url: 'https://www.stylishmarbleart.com/about',
        siteName: 'Stylish Marble Art',
        images: [
          {
            url: '/SMA.png',
            width: 800,
            height: 600,
            alt: 'Stylish Marble Art Workshop in Karachi',
          },
        ],
        locale: 'en_US',
        type: 'website',
    }
  };
}

// Page Component
export default function AboutPage() {
  return <AboutPageClient />;
}
