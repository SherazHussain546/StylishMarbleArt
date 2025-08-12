'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { content } from '@/lib/content';

type Category = 'Headstones' | 'Graves' | 'Government Works' | 'Charity Work' | 'Home Decors' | 'Inlays & Patterns';

const galleryImages = [
  // Headstones
  { src: '/gallery/1.png', alt: 'Elegant marble headstone', hint: 'marble headstone', category: 'Headstones' as Category },
  { src: '/gallery/2.png', alt: 'Granite family monument', hint: 'granite monument', category: 'Headstones' as Category },
  { src: '/gallery/8.png', alt: 'Double headstone for a couple', hint: 'double headstone', category: 'Headstones' as Category },
  { src: '/gallery/12.png', alt: 'Polished black granite tombstone', hint: 'granite tombstone', category: 'Headstones' as Category },
  { src: '/gallery/3.png', alt: 'Detailed engraving on a memorial', hint: 'memorial engraving', category: 'Headstones' as Category },
  { src: '/gallery/4.png', alt: 'Bronze plaque on stone', hint: 'bronze plaque', category: 'Headstones' as Category },


  // Graves
  { src: '/gallery/5.png', alt: 'Serene cemetery setting with a custom headstone', hint: 'cemetery headstone', category: 'Graves' as Category },
  { src: '/gallery/6.png', alt: 'Restored vintage gravestone', hint: 'restored gravestone', category: 'Graves' as Category },
  { src: '/gallery/7.png', alt: 'A child memorial stone with carving', hint: 'child memorial', category: 'Graves' as Category },
  { src: 'https://placehold.co/600x400.png', alt: 'Placeholder grave image', hint: 'grave', category: 'Graves' as Category },
  { src: 'https://placehold.co/600x401.png', alt: 'Placeholder grave image 2', hint: 'grave', category: 'Graves' as Category },

  // Government Works
  { src: '/gallery/11.png', alt: 'Custom engraved marble sign for a government building', hint: 'engraved sign', category: 'Government Works' as Category },
  { src: 'https://placehold.co/600x400.png', alt: 'Placeholder gov work image', hint: 'government building', category: 'Government Works' as Category },
  { src: 'https://placehold.co/600x401.png', alt: 'Placeholder gov work image 2', hint: 'government building', category: 'Government Works' as Category },
  { src: 'https://placehold.co/600x402.png', alt: 'Placeholder gov work image 3', hint: 'government building', category: 'Government Works' as Category },
  { src: 'https://placehold.co/600x403.png', alt: 'Placeholder gov work image 4', hint: 'government building', category: 'Government Works' as Category },
  
  // Charity Work
  { src: 'https://placehold.co/600x400.png', alt: 'Marble statue for charity', hint: 'marble statue', category: 'Charity Work' as Category },
  { src: '/gallery/13.png', alt: 'White marble statue detail for a charity project', hint: 'marble statue', category: 'Charity Work' as Category },
  { src: '/gallery/16.png', alt: 'Large memorial with multiple engravings for a community park', hint: 'large memorial', category: 'Charity Work' as Category },
  { src: 'https://placehold.co/600x401.png', alt: 'Placeholder charity image', hint: 'charity work', category: 'Charity Work' as Category },
  { src: 'https://placehold.co/600x402.png', alt: 'Placeholder charity image 2', hint: 'charity work', category: 'Charity Work' as Category },


  // Home Decors
  { src: '/gallery/9.png', alt: 'Modern kitchen with marble countertop', hint: 'kitchen countertop', category: 'Home Decors' as Category },
  { src: '/gallery/10.png', alt: 'Marble flooring in a house entrance', hint: 'marble flooring', category: 'Home Decors' as Category },
  { src: '/gallery/14.png', alt: 'Artificial marble bathroom vanity', hint: 'bathroom vanity', category: 'Home Decors' as Category },
  { src: '/gallery/15.png', alt: 'Close-up of marble texture for a home project', hint: 'marble texture', category: 'Home Decors' as Category },
  { src: 'https://placehold.co/600x400.png', alt: 'Placeholder home decor', hint: 'home decor', category: 'Home Decors' as Category },


  // Inlays & Patterns
  { src: 'https://placehold.co/600x400.png', alt: 'Geometric marble floor inlay', hint: 'marble floor inlay', category: 'Inlays & Patterns' as Category },
  { src: 'https://placehold.co/600x401.png', alt: 'Floral marble pattern on a wall', hint: 'floral marble pattern', category: 'Inlays & Patterns' as Category },
  { src: 'https://placehold.co/600x402.png', alt: 'Placeholder inlay', hint: 'inlay pattern', category: 'Inlays & Patterns' as Category },
  { src: 'https://placehold.co/600x403.png', alt: 'Placeholder pattern', hint: 'marble pattern', category: 'Inlays & Patterns' as Category },
  { src: 'https://placehold.co/600x404.png', alt: 'Placeholder inlay 2', hint: 'inlay pattern', category: 'Inlays & Patterns' as Category },
];

