
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Phone, MessageCircle } from 'lucide-react';

export function MarbleTypes() {
  const { language } = useLanguage();
  const sectionContent = content.marbleTypes;
  const phone = content.contactPage.contactInfo.phone.en.replace(/\s/g, '');
  const whatsappNumber = phone.replace(/\D/g, '');

  return (
    <section className="py-12 md:py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{sectionContent.title[language]}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{sectionContent.description[language]}</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sectionContent.types.map((marble) => (
            <Link key={marble.slug} href={`/marbles/${marble.slug}`} className="group block">
              <Card className="overflow-hidden h-full transition-shadow duration-300 group-hover:shadow-xl">
                <CardHeader className="p-0">
                  <div className="relative h-60 w-full">
                    <Image
                      src={marble.image}
                      alt={`High-quality ${marble.name.en} offered by Stylish Marble Art for custom work`}
                      data-ai-hint={marble.hint}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-xl text-center">{marble.name[language]}</CardTitle>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg">
                <a href={`tel:${phone}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    {language === 'en' ? 'Call Us Now' : 'ابھی کال کریں'}
                </a>
            </Button>
            <Button asChild size="lg" variant="outline">
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    {language === 'en' ? 'WhatsApp Us' : 'واٹس ایپ پر رابطہ کریں'}
                </a>
            </Button>
        </div>
      </div>
    </section>
  );
}
