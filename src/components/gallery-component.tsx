'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const galleryImages = [
  { src: 'https://placehold.co/600x400.png', alt: 'Elegant marble headstone', hint: 'marble headstone' },
  { src: 'https://placehold.co/600x400.png', alt: 'Granite family monument', hint: 'granite monument' },
  { src: 'https://placehold.co/600x400.png', alt: 'Detailed engraving on a memorial', hint: 'memorial engraving' },
  { src: 'https://placehold.co/600x400.png', alt: 'Bronze plaque on stone', hint: 'bronze plaque' },
  { src: 'https://placehold.co/600x400.png', alt: 'Serene cemetery setting with a custom headstone', hint: 'cemetery headstone' },
  { src: 'https://placehold.co/600x400.png', alt: 'Restored vintage gravestone', hint: 'restored gravestone' },
  { src: 'https://placehold.co/600x400.png', alt: 'A child memorial stone with carving', hint: 'child memorial' },
  { src: 'https://placehold.co/600x400.png', alt: 'Double headstone for a couple', hint: 'double headstone' },
];

export function GalleryComponent() {
  const [selectedImage, setSelectedImage] = useState<{src: string, alt: string} | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {galleryImages.map((image, index) => (
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
