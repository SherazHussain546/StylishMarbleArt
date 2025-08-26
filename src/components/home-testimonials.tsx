
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { getTestimonials, type Testimonial } from '@/app/admin/dashboard/testimonials/actions';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/contexts/language-context';
import { ExternalLink, Quote } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function HomeTestimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const { language } = useLanguage();

  useEffect(() => {
    async function loadTestimonials() {
      setIsLoading(true);
      setError(false);
      try {
        const fetchedTestimonials = await getTestimonials();
        setTestimonials(fetchedTestimonials);
      } catch (e) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }
    loadTestimonials();
  }, []);

  if (isLoading) {
    return (
      <section className="py-12 md:py-24 bg-secondary">
        <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{language === 'en' ? 'What Our Clients Say' : 'ہمارے کلائنٹ کیا کہتے ہیں۔'}</h2>
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
                <Skeleton className="h-48 w-full" />
            </div>
        </div>
      </section>
    )
  }

  if (error || testimonials.length === 0) {
    return null; // Don't render the section if there's an error or no testimonials
  }
  
  return (
    <section className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{language === 'en' ? 'What Our Clients Say' : 'ہمارے کلائنٹ کیا کہتے ہیں۔'}</h2>
            <p className="mt-4 text-lg text-muted-foreground">{language === 'en' ? 'Hear from families and businesses we have had the pleasure to serve.' : 'ان خاندانوں اور کاروباروں سے سنیں جن کی خدمت کرنے کا ہمیں اعزاز حاصل ہوا ہے۔'}</p>
        </div>
        <Carousel
          opts={{
            align: 'start',
            loop: testimonials.length > 1,
          }}
          className="w-full max-w-4xl mx-auto"
        >
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-4 h-full">
                  <Card className="h-full flex flex-col">
                    <CardContent className="flex-grow p-6 flex flex-col items-center text-center">
                        <Quote className="h-8 w-8 text-primary mb-4" />
                        <p className="text-muted-foreground italic mb-4 flex-grow">"{testimonial.text}"</p>
                        <p className="font-bold">{testimonial.name}</p>
                        {testimonial.sourceUrl && (
                             <Link href={testimonial.sourceUrl} target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline mt-1 inline-flex items-center gap-1">
                                {language === 'en' ? 'View Source' : 'ذریعہ دیکھیں'}
                                <ExternalLink className="h-3 w-3" />
                            </Link>
                        )}
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {testimonials.length > 2 && <CarouselPrevious className="hidden sm:flex" />}
          {testimonials.length > 2 && <CarouselNext className="hidden sm:flex" />}
        </Carousel>
      </div>
    </section>
  );
}
