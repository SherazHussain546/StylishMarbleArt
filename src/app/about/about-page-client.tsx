'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function AboutPageClient() {
  const { language } = useLanguage();
  const pageContent = content.aboutPage;

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{pageContent.title[language]}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{pageContent.subtitle[language]}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl">
            <Image
              src="/SMA.png"
              alt="Stonemason from Stylish Marble Art working on a marble gravestone in Karachi"
              data-ai-hint="stonemason working"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{pageContent.ourStoryTitle[language]}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{pageContent.ourStoryText[language]}</p>
            <Button asChild className="mt-8">
                <Link href="/services" className="flex items-center gap-2">
                    {language === 'en' ? 'See Our Services' : 'ہماری خدمات دیکھیں'}
                    <ArrowRight className="h-4 w-4" />
                </Link>
            </Button>
          </div>
        </div>

        <div className="mt-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{pageContent.ourValuesTitle[language]}</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {pageContent.values.map((value, index) => (
              <Card key={index} className="border-t-4 border-primary">
                <CardHeader>
                  <CardTitle className="text-2xl">{value.name[language]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description[language]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div className="mt-24 text-center">
            <h2 className="text-2xl font-bold mb-6">{language === 'en' ? 'Have a specific project in mind?' : 'کیا آپ کے ذہن میں کوئی مخصوص منصوبہ ہے؟'}</h2>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" variant="default">
                    <Link href="/contact">{language === 'en' ? 'Request a Quote' : 'کوٹیشن حاصل کریں'}</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                    <Link href="/gallery">{language === 'en' ? 'View Our Work' : 'ہمارا کام دیکھیں'}</Link>
                </Button>
            </div>
        </div>
      </div>
    </div>
  );
}