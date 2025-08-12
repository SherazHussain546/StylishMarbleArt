'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

type Category = 'All' | 'Headstones' | 'Graves' | 'Government Works' | 'Charity Work' | 'Home Decors';

const galleryImages = [
  { src: '/gallery/1.png', alt: 'Elegant marble headstone', hint: 'marble headstone', category: 'Headstones' },
  { src: '/gallery/2.png', alt: 'Granite family monument', hint: 'granite monument', category: 'Headstones' },
  { src: '/gallery/3.png', alt: 'Detailed engraving on a memorial', hint: 'memorial engraving', category: 'Headstones' },
  { src: '/gallery/4.png', alt: 'Bronze plaque on stone', hint: 'bronze plaque', category: 'Government Works' },
  { src: '/gallery/5.png', alt: 'Serene cemetery setting with a custom headstone', hint: 'cemetery headstone', category: 'Graves' },
  { src: '/gallery/6.png', alt: 'Restored vintage gravestone', hint: 'restored gravestone', category: 'Charity Work' },
  { src: '/gallery/7.png', alt: 'A child memorial stone with carving', hint: 'child memorial', category: 'Headstones' },
  { src: '/gallery/8.png', alt: 'Double headstone for a couple', hint: 'double headstone', category: 'Headstones' },
  { src: '/gallery/9.png', alt: 'Modern kitchen with marble countertop', hint: 'kitchen countertop', category: 'Home Decors' },
  { src: '/gallery/10.png', alt: 'Marble flooring in a house entrance', hint: 'marble flooring', category: 'Home Decors' },
  { src: '/gallery/11.png', alt: 'Custom engraved marble sign for a government building', hint: 'engraved sign', category: 'Government Works' },
  { src: '/gallery/12.png', alt: 'Polished black granite tombstone', hint: 'granite tombstone', category: 'Graves' },
  { src: '/gallery/13.png', alt: 'White marble statue detail for a charity project', hint: 'marble statue', category: 'Charity Work' },
  { src: '/gallery/14.png', alt: 'Artificial marble bathroom vanity', hint: 'bathroom vanity', category: 'Home Decors' },
  { src: '/gallery/15.png', alt: 'Close-up of marble texture for a home project', hint: 'marble texture', category: 'Home Decors' },
  { src: '/gallery/16.png', alt: 'Large memorial with multiple engravings for a community park', hint: 'large memorial', category: 'Government Works' },
];

const categories: { id: Category; name: { en: string; ur: string } }[] = [
  { id: 'All', name: { en: 'All', ur: 'سب' } },
  { id: 'Headstones', name: { en: 'Headstones', ur: 'قبر کے پتھر' } },
  { id: 'Graves', name: { en: 'Graves', ur: 'قبریں' } },
  { id: 'Government Works', name: { en: 'Government Works', ur: 'سرکاری کام' } },
  { id: 'Charity Work', name: { en: 'Charity Work', ur: 'فلاحی کام' } },
  { id: 'Home Decors', name: { en: 'Home Decors', ur: 'گھریلو سجاوٹ' } },
];

const INITIAL_VISIBLE_IMAGES = 8;
const IMAGES_TO_LOAD = 4;

export function GalleryComponent() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [visibleImagesCount, setVisibleImagesCount] = useState(INITIAL_VISIBLE_IMAGES);

  const filteredImages = selectedCategory === 'All'
    ? galleryImages
    : galleryImages.filter(image => image.category === selectedCategory);
  
  const visibleImages = filteredImages.slice(0, visibleImagesCount);

  const showMoreImages = () => {
    setVisibleImagesCount(prevCount => Math.min(prevCount + IMAGES_TO_LOAD, filteredImages.length));
  };
  
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category as Category);
    setVisibleImagesCount(INITIAL_VISIBLE_IMAGES); // Reset visible count on category change
    setSelectedImageIndex(null); // Close any open dialog
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      const currentImageSrc = visibleImages[selectedImageIndex].src;
      const originalIndex = filteredImages.findIndex(img => img.src === currentImageSrc);
      const newIndexInFiltered = (originalIndex - 1 + filteredImages.length) % filteredImages.length;
      
      if(newIndexInFiltered >= visibleImages.length){
        setVisibleImagesCount(visibleImages.length + 1);
      }
      setSelectedImageIndex(newIndexInFiltered);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      const currentImageSrc = visibleImages[selectedImageIndex].src;
      const originalIndex = filteredImages.findIndex(img => img.src === currentImageSrc);
      const newIndexInFiltered = (originalIndex + 1) % filteredImages.length;

      if(newIndexInFiltered >= visibleImages.length){
        setVisibleImagesCount(visibleImages.length + 1);
      }
      setSelectedImageIndex(newIndexInFiltered);
    }
  };
  
  const hasMoreImages = visibleImages.length < filteredImages.length;
  const selectedImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  return (
    <>
      <div className="mb-8 flex justify-center">
        <Tabs value={selectedCategory} onValueChange={handleCategoryChange}>
          <TabsList className="grid h-auto w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-6">
            {categories.map(cat => (
              <TabsTrigger key={cat.id} value={cat.id}>
                {cat.name[language]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleImages.map((image, index) => (
          <div
            key={`${image.src}-${index}`}
            className="group relative h-64 cursor-pointer overflow-hidden rounded-lg shadow-md"
            onClick={() => setSelectedImageIndex(index)}
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
      
      {filteredImages.length === 0 && (
        <div className="text-center py-16 text-muted-foreground">
            {language === 'en' ? 'No images in this category yet.' : 'اس زمرے میں ابھی تک کوئی تصاویر نہیں ہیں۔'}
        </div>
      )}

      {hasMoreImages && (
        <div className="mt-8 text-center">
          <Button onClick={showMoreImages} size="lg">
            {language === 'en' ? 'View More' : 'مزید دیکھیں'}
          </Button>
        </div>
      )}

      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-4xl p-0">
            <DialogHeader className="sr-only">
                <DialogTitle>Enlarged Image</DialogTitle>
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
