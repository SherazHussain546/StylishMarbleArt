
'use client';

import { useState, useMemo, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { WatermarkLogo } from './watermark-logo';
import { getImages as fetchImages, type GalleryImage } from '@/app/admin/dashboard/gallery/actions';
import { Skeleton } from './ui/skeleton';

type Category = 'Graves' | 'Headstones' | 'Government Works' | 'Charity Work' | 'Home Decors' | 'Christian Memorials' | 'Hindu Memorials';

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
  const [allImages, setAllImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadImages = async () => {
        setIsLoading(true);
        try {
            const images = await fetchImages();
            setAllImages(images);
        } catch (error) {
            console.error("Failed to load gallery images:", error);
        } finally {
            setIsLoading(false);
        }
    };
    loadImages();
  }, []);

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

  const openLightbox = (imageId: string) => {
    const imagesToSearch = filteredImagesForLightbox;
    const index = imagesToSearch.findIndex(img => img.id === imageId);
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
              key={image.id}
              className="group relative h-64 cursor-pointer overflow-hidden rounded-lg shadow-md"
              onClick={() => openLightbox(image.id)}
            >
              <Image
                src={image.url}
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
  
  if (isLoading) {
    return (
        <div className="space-y-16">
            {categories.slice(0,2).map(category => (
                 <section key={category.id}>
                    <h2 className="mb-8 text-center text-3xl font-bold"><Skeleton className="h-8 w-48 mx-auto" /></h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className="h-64 rounded-lg" />)}
                    </div>
                 </section>
            ))}
        </div>
    );
  }

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
                    src={selectedImage.url}
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
