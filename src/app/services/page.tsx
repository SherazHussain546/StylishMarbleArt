import type { Metadata } from 'next';
import ServicesPageClient from './services-page-client';

// SEO Metadata Optimized with keywords and geographic data
export const metadata: Metadata = {
    title: 'Expert Marble Services in Karachi | Gravestones & Kitchens',
    description: 'Premier marble services in Karachi. Custom Ziarat White gravestones, headstones, and modern kitchen countertops in Malir 15. Over 50 years of stonemasonry excellence in Pakistan.',
    keywords: [
      'marble services Karachi', 
      'headstone maker Karachi', 
      'gravestone makers Pakistan', 
      'kitchen marble installation Karachi', 
      'custom stone engraving Pakistan', 
      'Ziarat White memorials', 
      'Black Granite headstones', 
      'stonemason Malir 15',
      'Islamic grave design Karachi',
      'marble shop National Highway Karachi'
    ],
    openGraph: {
      title: 'Expert Marble Craftsmanship in Karachi | Stylish Marble Art',
      description: 'Specialists in dignified gravestones and premium home marble installations across Pakistan.',
      images: ['/SMAHeader.png'],
    }
};

// Page Component
export default function ServicesPage() {
  return <ServicesPageClient />;
}
