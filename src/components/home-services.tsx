'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gem, Home, Wrench } from 'lucide-react';

const icons: { [key: string]: React.ElementType } = {
  Gem,
  Home,
  Wrench,
};

export function HomeServices() {
  const { language } = useLanguage();

  return (
    <section className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{content.homeServices.title[language]}</h2>
        </div>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {content.homeServices.services.map(service => {
            const Icon = icons[service.icon];
            return (
              <Card key={service.name.en} className="text-center transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                <CardHeader className="items-center">
                  <div className="rounded-full bg-accent p-4">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="mt-4">{service.name[language]}</CardTitle>
                  <CardDescription className="mt-2 text-base leading-relaxed">
                    {service.description[language]}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
