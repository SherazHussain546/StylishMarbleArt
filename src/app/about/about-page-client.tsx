'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, History, Target, ShieldCheck, Award, MessageCircle } from 'lucide-react';
import { useMemo } from 'react';

export default function AboutPageClient() {
  const { language } = useLanguage();
  const pageContent = content.aboutPage;

  // AboutPage Schema Markup
  const aboutSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "mainEntity": {
        "@type": "LocalBusiness",
        "name": "Stylish Marble Art",
        "description": pageContent.ourStoryText.en,
        "image": "https://www.stylishmarbleart.com/SMA.png",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Malir 15, At Main National Highway Near Bank Al-Habib Ltd",
          "addressLocality": "Karachi",
          "addressRegion": "Sindh",
          "postalCode": "75080",
          "addressCountry": "PK"
        },
        "telephone": "+92-308-3401606",
        "url": "https://www.stylishmarbleart.com/about",
        "foundingDate": "1970",
        "priceRange": "$$"
      }
    };
  }, [pageContent]);

  return (
    <div className="bg-secondary/20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
      
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-primary">
            {pageContent.title[language]}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {pageContent.subtitle[language]}
          </p>
        </div>

        {/* Story Section */}
        <div className="mt-20 grid grid-cols-1 items-center gap-16 md:grid-cols-2">
          <div className="relative h-[500px] w-full overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src="/SMA.png"
              alt="Artisans at Stylish Marble Art workshop in Malir 15, Karachi"
              data-ai-hint="stonemason workshop"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-8 left-8 text-white">
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest opacity-90">
                    <History className="h-4 w-4" />
                    {language === 'en' ? 'Established 1970' : '۱۹۷۰ میں قائم کیا گیا'}
                </p>
            </div>
          </div>
          <div className="space-y-8">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                {language === 'en' ? 'Our Legacy' : 'ہماری میراث'}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{pageContent.ourStoryTitle[language]}</h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
                <p>{pageContent.ourStoryText[language]}</p>
                <p>{pageContent.ourMissionText[language]}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="rounded-full px-8 shadow-lg">
                    <Link href="/services" className="flex items-center gap-2">
                        {language === 'en' ? 'Explore Our Services' : 'ہماری خدمات دیکھیں'}
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                    <Link href="/contact">{language === 'en' ? 'Visit Our Workshop' : 'ورکشاپ تشریف لائیں'}</Link>
                </Button>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mt-32">
          <div className="mx-auto max-w-4xl text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{pageContent.ourValuesTitle[language]}</h2>
            <p className="mt-4 text-muted-foreground text-lg">
                {language === 'en' 
                    ? 'Our foundation is built on three pillars that define our service in the Karachi marble industry.' 
                    : 'ہماری بنیاد تین ستونوں پر ہے جو کراچی کی ماربل انڈسٹری میں ہماری خدمت کی تعریف کرتے ہیں۔'}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {pageContent.values.map((value, index) => (
              <Card key={index} className="border-none shadow-xl bg-background/50 backdrop-blur hover:shadow-2xl transition-shadow group">
                <CardHeader className="text-center">
                  <div className="mx-auto mb-4 bg-primary/5 p-4 rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {index === 0 ? <ShieldCheck className="h-8 w-8" /> : index === 1 ? <Award className="h-8 w-8" /> : <Target className="h-8 w-8" />}
                  </div>
                  <CardTitle className="text-2xl font-bold">{value.name[language]}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground leading-relaxed">{value.description[language]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {/* CTA Banner */}
        <div className="mt-32 rounded-[3rem] bg-primary py-16 px-8 text-center text-primary-foreground shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <Image src="/SMAHeader.png" alt="Marble texture" fill className="object-cover grayscale" />
            </div>
            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                    {language === 'en' ? 'Planning a Custom Project in Karachi?' : 'کیا آپ کراچی میں کسی کسٹم پروجیکٹ کی منصوبہ بندی کر رہے ہیں؟'}
                </h2>
                <p className="text-lg text-primary-foreground/80 mb-10 leading-relaxed">
                    {language === 'en' 
                        ? 'From Ziarat White headstones to modern granite kitchen slabs, our artisans in Malir 15 are ready to bring your vision to life.' 
                        : 'زیارت وائٹ کتبوں سے لے کر جدید گرینائٹ کچن سلیبس تک، ملیر 15 میں ہمارے کاریگر آپ کے وژن کو حقیقت بنانے کے لیے تیار ہیں۔'}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild size="lg" variant="secondary" className="rounded-full px-10 font-bold">
                        <Link href="/contact" className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            {language === 'en' ? 'Get a Free Quote' : 'مفت کوٹیشن حاصل کریں'}
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full px-10 font-bold bg-transparent text-white border-white hover:bg-white hover:text-primary">
                        <Link href="/gallery">{language === 'en' ? 'View Our Portfolio' : 'ہمارا کام دیکھیں'}</Link>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
