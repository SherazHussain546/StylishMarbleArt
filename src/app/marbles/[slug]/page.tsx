
'use client';

import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import type { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const marble = content.marbleTypes.types.find((m) => m.slug === params.slug);

  if (!marble) {
    return {
      title: 'Marble Not Found',
      description: 'The requested marble type could not be found.',
    };
  }

  const { name, page_description } = marble;
  const title = `${name.en} | ${name.ur}`;
  const description = `${page_description.en.substring(0, 160)} | ${page_description.ur.substring(0, 160)}`;
  
  return {
    title: title,
    description: description,
    keywords: [name.en, name.ur, 'marble type', 'marble details', 'Pakistan marble', 'سنگ مرمر کی قسم', 'سنگ مرمر کی تفصیلات'],
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: marble.image,
          width: 800,
          height: 600,
          alt: name.en,
        },
      ],
    },
  };
}


export default function MarbleDetailPage() {
  const params = useParams();
  const slug = params.slug;
  const { language } = useLanguage();
  const marble = content.marbleTypes.types.find((m) => m.slug === slug);

  if (!marble) {
    notFound();
  }
  
  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <Button asChild variant="ghost">
              <Link href="/#marbles" className="flex items-center gap-2 text-muted-foreground">
                <ArrowLeft size={16} />
                {language === 'en' ? 'Back to Marble Selection' : 'ماربل انتخاب پر واپس'}
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-2">
            <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl">
              <Image
                src={marble.image}
                alt={marble.name[language]}
                data-ai-hint={marble.hint}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{marble.name[language]}</h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                {marble.page_description[language]}
              </p>
               <Button asChild size="lg" className="mt-4">
                 <Link href="/contact">{language === 'en' ? 'Inquire About This Marble' : 'اس ماربل کے بارے میں پوچھیں'}</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
