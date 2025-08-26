
import type { Metadata } from 'next';
import GalleryPageClient from './gallery-page-client';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Marble Work Gallery - Gravestones, Kitchens, & More | Stylish Marble Art',
    description: 'View our gallery of projects, including custom gravestones, headstones, kitchen countertops, and marble flooring. See the quality of our marble craftsmanship in Karachi, Pakistan.',
    keywords: ['marble work gallery', 'gravestone pictures', 'kitchen marble photos', 'marble engraving examples', 'headstone designs Pakistan', 'سنگ مرمر کے کام کی گیلری', 'قبر کے پتھر کی تصاویر'],
};


// Page Component
export default function GalleryPage() {
  return <GalleryPageClient />;
}
