
'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';

export default function ServicesPageClient() {
  const { language } = useLanguage();
  const pageContent = content.servicesPage;

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{pageContent.title[language]}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{pageContent.description[language]}</p>
        </div>
        <div className="mt-16 mx-auto max-w-5xl space-y-16">
          {pageContent.serviceList.map((service, index) => (
            <div key={index}>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">{service.name[language]}</h2>
                <p className="mt-4 text-lg text-muted-foreground">{service.description[language]}</p>
              </div>

              {/* Desktop Gallery Grid */}
              <div className="mt-8 hidden grid-cols-2 gap-4 md:grid lg:grid-cols-3">
                {service.images.map((img, imgIndex) => (
                  <div key={imgIndex} className="relative h-64 w-full overflow-hidden rounded-lg shadow-md">
                    <Image
                      src={img.src}
                      alt={img.alt}
                      data-ai-hint={img.hint}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />
                  </div>
                ))}
              </div>

              {/* Mobile Carousel */}
              <div className="mt-8 md:hidden">
                <Carousel className="w-full max-w-xs mx-auto">
                  <CarouselContent>
                    {service.images.map((img, imgIndex) => (
                      <CarouselItem key={imgIndex}>
                        <div className="p-1">
                          <Card>
                            <CardContent className="relative flex aspect-square items-center justify-center p-0">
                               <Image
                                src={img.src}
                                alt={img.alt}
                                data-ai-hint={img.hint}
                                fill
                                className="object-cover rounded-lg"
                                sizes="90vw"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>

              <div className="mt-8 text-center">
                <Button asChild size="lg">
                  <Link href="/contact">{language === 'en' ? 'Inquire Now' : 'ابھی پوچھیں'}</Link>
                </Button>
              </div>

              {index < pageContent.serviceList.length - 1 && <Separator className="mt-16" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
