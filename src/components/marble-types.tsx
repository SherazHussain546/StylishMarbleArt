
'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export function MarbleTypes() {
  const { language } = useLanguage();
  const sectionContent = content.marbleTypes;

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
      </div>
    </section>
  );
}
