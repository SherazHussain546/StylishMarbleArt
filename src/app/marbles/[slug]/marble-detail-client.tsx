
'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';

export default function MarbleDetailClient() {
  const { slug } = useParams() as { slug: string };
  const { language } = useLanguage();
  const marble = content.marbleTypes.types.find((m) => m.slug === slug);

  if (!marble) {
    notFound();
  }

  const productSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": marble.name.en,
      "description": marble.page_description.en,
      "image": marble.image.startsWith('http') ? marble.image : `https://www.stylishmarbleart.com${marble.image}`,
      "brand": {
        "@type": "Brand",
        "name": "Stylish Marble Art"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "PKR",
        "availability": "https://schema.org/InStock",
        "seller": {
            "@type": "Organization",
            "name": "Stylish Marble Art"
        }
      }
    };
  }, [marble]);
  
  return (
    <div className="bg-secondary">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <nav className="mb-8">
            <Button asChild variant="ghost">
              <Link href="/#marbles" className="flex items-center gap-2 text-muted-foreground">
                <ArrowLeft size={16} />
                {language === 'en' ? 'Back to Marble Selection' : 'ماربل انتخاب پر واپس'}
              </Link>
            </Button>
          </nav>
          <article className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
            <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl">
              <Image
                src={marble.image}
                alt={`${marble.name['en']} marble slab price in Karachi Pakistan - Stylish Marble Art`}
                data-ai-hint={marble.hint}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="space-y-6">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{marble.name[language]}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {marble.page_description[language]}
              </p>
               <div className="flex flex-col gap-4">
                  <Button asChild size="lg">
                    <Link href="/contact">{language === 'en' ? 'Get Price Quote' : 'قیمت معلوم کریں'}</Link>
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    {language === 'en' ? 'Contact us for Ziarat White and Granite pricing in Karachi.' : 'کراچی میں زیارت وائٹ اور گرینائٹ کی قیمتوں کے لیے ہم سے رابطہ کریں۔'}
                  </p>
               </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
