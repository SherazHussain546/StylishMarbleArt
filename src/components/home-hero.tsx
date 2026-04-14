
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import Image from 'next/image';
import { useVariant } from '@/firebase';
import { Search, Globe } from 'lucide-react';

export function HomeHero() {
  const { language } = useLanguage();
  
  /**
   * A/B Test: Hero Messaging Variant
   * Key: 'hero_variant'
   * Values: 'control' (Karachi focus), 'global' (Ummah focus)
   */
  const heroVariant = useVariant('hero_variant', 'control');

  const getHeroContent = () => {
    if (heroVariant === 'global') {
      return {
        title: {
          en: 'Global Islamic Artistry: Serving the Ummah Worldwide',
          ur: 'عالمی اسلامی دستکاری: دنیا بھر میں امت کی خدمت',
        },
        subtitle: {
          en: 'Premium gravestones and custom marble work exported globally from our Karachi workshop. Dedicated craftsmanship for Muslim communities across the Middle East, Africa, and beyond.',
          ur: 'کراچی ورکشاپ سے عالمی سطح پر برآمد کیے جانے والے پریمیم کتبے اور کسٹم ماربل ورک۔ مشرق وسطیٰ، افریقہ اور اس سے باہر کی مسلم کمیونٹیز کے لیے وقف کاریگری۔',
        }
      };
    }
    return content.hero;
  };

  const currentContent = getHeroContent();

  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      <Image
        src="/SMAHeader.png"
        alt="Tranquil memorial garden with gravestones and headstones by Stylish Marble Art, Karachi Pakistan"
        data-ai-hint="memorial garden"
        fill
        className="object-cover object-center"
        style={{ zIndex: -2 }}
        priority
      />
      <div className="absolute inset-0 bg-background/75" style={{ zIndex: -1 }}></div>
      
      <div className="container mx-auto px-4 md:px-6 text-center relative">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <Globe className="h-3 w-3" />
            {language === 'en' ? 'Based in Pakistan • Exporting Globally' : 'پاکستان میں مقیم • عالمی برآمد'}
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            {currentContent.title[language]}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl max-w-3xl mx-auto">
            {currentContent.subtitle[language]}
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="shadow-lg px-10 rounded-full font-bold">
              <Link href="/services">{content.hero.cta[language]}</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="shadow-lg px-10 rounded-full font-bold">
               <Link href="/locator" className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                {content.hero.locatorCta[language]}
               </Link>
            </Button>
             <Button asChild size="lg" variant="outline" className="px-10 rounded-full font-bold">
               <Link href="/contact">
                {language === 'en' ? 'Global Inquiry' : 'عالمی انکوائری'}
               </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
