import type { Metadata } from 'next';
import { content } from '@/lib/content';

// Client Component
import { useLanguage } from '@/contexts/language-context';
import { Separator } from '@/components/ui/separator';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Our Services',
    description: 'We offer a comprehensive range of marble services, from memorial crafting to home installations. Our team is here to guide you through every step of the process with care and professionalism.',
    keywords: ['marble services', 'gravestone making', 'kitchen marble installation', 'custom engraving', 'marble repair', 'ماربل کی خدمات', 'قبر بنانا', 'کچن ماربل'],
};


// Page Component
export default function ServicesPage() {
  'use client';

  const { language } = useLanguage();
  const pageContent = content.servicesPage;

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{pageContent.title[language]}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{pageContent.description[language]}</p>
        </div>
        <div className="mt-16 mx-auto max-w-5xl space-y-12">
          {pageContent.serviceList.map((service, index) => (
            <div key={index}>
              <div className="text-center md:text-left">
                <h2 className="text-3xl font-bold">{service.name[language]}</h2>
                <p className="mt-4 text-lg text-muted-foreground">{service.description[language]}</p>
              </div>
              {index < pageContent.serviceList.length - 1 && <Separator className="mt-12" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
