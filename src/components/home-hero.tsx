'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import Image from 'next/image';
import { useVariant } from '@/firebase';

export function HomeHero() {
  const { language } = useLanguage();
  
  // A/B Test: Hero Messaging Variant
  // key: 'hero_variant', possible values: 'control', 'global'
  const heroVariant = useVariant('hero_variant', 'control');

  const getHeroContent = () => {
    if (heroVariant === 'global') {
      return {
        title: {
          en: 'Global Islamic Artistry: Serving the Ummah Worldwide',
          ur: 'عالمی اسلامی دستکاری: دنیا بھر میں امت کی خدمت',
        },
        subtitle: {
          en: 'Premium gravestones and custom marble work exported globally from Karachi. Dedicated craftsmanship for Muslim communities across the Middle East, Africa, and beyond.',
          ur: 'کراچی سے عالمی سطح پر برآمد کیے جانے والے پریمیم کتبے اور کسٹم ماربل ورک۔ مشرق وسطیٰ، افریقہ اور اس سے باہر کی مسلم کمیونٹیز کے لیے وقف کاریگری۔',
        }
      };
    }
    return content.hero;
  };

  const currentContent = getHeroContent();

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
            {currentContent.title[language]}
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
            {currentContent.subtitle[language]}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/services">{content.hero.cta[language]}</Link>
            </Button>
             <Button asChild size="lg" variant="outline">
               <Link href="/gallery">
                {content.hero.galleryCta[language]}
               </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