const INITIAL_VISIBLE_IMAGES = 4;
const IMAGES_TO_LOAD = 4;

const categories: {id: Category, name: {[key in 'en' | 'ur']: string}}[] = [
    { id: 'Headstones', name: { en: 'Headstones', ur: 'قبر کے کتبے' } },
    { id: 'Graves', name: { en: 'Graves', ur: 'قبریں' } },
    { id: 'Government Works', name: { en: 'Government', ur: 'سرکاری کام' } },
    { id: 'Charity Work', name: { en: 'Charity', ur: 'فلاحی کام' } },
    { id: 'Home Decors', name: { en: 'Home Decors', ur: 'گھریلو سجاوٹ' } },
    { id: 'Inlays & Patterns', name: { en: 'Inlays & Patterns', ur: 'جڑاؤ اور ڈیزائن' } },
]

export function GalleryComponent() {
  const { language } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  const allImages = useMemo(() => galleryImages, []);

  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(
    categories.reduce((acc, cat) => ({...acc, [cat.id]: INITIAL_VISIBLE_IMAGES}), {})
  );
  const [activeFilter, setActiveFilter] = useState<Category | 'All'>('All');

  const imagesByCategory = useMemo(() => {
    return categories.reduce((acc, category) => {
        acc[category.id] = allImages.filter(img => img.category === category.id);
        return acc;
    }, {} as Record<Category, typeof allImages>);
  }, [allImages]);

  const filteredImagesForLightbox = useMemo(() => {
    if (activeFilter === 'All') return allImages;
    return allImages.filter(img => img.category === activeFilter);
  }, [activeFilter, allImages]);
  
  const showMoreImages = (category: Category) => {
    setVisibleCounts(prev => ({
        ...prev,
        [category]: Math.min(prev[category] + IMAGES_TO_LOAD, imagesByCategory[category].length)
    }));
  };

  const openLightbox = (imageSrc: string, imageCategory: Category) => {
    const imagesToSearch = filteredImagesForLightbox;
    const index = imagesToSearch.findIndex(img => img.src === imageSrc && img.category === imageCategory);
    if(index !== -1) setSelectedImageIndex(index);
  };
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + filteredImagesForLightbox.length) % filteredImagesForLightbox.length
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImagesForLightbox.length);
    }
  };
  
  const selectedImage = selectedImageIndex !== null ? filteredImagesForLightbox[selectedImageIndex] : null;

  const renderCategorySection = (category: {id: Category, name: {[key in 'en' | 'ur']: string}}, isFiltered: boolean) => {
    const categoryImages = imagesByCategory[category.id];
    if(categoryImages.length === 0) return null;

    const visibleCount = isFiltered ? (visibleCounts[category.id] || INITIAL_VISIBLE_IMAGES) : visibleCounts[category.id];
    const visibleImages = categoryImages.slice(0, visibleCount);
    const hasMore = visibleImages.length < categoryImages.length;

    return (
      <section key={category.id} id={category.id}>
        <h2 className="mb-8 text-center text-3xl font-bold">{category.name[language]}</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {visibleImages.map((image, index) => (
            <div
              key={`${image.src}-${index}`}
              className="group relative h-64 cursor-pointer overflow-hidden rounded-lg shadow-md"
              onClick={() => openLightbox(image.src, image.category)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                data-ai-hint={image.hint}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/40"></div>
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="mt-8 text-center">
            <Button onClick={() => showMoreImages(category.id)} size="lg">
              {language === 'en' ? 'View More' : 'مزید دیکھیں'}
            </Button>
          </div>
        )}
      </section>
    );
  };

  return (
    <>
        <div className="mb-12 flex flex-wrap justify-center gap-2">
             <Button
                variant={activeFilter === 'All' ? 'default' : 'outline'}
                onClick={() => setActiveFilter('All')}
                >
                {language === 'en' ? 'All' : 'سب'}
            </Button>
            {categories.map((cat) => (
            <Button
                key={cat.id}
                variant={activeFilter === cat.id ? 'default' : 'outline'}
                onClick={() => setActiveFilter(cat.id)}
            >
                {cat.name[language]}
            </Button>
            ))}
      </div>

      <div className="space-y-16">
        {activeFilter === 'All'
          ? categories.map(category => renderCategorySection(category, false))
          : categories
              .filter(c => c.id === activeFilter)
              .map(category => renderCategorySection(category, true))}
      </div>

      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-4xl p-0">
            <DialogHeader className="sr-only">
                <DialogTitle>{language === 'en' ? 'Enlarged Image' : 'بڑی تصویر'}</DialogTitle>
                <DialogDescription>{selectedImage?.alt}</DialogDescription>
            </DialogHeader>
          {selectedImage && (
            <div className="relative aspect-video">
                <Image
                    src={selectedImage.src}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                />
                <Button variant="ghost" size="icon" onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/75 hover:text-white h-10 w-10">
                    <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button variant="ghost" size="icon" onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/50 text-white hover:bg-black/75 hover:text-white h-10 w-10">
                    <ChevronRight className="h-6 w-6" />
                </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
