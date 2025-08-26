
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import Image from 'next/image';

export function HomeHero() {
  const { language } = useLanguage();

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40">
      <Image
        src="/SMAHeader.png"
        alt="Tranquil memorial garden with gravestones and headstones by Stylish Marble Art, Karachi"
        data-ai-hint="memorial garden"
        fill
        className="object-cover object-center"
        style={{ zIndex: -2 }}
        priority
      />
      <div className="absolute inset-0 bg-background/70" style={{ zIndex: -1 }}></div>
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {content.hero.title[language]}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            {content.hero.subtitle[language]}
          </p>
          <div className="mt-10">
            <Button asChild size="lg">
              <Link href="/services">{content.hero.cta[language]}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
