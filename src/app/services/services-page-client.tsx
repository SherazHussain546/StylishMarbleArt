
'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Mail, MessageCircle, Phone } from 'lucide-react';

export default function ServicesPageClient() {
  const { language } = useLanguage();
  const pageContent = content.servicesPage;
  const phone = content.contactPage.contactInfo.phone.en.replace(/\s/g, '');
  const whatsappNumber = phone.replace(/\D/g, '');
  const email = content.contactPage.contactInfo.email.en;

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

              <div className="mt-8">
                <Carousel 
                  className="w-full max-w-4xl mx-auto"
                  opts={{
                    align: "start",
                    loop: true,
                  }}
                >
                  <CarouselContent className="-ml-4">
                    {service.images.map((img, imgIndex) => (
                      <CarouselItem key={imgIndex} className="pl-4 md:basis-1/2 lg:basis-1/3">
                        <div className="p-1">
                          <Card className="overflow-hidden">
                            <CardContent className="relative flex aspect-video items-center justify-center p-0">
                               <Image
                                src={img.src}
                                alt={`${img.alt} - a ${service.name.en} example from Stylish Marble Art`}
                                data-ai-hint={img.hint}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            </CardContent>
                          </Card>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="hidden sm:flex" />
                  <CarouselNext className="hidden sm:flex" />
                </Carousel>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button asChild size="lg">
                    <a href={`tel:${phone}`}>
                        <Phone className="mr-2 h-5 w-5" />
                        {language === 'en' ? 'Call Us' : 'کال کریں'}
                    </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="bg-green-500 text-white hover:bg-green-600 hover:text-white border-green-500">
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        {language === 'en' ? 'WhatsApp' : 'واٹس ایپ'}
                    </a>
                </Button>
                 <Button asChild size="lg" variant="outline">
                    <a href={`mailto:${email}`}>
                        <Mail className="mr-2 h-5 w-5" />
                        {language === 'en' ? 'Email Us' : 'ای میل کریں'}
                    </a>
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
