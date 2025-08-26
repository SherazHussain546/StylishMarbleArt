
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { WatermarkLogo } from './watermark-logo';
import { content } from '@/lib/content';

type Category = 'Graves' | 'Headstones' | 'Government Works' | 'Charity Work' | 'Home Decors' | 'Christian Memorials' | 'Hindu Memorials';

interface GalleryImage {
  src: string;
  alt: string;
  category: Category;
  hint: string;
}

const allImages: GalleryImage[] = content.servicesPage.serviceList.flatMap(service => 
    service.images.map(img => ({
        ...img,
        category: ((): Category => {
            if (service.name.en.includes('Grave')) return 'Graves';
            if (service.name.en.includes('Kitchen')) return 'Home Decors';
            if (service.name.en.includes('Engraving')) return 'Charity Work'; // Default
            return 'Graves';
        })(),
    }))
);


// Manually create image list from content.ts for now
const serviceImages = content.servicesPage.serviceList;
const staticImages: GalleryImage[] = [
    ...serviceImages[0].images.map(i => ({...i, category: 'Graves' as Category})),
    ...serviceImages[0].images.slice(0,5).map(i => ({...i, category: 'Headstones' as Category})),
    ...serviceImages[2].images.slice(3,6).map(i => ({...i, category: 'Government Works' as Category})),
    ...serviceImages[2].images.slice(0,3).map(i => ({...i, category: 'Charity Work' as Category})),
    ...serviceImages[1].images.map(i => ({...i, category: 'Home Decors' as Category})),
    ...serviceImages[2].images.slice(1,3).map(i => ({...i, category: 'Christian Memorials' as Category})),
    ...serviceImages[2].images.slice(6,8).map(i => ({...i, category: 'Hindu Memorials' as Category})),
];


const categories: {id: Category, name: {[key in 'en' | 'ur']: string}}[] = [
    { id: 'Graves', name: { en: 'Graves', ur: 'قبریں' } },
    { id: 'Headstones', name: { en: 'Headstones', ur: 'قبر کے کتبے' } },
    { id: 'Charity Work', name: { en: 'Charity', ur: 'فلاحی کام' } },
    { id: 'Home Decors', name: { en: 'Home Decors', ur: 'گھریلو سجاوٹ' } },
    { id: 'Government Works', name: { en: 'Government', ur: 'سرکاری کام' } },
    { id: 'Christian Memorials', name: { en: 'Christian', ur: 'عیسائی یادگاریں' } },
    { id: 'Hindu Memorials', name: { en: 'Hindu', ur: 'ہندو یادگاریں' } },
]

const INITIAL_VISIBLE_IMAGES = 6;
const IMAGES_TO_LOAD = 6;

export function GalleryComponent() {
  const { language } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  
  const [visibleCounts, setVisibleCounts] = useState<Record<string, number>>(
    categories.reduce((acc, cat) => ({...acc, [cat.id]: INITIAL_VISIBLE_IMAGES}), {})
  );
  const [activeFilter, setActiveFilter] = useState<Category | 'All'>('All');

  const imagesByCategory = useMemo(() => {
    return categories.reduce((acc, category) => {
        acc[category.id] = staticImages.filter(img => img.category === category.id);
        return acc;
    }, {} as Record<Category, typeof staticImages>);
  }, []);

  const filteredImagesForLightbox = useMemo(() => {
    if (activeFilter === 'All') return staticImages;
    return staticImages.filter(img => img.category === activeFilter);
  }, [activeFilter]);
  
  const showMoreImages = (category: Category) => {
    setVisibleCounts(prev => ({
        ...prev,
        [category]: Math.min(prev[category] + IMAGES_TO_LOAD, imagesByCategory[category].length)
    }));
  };

  const openLightbox = (imageSrc: string) => {
    const imagesToSearch = filteredImagesForLightbox;
    const index = imagesToSearch.findIndex(img => img.src === imageSrc);
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
              onClick={() => openLightbox(image.src)}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/40"></div>
              <div className="absolute top-2 left-2 select-none text-xs font-bold text-white opacity-50 transition-opacity duration-300 group-hover:opacity-80">
                <WatermarkLogo />
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
        {categories.filter(c => imagesByCategory[c.id]?.length > 0).map((cat) => (
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
