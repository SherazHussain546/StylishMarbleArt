import type { Metadata } from 'next';
import AboutPageClient from './about-page-client';

// Static Metadata for the About page
export const metadata: Metadata = {
  title: 'About Stylish Marble Art | Karachi\'s Legacy Headstone Maker',
  description: 'Discover the 50-year legacy of Stylish Marble Art in Karachi. Trusted experts in Ziarat White memorials, Black Granite headstones, and custom kitchen marble across Pakistan.',
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
      title: 'About Stylish Marble Art | Karachi\'s Legacy Headstone Maker',
      description: 'Discover the 50-year legacy of Stylish Marble Art in Karachi. Trusted experts in Ziarat White memorials and custom stone work.',
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

// Page Component
export default function AboutPage() {
  return <AboutPageClient />;
}
