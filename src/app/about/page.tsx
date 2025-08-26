
import type { Metadata } from 'next';
import { content } from '@/lib/content';
import AboutPageClient from './about-page-client';

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const pageContent = content.aboutPage;
  const englishTitle = 'About Our Marble Craftsmanship | Stylish Marble Art Karachi';
  const urduTitle = 'ہماری ماربل کی دستکاری کے بارے میں | سٹائلش ماربل آرٹ کراچی';
  const englishDescription = 'Learn about the family legacy and values of Stylish Marble Art, Karachi\'s trusted experts in stonemasonry, memorials, gravestones, and custom marble works for over 50 years.';
  const urduDescription = 'اسٹائلش ماربل آرٹ کی خاندانی میراث اور اقدار کے بارے میں جانیں، جو 50 سال سے زیادہ عرصے سے کراچی کے پتھر کی چنائی، یادگاروں، قبر کے پتھروں اور کسٹم ماربل کے کاموں کے قابل اعتماد ماہر ہیں۔';

  return {
    title: `${englishTitle} | ${urduTitle}`,
    description: `${englishDescription} | ${urduDescription}`,
    keywords: ['about Stylish Marble Art', 'marble history Karachi', 'family business marble Pakistan', 'stonemasonry Karachi', 'our story', 'ہمارے بارے میں', 'سنگ مرمر کی تاریخ', 'خاندانی کاروبار'],
    openGraph: {
        title: englishTitle,
        description: englishDescription,
    }
  };
}

// Page Component
export default function AboutPage() {
  return <AboutPageClient />;
}
