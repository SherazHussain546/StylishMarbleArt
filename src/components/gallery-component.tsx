'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';

const galleryImages = [
  { src: '/gallery/image1.jpg', alt: 'Elegant marble headstone', hint: 'marble headstone' },
  { src: '/gallery/image2.jpg', alt: 'Granite family monument', hint: 'granite monument' },
  { src: '/gallery/image3.jpg', alt: 'Detailed engraving on a memorial', hint: 'memorial engraving' },
  { src: '/gallery/image4.jpg', alt: 'Bronze plaque on stone', hint: 'bronze plaque' },
  { src: '/gallery/image5.jpg', alt: 'Serene cemetery setting with a custom headstone', hint: 'cemetery headstone' },
  { src: '/gallery/image6.jpg', alt: 'Restored vintage gravestone', hint: 'restored gravestone' },
  { src: '/gallery/image7.jpg', alt: 'A child memorial stone with carving', hint: 'child memorial' },
  { src: '/gallery/image8.jpg', alt: 'Double headstone for a couple', hint: 'double headstone' },
  { src: '/gallery/image9.jpg', alt: 'Modern kitchen with marble countertop', hint: 'kitchen countertop' },
  { src: '/gallery/image10.jpg', alt: 'Marble flooring in a house entrance', hint: 'marble flooring' },
  { src: '/gallery/image11.jpg', alt: 'Custom engraved marble sign', hint: 'engraved sign' },
  { src: '/gallery/image12.jpg', alt: 'Polished black granite tombstone', hint: 'granite tombstone' },
  { src: '/gallery/image13.jpg', alt: 'White marble statue detail', hint: 'marble statue' },
  { src: '/gallery/image14.jpg', alt: 'Artificial marble bathroom vanity', hint: 'bathroom vanity' },
  { src: '/gallery/image15.jpg', alt: 'Close-up of marble texture', hint: 'marble texture' },
  { src: '/gallery/image16.jpg', alt: 'Large memorial with multiple engravings', hint: 'large memorial' },
];

const INITIAL_VISIBLE_IMAGES = 8;
const IMAGES_TO_LOAD = 4;

export function GalleryComponent() {
  const { language } = useLanguage();
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);
  const [visibleImagesCount, setVisibleImagesCount] = useState(INITIAL_VISIBLE_IMAGES);
  
  const showMoreImages = () => {
    setVisibleImagesCount(prevCount => Math.min(prevCount + IMAGES_TO_LOAD, galleryImages.length));
  };
  
  const hasMoreImages = visibleImagesCount < galleryImages.length;

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {galleryImages.slice(0, visibleImagesCount).map((image, index) => (
          <div
            key={index}
            className="group relative h-64 cursor-pointer overflow-hidden rounded-lg shadow-md"
            onClick={() => setSelectedImage(image)}
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

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
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
                />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
