
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { content } from '@/lib/content';

type Category = 'Graves' | 'Headstones' | 'Government Works' | 'Charity Work' | 'Home Decors' | 'Christian Memorials' | 'Hindu Memorials' | 'Inlays & Patterns';

const galleryImages = [
  // Headstones
  { src: '/Gallery/Headstone/1.png', alt: 'Elegant marble headstone', hint: 'marble headstone', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/2.png', alt: 'Granite family monument', hint: 'granite monument', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/3.png', alt: 'Double headstone for a couple', hint: 'double headstone', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/4.png', alt: 'Polished black granite tombstone', hint: 'granite tombstone', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/5.png', alt: 'Detailed engraving on a memorial', hint: 'memorial engraving', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/6.png', alt: 'Bronze plaque on stone', hint: 'bronze plaque', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/7.png', alt: 'Elegant marble headstone', hint: 'marble headstone', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/8.png', alt: 'Granite family monument', hint: 'granite monument', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/9.png', alt: 'Double headstone for a couple', hint: 'double headstone', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/10.png', alt: 'Polished black granite tombstone', hint: 'granite tombstone', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/11.png', alt: 'Detailed engraving on a memorial', hint: 'memorial engraving', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/12.png', alt: 'Bronze plaque on stone', hint: 'bronze plaque', category: 'Headstones' as Category },{ src: '/Gallery/Headstone/1.png', alt: 'Elegant marble headstone', hint: 'marble headstone', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/13.png', alt: 'Granite family monument', hint: 'granite monument', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/14.png', alt: 'Double headstone for a couple', hint: 'double headstone', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/15.png', alt: 'Polished black granite tombstone', hint: 'granite tombstone', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/16.png', alt: 'Detailed engraving on a memorial', hint: 'memorial engraving', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/17.png', alt: 'Bronze plaque on stone', hint: 'bronze plaque', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/18.png', alt: 'Bronze plaque on stone', hint: 'bronze plaque', category: 'Headstones' as Category },
  { src: '/Gallery/Headstone/19.png', alt: 'Bronze plaque on stone', hint: 'bronze plaque', category: 'Headstones' as Category },

  // Graves
  { src: '/Gallery/Grave/1.png', alt: 'Serene cemetery setting with a custom headstone', hint: 'cemetery headstone', category: 'Graves' as Category },
  { src: '/Gallery/Grave/2.png', alt: 'Restored vintage gravestone', hint: 'restored gravestone', category: 'Graves' as Category },
  { src: '/Gallery/Grave/3.png', alt: 'A child memorial stone with carving', hint: 'child memorial', category: 'Graves' as Category },
  { src: '/Gallery/Grave/4.png', alt: 'Serene cemetery setting with a custom headstone', hint: 'cemetery headstone', category: 'Graves' as Category },
  { src: '/Gallery/Grave/5.png', alt: 'Restored vintage gravestone', hint: 'restored gravestone', category: 'Graves' as Category },
  { src: '/Gallery/Grave/6.png', alt: 'A child memorial stone with carving', hint: 'child memorial', category: 'Graves' as Category },
  { src: '/Gallery/Grave/7.png', alt: 'Serene cemetery setting with a custom headstone', hint: 'cemetery headstone', category: 'Graves' as Category },
  { src: '/Gallery/Grave/8.png', alt: 'Restored vintage gravestone', hint: 'restored gravestone', category: 'Graves' as Category },
  { src: '/Gallery/Grave/9.png', alt: 'A child memorial stone with carving', hint: 'child memorial', category: 'Graves' as Category },
  { src: '/Gallery/Grave/10.png', alt: 'Serene cemetery setting with a custom headstone', hint: 'cemetery headstone', category: 'Graves' as Category },
  { src: '/Gallery/Grave/11.png', alt: 'Restored vintage gravestone', hint: 'restored gravestone', category: 'Graves' as Category },
  { src: '/Gallery/Grave/12.png', alt: 'A child memorial stone with carving', hint: 'child memorial', category: 'Graves' as Category },
  { src: '/Gallery/Grave/13.png', alt: 'Serene cemetery setting with a custom headstone', hint: 'cemetery headstone', category: 'Graves' as Category },
  { src: '/Gallery/Grave/14.png', alt: 'Restored vintage gravestone', hint: 'restored gravestone', category: 'Graves' as Category },
  { src: '/Gallery/Grave/15.png', alt: 'A child memorial stone with carving', hint: 'child memorial', category: 'Graves' as Category },

  // Government Works
  { src: '/Gallery/Government/1.png', alt: 'Custom engraved marble sign for a government building', hint: 'engraved sign', category: 'Government Works' as Category },
  { src: '/Gallery/Government/2.png', alt: 'Custom engraved marble sign for a government building', hint: 'engraved sign', category: 'Government Works' as Category },
  { src: '/Gallery/Government/3.png', alt: 'Custom engraved marble sign for a government building', hint: 'engraved sign', category: 'Government Works' as Category },
  { src: '/Gallery/Government/4.png', alt: 'Custom engraved marble sign for a government building', hint: 'engraved sign', category: 'Government Works' as Category },
  { src: '/Gallery/Government/5.png', alt: 'Custom engraved marble sign for a government building', hint: 'engraved sign', category: 'Government Works' as Category },
  
  // Charity Work
  { src: '/Gallery/Charity/1.png', alt: 'White marble statue detail for a charity project', hint: 'marble statue', category: 'Charity Work' as Category },
  { src: '/Gallery/Charity/2.png', alt: 'Large memorial with multiple engravings for a community park', hint: 'large memorial', category: 'Charity Work' as Category },
  { src: 'https://placehold.co/600x401.png', alt: 'Placeholder charity image', hint: 'charity work', category: 'Charity Work' as Category },
  { src: 'https://placehold.co/600x402.png', alt: 'Placeholder charity image 2', hint: 'charity work', category: 'Charity Work' as Category },

  // Home Decors
  { src: '/Gallery/HomeDecor/1.png', alt: 'Modern kitchen with marble countertop', hint: 'kitchen countertop', category: 'Home Decors' as Category },
  { src: '/Gallery/HomeDecor/2.png', alt: 'Marble flooring in a house entrance', hint: 'marble flooring', category: 'Home Decors' as Category },
  { src: '/Gallery/HomeDecor/3.png', alt: 'Artificial marble bathroom vanity', hint: 'bathroom vanity', category: 'Home Decors' as Category },
  
  // Inlays & Patterns
  { src: 'https://placehold.co/600x400.png', alt: 'Geometric marble floor inlay', hint: 'marble floor inlay', category: 'Inlays & Patterns' as Category },
  { src: 'https://placehold.co/600x401.png', alt: 'Floral marble pattern on a wall', hint: 'floral marble pattern', category: 'Inlays & Patterns' as Category },
  { src: 'https://placehold.co/600x402.png', alt: 'Placeholder inlay', hint: 'inlay pattern', category: 'Inlays & Patterns' as Category },
  { src: 'https://placehold.co/600x403.png', alt: 'Placeholder pattern', hint: 'marble pattern', category: 'Inlays & Patterns' as Category },
  { src: 'https://placehold.co/600x404.png', alt: 'Placeholder inlay 2', hint: 'inlay pattern', category: 'Inlays & Patterns' as Category },

  // Christian Memorials
  { src: '/Gallery/Christin/1.png', alt: 'Christian cross memorial', hint: 'christian memorial', category: 'Christian Memorials' as Category },
  { src: '/Gallery/Christin/2.png', alt: 'Angel statue on a headstone', hint: 'angel statue', category: 'Christian Memorials' as Category },
  { src: 'https://placehold.co/600x402.png', alt: 'Marble grave marker with bible verse', hint: 'bible verse', category: 'Christian Memorials' as Category },
  { src: 'https://placehold.co/600x403.png', alt: 'Simple and elegant cross headstone', hint: 'cross headstone', category: 'Christian Memorials' as Category },
  { src: 'https://placehold.co/600x404.png', alt: 'Christian family grave plot', hint: 'family grave', category: 'Christian Memorials' as Category },

  // Hindu Memorials
  { src: '/Gallery/Hindu/1.png', alt: 'Hindu memorial stone with Om symbol', hint: 'om symbol', category: 'Hindu Memorials' as Category },
  { src: 'https://placehold.co/600x401.png', alt: 'Placeholder hindu memorial', hint: 'hindu memorial', category: 'Hindu Memorials' as Category },
  { src: 'https://placehold.co/600x402.png', alt: 'Placeholder hindu memorial 2', hint: 'hindu memorial', category: 'Hindu Memorials' as Category },
  { src: 'https://placehold.co/600x403.png', alt: 'Placeholder hindu memorial 3', hint: 'hindu memorial', category: 'Hindu Memorials' as Category },
  ];

const INITIAL_VISIBLE_IMAGES = 6;
const IMAGES_TO_LOAD = 6;

const categories: {id: Category, name: {[key in 'en' | 'ur']: string}}[] = [
    { id: 'Graves', name: { en: 'Graves', ur: 'قبریں' } },
    { id: 'Headstones', name: { en: 'Headstones', ur: 'قبر کے کتبے' } },
    { id: 'Charity Work', name: { en: 'Charity', ur: 'فلاحی کام' } },
    { id: 'Home Decors', name: { en: 'Home Decors', ur: 'گھریلو سجاوٹ' } },
    { id: 'Government Works', name: { en: 'Government', ur: 'سرکاری کام' } },
    { id: 'Christian Memorials', name: { en: 'Christian', ur: 'عیسائی یادگاریں' } },
    { id: 'Hindu Memorials', name: { en: 'Hindu', ur: 'ہندو یادگاریں' } },
    { id: 'Inlays & Patterns', name: { en: 'Inlays & Patterns', ur: 'جڑاؤ اور ڈیزائن' } },
]

export function GalleryComponent() {
  const { language } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  const allImages = useMemo(() => galleryImages.map((img, index) => ({...img, uniqueId: `${img.src}-${index}`})), []);

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

  const openLightbox = (uniqueId: string) => {
    const imagesToSearch = filteredImagesForLightbox;
    const index = imagesToSearch.findIndex(img => img.uniqueId === uniqueId);
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
          {visibleImages.map((image) => (
            <div
              key={image.uniqueId}
              className="group relative h-64 cursor-pointer overflow-hidden rounded-lg shadow-md"
              onClick={() => openLightbox(image.uniqueId)}
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
              <div className="absolute bottom-2 right-2 select-none text-xs font-bold text-white opacity-50 transition-opacity duration-300 group-hover:opacity-80">
                STYLISH MARBLE ART
              </div>
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
