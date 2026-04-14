'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, MessageCircle, MapPin, Phone, Globe } from 'lucide-react';
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
    // If specific rich schema details exist (like for Rosso Verona), use them
    const desc = marble.meta_description?.en || marble.page_description.en;
    
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": marble.name.en,
      "description": desc,
      "image": marble.image.startsWith('http') ? marble.image : `https://www.stylishmarbleart.com${marble.image}`,
      "brand": {
        "@type": "Brand",
        "name": "Stylish Marble Art"
      },
      "offers": {
        "@type": "Offer",
        "availability": "https://schema.org/InStock",
        "priceCurrency": "PKR",
        "seller": {
            "@type": "LocalBusiness",
            "name": "Stylish Marble Art",
            "address": "Malir 15, National Highway, Karachi",
            "telephone": "+923083401606"
        }
      },
      "material": `Natural ${marble.name.en}`,
      ...(marble.appearance && { "color": marble.appearance.en })
    };
  }, [marble]);
  
  const phone = "+92 308 3401606";
  const whatsappNumber = phone.replace(/\D/g, '');

  return (
    <div className="bg-background min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      
      {/* Header / Breadcrumb */}
      <div className="bg-secondary/30 py-6">
        <div className="container mx-auto px-4">
            <Button asChild variant="ghost" className="hover:bg-primary/5">
              <Link href="/#marbles" className="flex items-center gap-2 text-muted-foreground">
                <ArrowLeft size={16} />
                {language === 'en' ? 'Back to Marble Selection' : 'ماربل انتخاب پر واپس'}
              </Link>
            </Button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="mx-auto max-w-6xl">
          {/* Main Hero Grid */}
          <article className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
            <div className="space-y-8">
              <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden rounded-[2rem] shadow-2xl border-8 border-white">
                <Image
                  src={marble.image}
                  alt={`${marble.name['en']} - ${marble.slug.replace(/-/g, ' ')} by Stylish Marble Art, Karachi`}
                  data-ai-hint={marble.hint}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              </div>
              
              {/* Stone Attributes Card */}
              {(marble.origin || marble.appearance || marble.finishes) && (
                <Card className="bg-primary/5 border-none shadow-inner rounded-3xl overflow-hidden">
                    <CardContent className="p-8 grid grid-cols-1 gap-6">
                        {marble.origin && (
                            <div className="flex gap-4">
                                <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    <Globe className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{language === 'en' ? 'Stone Origin' : 'پتھر کا اصل'}</p>
                                    <p className="font-medium">{marble.origin[language]}</p>
                                </div>
                            </div>
                        )}
                        {marble.appearance && (
                            <div className="flex gap-4">
                                <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    <div className="h-5 w-5 rounded-sm bg-primary/20 border border-primary/30"></div>
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{language === 'en' ? 'Color / Appearance' : 'رنگ اور ظاہری شکل'}</p>
                                    <p className="font-medium">{marble.appearance[language]}</p>
                                </div>
                            </div>
                        )}
                        {marble.finishes && (
                            <div className="flex gap-4">
                                <div className="bg-primary/10 h-10 w-10 rounded-full flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{language === 'en' ? 'Available Finishes' : 'دستیاب فنشز'}</p>
                                    <p className="font-medium">{marble.finishes[language]}</p>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
              )}
            </div>

            <div className="space-y-10">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-primary leading-tight">
                    {marble.h1 ? marble.h1[language] : marble.name[language]}
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed italic border-l-4 border-primary/20 pl-6 py-2">
                    {marble.intro ? marble.intro[language] : marble.page_description[language]}
                </p>
              </div>

              {/* About Section */}
              {marble.about && (
                <div className="space-y-4">
                    <h2 className="text-2xl font-bold flex items-center gap-2">
                        {language === 'en' ? `About ${marble.name.en}` : `${marble.name.ur} کے بارے میں`}
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {marble.about[language]}
                    </p>
                </div>
              )}

              {/* Typical Uses */}
              {marble.uses && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold">{language === 'en' ? 'Typical Uses & Applications' : 'عام استعمال اور اطلاقات'}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {marble.uses[language].map((use, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-4 bg-secondary/20 rounded-xl">
                                <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                                <span className="font-medium">{use}</span>
                            </div>
                        ))}
                    </div>
                </div>
              )}

              {/* Why Choose SMA */}
              {marble.why_choose && (
                <div className="space-y-4 p-8 bg-primary text-primary-foreground rounded-[2rem] shadow-xl">
                    <h2 className="text-2xl font-bold">{language === 'en' ? `Why Choose Stylish Marble Art?` : `سٹائلش ماربل آرٹ کیوں منتخب کریں؟`}</h2>
                    <p className="leading-relaxed opacity-90">
                        {marble.why_choose[language]}
                    </p>
                </div>
              )}

              {/* Conversion Box */}
              <div className="pt-6 space-y-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button asChild size="lg" className="rounded-full px-10 h-14 text-lg shadow-lg">
                        <Link href="/contact" className="flex items-center gap-2">
                            <Phone className="h-5 w-5" />
                            {language === 'en' ? 'Get a Free Quote' : 'مفت کوٹیشن حاصل کریں'}
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="rounded-full px-10 h-14 text-lg bg-green-500 text-white border-green-500 hover:bg-green-600 hover:text-white">
                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            {language === 'en' ? 'WhatsApp for Price' : 'واٹس ایپ پر قیمت معلوم کریں'}
                        </a>
                    </Button>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground justify-center sm:justify-start">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Malir 15, National Highway, Karachi</span>
                  </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
