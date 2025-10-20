
'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from './ui/button';
import Link from 'next/link';

export function HomeFeed() {
  const { language } = useLanguage();
  const sectionContent = content.homeFeed;

  return (
    <section className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{sectionContent.title[language]}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{sectionContent.description[language]}</p>
        </div>
        <Carousel
          className="w-full max-w-6xl mx-auto"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {sectionContent.feedItems.map((item, index) => (
              <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                  <Card className="overflow-hidden group">
                    <CardContent className="relative flex aspect-square items-center justify-center p-0">
                      <Image
                        src={item.image}
                        alt={item.alt[language]}
                        data-ai-hint={item.hint}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                       <div className="absolute inset-0 bg-black/10 transition-opacity duration-300 group-hover:bg-black/30"></div>
                       <div className="absolute bottom-4 left-4">
                           <p className="text-white text-lg font-bold drop-shadow-md">{item.title[language]}</p>
                       </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
         <div className="mt-12 text-center">
            <Button asChild size="lg">
                <Link href="/gallery">{sectionContent.cta[language]}</Link>
            </Button>
        </div>
      </div>
    </section>
  );
}
