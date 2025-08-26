import type { Metadata } from 'next';
import { content } from '@/lib/content';

// Client Component
import { useLanguage } from '@/contexts/language-context';
import { GalleryComponent } from '@/components/gallery-component';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Gallery - Our Marble Work',
    description: 'View our gallery of completed projects, including custom gravestones, headstones, kitchen countertops, and marble flooring. See the quality of our craftsmanship.',
    keywords: ['marble work gallery', 'gravestone pictures', 'kitchen marble photos', 'marble engraving examples', 'سنگ مرمر کے کام کی گیلری', 'قبر کے پتھر کی تصاویر'],
};


// Page Component
export default function GalleryPage() {
  'use client';
  
  const { language } = useLanguage();
  const pageContent = content.galleryPage;

  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{pageContent.title[language]}</h1>
        <p className="mt-4 text-xl text-muted-foreground">{pageContent.description[language]}</p>
      </div>
      <div className="mt-16">
        <GalleryComponent />
      </div>
    </div>
  );
}
