
'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';

export function HomeAbout() {
  const { language } = useLanguage();

  return (
    <section className="py-12 md:py-24 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{content.homeAbout.title[language]}</h2>
            <p className="mt-4 text-muted-foreground text-lg">{content.homeAbout.paragraph1[language]}</p>
            <p className="mt-4 text-muted-foreground text-lg">{content.homeAbout.paragraph2[language]}</p>
            <Button asChild size="lg" className="mt-8">
              <Link href="/about">{content.homeAbout.cta[language]}</Link>
            </Button>
          </div>
          <div className="flex justify-center">
            <Image
              src="/Gallery/tom/artist.png"
              alt="Artisan from Stylish Marble Art carving a custom marble gravestone in Karachi"
              data-ai-hint="artisan carving"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
