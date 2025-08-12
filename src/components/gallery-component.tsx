'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const galleryImages = [
  { src: '/gallery/1.png', alt: 'Elegant marble headstone', hint: 'marble headstone' },
  { src: '/gallery/2.png', alt: 'Granite family monument', hint: 'granite monument' },
  { src: '/gallery/3.png', alt: 'Detailed engraving on a memorial', hint: 'memorial engraving' },
  { src: '/gallery/4.png', alt: 'Bronze plaque on stone', hint: 'bronze plaque' },
  { src: '/gallery/5.png', alt: 'Serene cemetery setting with a custom headstone', hint: 'cemetery headstone' },
  { src: '/gallery/6.png', alt: 'Restored vintage gravestone', hint: 'restored gravestone' },
  { src: '/gallery/7.png', alt: 'A child memorial stone with carving', hint: 'child memorial' },
  { src: '/gallery/8.png', alt: 'Double headstone for a couple', hint: 'double headstone' },
  { src: '/gallery/9.png', alt: 'Modern kitchen with marble countertop', hint: 'kitchen countertop' },
  { src: '/gallery/10.png', alt: 'Marble flooring in a house entrance', hint: 'marble flooring' },
  { src: '/gallery/11.png', alt: 'Custom engraved marble sign for a government building', hint: 'engraved sign' },
  { src: '/gallery/12.png', alt: 'Polished black granite tombstone', hint: 'granite tombstone' },
  { src: '/gallery/13.png', alt: 'White marble statue detail for a charity project', hint: 'marble statue' },
  { src: '/gallery/14.png', alt: 'Artificial marble bathroom vanity', hint: 'bathroom vanity' },
  { src: '/gallery/15.png', alt: 'Close-up of marble texture for a home project', hint: 'marble texture' },
  { src: '/gallery/16.png', alt: 'Large memorial with multiple engravings for a community park', hint: 'large memorial' },
];

const INITIAL_VISIBLE_IMAGES = 8;
const IMAGES_TO_LOAD = 4;

export function GalleryComponent() {
  const { language } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [visibleImagesCount, setVisibleImagesCount] = useState(INITIAL_VISIBLE_IMAGES);

  const visibleImages = galleryImages.slice(0, visibleImagesCount);

  const showMoreImages = () => {
    setVisibleImagesCount(prevCount => Math.min(prevCount + IMAGES_TO_LOAD, galleryImages.length));
  };
  
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + galleryImages.length) % galleryImages.length
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % galleryImages.length);
    }
  };
  
  const hasMoreImages = visibleImages.length < galleryImages.length;
  const selectedImage = selectedImageIndex !== null ? galleryImages[selectedImageIndex] : null;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {visibleImages.map((image, index) => (
          <div
            key={index}
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
