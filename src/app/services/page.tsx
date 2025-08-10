'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Separator } from '@/components/ui/separator';

export default function ServicesPage() {
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
