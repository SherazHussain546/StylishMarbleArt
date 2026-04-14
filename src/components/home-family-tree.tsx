
'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GitGraph, Users, Share2, MapPin, Search } from 'lucide-react';

export function HomeFamilyTree() {
  const { language } = useLanguage();
  const sectionContent = content.homeFamilyTree;

  return (
    <section className="py-16 md:py-32 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-block bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                {language === 'en' ? 'Free Community Tool' : 'مفت کمیونٹی ٹول'}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary leading-tight">
                {sectionContent.title[language]}
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
                {sectionContent.description[language]}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {sectionContent.features.map((feature, idx) => (
                    <div key={idx} className="flex gap-4">
                        <div className="mt-1 h-10 w-10 rounded-lg bg-primary text-primary-foreground flex items-center justify-center shrink-0 shadow-lg">
                            {idx === 0 ? <GitGraph className="h-5 w-5" /> : idx === 1 ? <MapPin className="h-5 w-5" /> : <Share2 className="h-5 w-5" />}
                        </div>
                        <div>
                            <h3 className="font-bold text-lg">{feature.title[language]}</h3>
                            <p className="text-sm text-muted-foreground">{feature.description[language]}</p>
                        </div>
                    </div>
                ))}
            </div>
            <Button asChild size="lg" className="rounded-full px-10 shadow-xl group">
                <Link href="/locator">
                    <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                    {sectionContent.cta[language]}
                </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-[3rem] -rotate-3 scale-105"></div>
            <Card className="relative z-10 rounded-[3rem] border-none shadow-2xl overflow-hidden bg-background p-8 md:p-12">
                <div className="flex flex-col items-center text-center space-y-6">
                    <div className="bg-primary/5 p-6 rounded-full">
                        <Users className="h-16 w-16 text-primary opacity-20" />
                    </div>
                    <div className="space-y-2">
                        <div className="h-2 w-32 bg-primary/10 rounded-full mx-auto"></div>
                        <div className="h-2 w-24 bg-primary/5 rounded-full mx-auto"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-4 w-full pt-8">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="space-y-3 flex flex-col items-center">
                                <div className="h-12 w-12 rounded-xl bg-secondary animate-pulse"></div>
                                <div className="h-1.5 w-12 bg-muted rounded-full"></div>
                            </div>
                        ))}
                    </div>
                    <div className="pt-8 w-full border-t border-dashed">
                        <p className="text-xs font-bold uppercase tracking-widest text-primary/40 mb-4">Live Preview</p>
                        <div className="bg-primary/5 rounded-2xl p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-lg bg-primary/20"></div>
                                <div className="text-left">
                                    <div className="h-2 w-20 bg-primary/20 rounded-full mb-1.5"></div>
                                    <div className="h-1.5 w-12 bg-primary/10 rounded-full"></div>
                                </div>
                            </div>
                            <Share2 className="h-4 w-4 text-primary opacity-40" />
                        </div>
                    </div>
                </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
