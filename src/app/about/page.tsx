import type { Metadata } from 'next';
import { content } from '@/lib/content';

// Client Component
import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// SEO Metadata
export async function generateMetadata({ params }: any): Promise<Metadata> {
  const pageContent = content.aboutPage;
  const englishTitle = pageContent.title.en;
  const urduTitle = pageContent.title.ur;
  const englishDescription = pageContent.ourStoryText.en;
  const urduDescription = pageContent.ourStoryText.ur;

  return {
    title: `${englishTitle} | ${urduTitle}`,
    description: `${englishDescription.substring(0, 150)}... | ${urduDescription.substring(0, 150)}...`,
    keywords: ['about Stylish Marble Art', 'marble history', 'family business marble', 'stonemasonry Karachi', 'ہمارے بارے میں', 'سنگ مرمر کی تاریخ'],
  };
}


// Page Component
export default function AboutPage() {
  'use client';
  
  const { language } = useLanguage();
  const pageContent = content.aboutPage;

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{pageContent.title[language]}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{pageContent.subtitle[language]}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl">
            <Image
              src="https://placehold.co/600x800.png"
              alt="Stonemason carefully working"
              data-ai-hint="stonemason working"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold">{pageContent.ourStoryTitle[language]}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{pageContent.ourStoryText[language]}</p>
          </div>
        </div>

        <div className="mt-24">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{pageContent.ourValuesTitle[language]}</h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {pageContent.values.map((value, index) => (
              <Card key={index} className="border-t-4 border-primary">
                <CardHeader>
                  <CardTitle className="text-2xl">{value.name[language]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{value.description[language]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
