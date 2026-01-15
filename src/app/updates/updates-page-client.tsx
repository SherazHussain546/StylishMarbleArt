
'use client';

import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { FacebookIcon } from '@/components/icons/facebook-icon';

export default function UpdatesPageClient() {
  const { language } = useLanguage();
  const pageContent = content.updatesPage;

  return (
    <div className="bg-secondary py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{pageContent.title[language]}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{pageContent.description[language]}</p>
        </div>

        <div className="mt-16">
           <h2 className="text-3xl font-bold tracking-tight text-center mb-12">{pageContent.feedTitle[language]}</h2>
          <Carousel
            className="w-full max-w-5xl mx-auto"
            opts={{
              align: 'start',
              loop: true,
            }}
          >
            <CarouselContent className="-ml-4">
              {pageContent.items.map((item, index) => (
                <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-2/3">
                  <div className="p-1 h-full">
                    {item.type === 'custom' ? (
                      <Card className="h-full overflow-hidden shadow-lg flex flex-col">
                        <div className="relative h-64 w-full">
                          <Image
                            src={item.image}
                            alt={item.alt[language]}
                            data-ai-hint={item.hint}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <CardHeader>
                          <CardTitle>{item.title[language]}</CardTitle>
                          <CardDescription>{item.date[language]}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p className="text-muted-foreground">{item.content[language]}</p>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="h-full overflow-hidden shadow-lg flex flex-col">
                        <CardHeader>
                          <div className="flex items-center gap-2">
                             <FacebookIcon className="h-8 w-8 text-blue-600" />
                             <CardTitle>{item.title[language]}</CardTitle>
                          </div>
                          <CardDescription>{language === 'en' ? 'Live from our Facebook page' : 'ہمارے فیس بک پیج سے براہ راست'}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                          <div className="h-full w-full bg-gray-100 rounded-lg overflow-hidden">
                            <iframe
                              src={item.url}
                              width="100%"
                              height="500"
                              style={{ border: 'none', overflow: 'hidden' }}
                              scrolling="no"
                              frameBorder="0"
                              allowFullScreen={true}
                              allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                            ></iframe>
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex -left-12" />
            <CarouselNext className="hidden sm:flex -right-12" />
          </Carousel>
           <p className="text-center text-sm text-muted-foreground mt-8 sm:hidden">
              {language === 'en' ? 'Swipe to see more posts' : 'مزید پوسٹس دیکھنے کے لیے سوائپ کریں'}
            </p>
        </div>
      </div>
    </div>
  );
}

    