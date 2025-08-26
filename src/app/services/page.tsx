
import type { Metadata } from 'next';
import ServicesPageClient from './services-page-client';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Our Services | Stylish Marble Art',
    description: 'We offer a comprehensive range of marble services, from memorial crafting to home installations. Our team is here to guide you through every step of the process with care and professionalism.',
    keywords: ['marble services', 'gravestone making', 'kitchen marble installation', 'custom engraving', 'marble repair', 'ماربل کی خدمات', 'قبر بنانا', 'کچن ماربل'],
};


// Page Component
export default function ServicesPage() {
  return <ServicesPageClient />;
}
