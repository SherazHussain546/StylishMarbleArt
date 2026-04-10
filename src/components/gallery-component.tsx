
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { ChevronLeft, ChevronRight, Loader2, ImageIcon } from 'lucide-react';
import { WatermarkLogo } from './watermark-logo';
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
    if (!dbImages) return [];
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

  if (loading) {
    return (
      <div className="flex h-64 flex-col items-center justify-center text-muted-foreground bg-secondary/20 rounded-xl">
        <Loader2 className="h-8 w-8 animate-spin mb-4 text-primary" />
        <p className="font-medium animate-pulse">{language === 'en' ? 'Syncing with Workshop Gallery...' : 'گیلری سے مطابقت پذیر ہو رہا ہے...'}</p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-12 flex flex-wrap justify-center gap-2">
         <Button
            variant={activeFilter === 'All' ? 'default' : 'outline'}
            onClick={() => setActiveFilter('All')}
            className="rounded-full px-6"
            >
            {language === 'en' ? 'All Projects' : 'تمام منصوبے'}
        </Button>
        {categories.map((cat) => (
        <Button
            key={cat.id}
            variant={activeFilter === cat.id ? 'default' : 'outline'}
            onClick={() => setActiveFilter(cat.id)}
            className="rounded-full px-6"
        >
            {cat.name[language]}
        </Button>
        ))}
      </div>

      {filteredImages.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              className="group relative h-80 cursor-pointer overflow-hidden rounded-xl shadow-lg border-2 border-transparent hover:border-primary transition-all duration-300"
              onClick={() => setSelectedImageIndex(index)}
            >
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="absolute top-4 left-4 select-none drop-shadow-lg">
                <WatermarkLogo />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs font-bold uppercase tracking-widest bg-primary/80 inline-block px-2 py-0.5 rounded mb-1">{image.category}</p>
                  <p className="font-medium text-sm line-clamp-2">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground p-24 border-2 border-dashed rounded-2xl bg-secondary/10">
          <ImageIcon className="h-16 w-16 mb-4 opacity-20" />
          <h3 className="text-xl font-semibold">
            {language === 'en' ? 'No Work to Show Yet' : 'دکھانے کے لیے ابھی کوئی کام نہیں ہے'}
          </h3>
          <p className="mt-2 max-w-sm">
            {language === 'en' 
              ? 'Our craftsmen are currently working on new projects. Check back soon for updates!' 
              : 'ہمارے کاریگر اس وقت نئے منصوبوں پر کام کر رہے ہیں۔ اپ ڈیٹس کے لیے جلد ہی دوبارہ چیک کریں!'}
          </p>
        </div>
      )}

      <Dialog open={selectedImageIndex !== null} onOpenChange={() => setSelectedImageIndex(null)}>
        <DialogContent className="max-w-5xl p-0 overflow-hidden bg-black/95 border-none">
            <DialogHeader className="sr-only">
                <DialogTitle>{language === 'en' ? 'Enlarged Image' : 'بڑی تصویر'}</DialogTitle>
                <DialogDescription>{selectedImage?.alt}</DialogDescription>
            </DialogHeader>
          {selectedImage && (
            <div className="relative aspect-[4/3] w-full flex items-center justify-center">
                <Image
                    src={selectedImage.url}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                    sizes="100vw"
                    priority
                />
                
                {/* Navigation Controls */}
                <div className="absolute inset-0 flex items-center justify-between p-4 pointer-events-none">
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handlePrev} 
                        className="pointer-events-auto rounded-full bg-white/10 text-white hover:bg-white/20 h-12 w-12"
                    >
                        <ChevronLeft className="h-8 w-8" />
                    </Button>
                    <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={handleNext} 
                        className="pointer-events-auto rounded-full bg-white/10 text-white hover:bg-white/20 h-12 w-12"
                    >
                        <ChevronRight className="h-8 w-8" />
                    </Button>
                </div>

                {/* Info Bar */}
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-6 text-white backdrop-blur-sm">
                    <div className="flex justify-between items-center max-w-4xl mx-auto">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-1 block">
                                {selectedImage.category}
                            </span>
                            <h3 className="text-lg font-medium">{selectedImage.alt}</h3>
                        </div>
                        <div className="text-xs opacity-50 font-mono">
                            {selectedImageIndex! + 1} / {filteredImages.length}
                        </div>
                    </div>
                </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
