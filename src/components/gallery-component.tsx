'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { ChevronLeft, ChevronRight, Phone, Mail, Loader2, ImageIcon } from 'lucide-react';
import { WatermarkLogo } from './watermark-logo';
import { content } from '@/lib/content';
import { WhatsappFooterIcon } from './icons/whatsapp-footer-icon';
import { useFirestore, useCollection } from '@/firebase';
import { collection, query, orderBy } from 'firebase/firestore';

type Category = 'Graves' | 'Headstones' | 'Government Works' | 'Home Decors' | 'Christian Memorials' | 'Hindu Memorials';

const categories: {id: Category, name: {[key in 'en' | 'ur']: string}}[] = [
    { id: 'Graves', name: { en: 'Graves', ur: 'قبریں' } },
    { id: 'Headstones', name: { en: 'Headstones', ur: 'قبر کے کتبے' } },
    { id: 'Home Decors', name: { en: 'Home Decors', ur: 'گھریلو سجاوٹ' } },
    { id: 'Government Works', name: { en: 'Government', ur: 'سرکاری کام' } },
    { id: 'Christian Memorials', name: { en: 'Christian', ur: 'عیسائی یادگاریں' } },
    { id: 'Hindu Memorials', name: { en: 'Hindu', ur: 'ہندو یادگاریں' } },
]

export function GalleryComponent() {
  const { language } = useLanguage();
  const db = useFirestore();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<Category | 'All'>('All');

  const galleryQuery = useMemo(() => {
    if (!db) return null;
    return query(collection(db, 'gallery'), orderBy('createdAt', 'desc'));
  }, [db]);

  const { data: dbImages, loading } = useCollection<any>(galleryQuery);

  const filteredImages = useMemo(() => {
    if (activeFilter === 'All') return dbImages;
    return dbImages.filter((img: any) => img.category === activeFilter);
  }, [dbImages, activeFilter]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        (selectedImageIndex - 1 + filteredImages.length) % filteredImages.length
      );
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % filteredImages.length);
    }
  };
  
  const selectedImage = selectedImageIndex !== null ? filteredImages[selectedImageIndex] : null;

  const phone = content.contactPage.contactInfo.phone.en.replace(/\s/g, '');
  const whatsappNumber = phone.replace(/\D/g, '');
  const email = content.contactPage.contactInfo.email.en;

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin mb-4" />
        <p>{language === 'en' ? 'Loading Gallery...' : 'گیلری لوڈ ہو رہی ہے...'}</p>
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

      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative h-64 cursor-pointer overflow-hidden rounded-lg shadow-md"
              onClick={() => setSelectedImageIndex(index)}
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
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-12 border-2 border-dashed rounded-lg">
          <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
          <h3 className="text-xl font-semibold">
            {language === 'en' ? 'No Images Found' : 'کوئی تصویر نہیں ملی'}
          </h3>
          <p className="mt-2">
            {language === 'en' 
              ? 'Try selecting a different category or check back later.' 
              : 'براہ کرم کوئی دوسرا زمرہ منتخب کریں یا بعد میں دوبارہ چیک کریں۔'}
          </p>
        </div>
      )}

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
