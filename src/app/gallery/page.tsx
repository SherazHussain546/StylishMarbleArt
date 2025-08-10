'use client';

import { GalleryComponent } from '@/components/gallery-component';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';

export default function GalleryPage() {
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
