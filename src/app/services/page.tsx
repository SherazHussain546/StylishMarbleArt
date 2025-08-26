
import type { Metadata } from 'next';
import ServicesPageClient from './services-page-client';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Marble Services in Karachi, Pakistan | Stylish Marble Art',
    description: 'We offer a full range of marble services in Karachi, including custom gravestones, kitchen countertop installation, marble engraving, and stone restoration. Contact us for a consultation in Pakistan.',
    keywords: ['marble services Karachi', 'gravestone making Pakistan', 'kitchen marble installation', 'custom engraving Karachi', 'marble repair', 'stone restoration', 'ماربل کی خدمات', 'قبر بنانا', 'کچن ماربل'],
};


// Page Component
export default function ServicesPage() {
  return <ServicesPageClient />;
}
