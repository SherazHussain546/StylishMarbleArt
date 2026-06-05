'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GitGraph, Users, Share2, MapPin, Search, Heart, Sparkles, Activity } from 'lucide-react';
import placeholderImages from '@/app/lib/placeholder-images.json';

export function HomeFamilyTree() {
  const { language } = useLanguage();
  const sectionContent = content.homeFamilyTree;

  return (
    <section className="py-16 md:py-32 bg-primary/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                <Sparkles className="h-3 w-3" />
                {language === 'en' ? 'A Free Gift to the Community' : 'کمیونٹی کے لیے ایک مفت تحفہ'}
            </div>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-primary leading-tight">
                {sectionContent.title[language]}
            </h2>
            <div className="space-y-4">
                <p className="text-xl text-muted-foreground leading-relaxed">
                    {sectionContent.description[language]}
                </p>
                <p className="text-lg font-medium text-primary/80 italic">
                    {language === 'en' 
                        ? 'Helping current and coming generations remember their roots and honor their ancestors forever.' 
                        : 'موجودہ اور آنے والی نسلوں کو ان کی جڑوں کو یاد رکھنے اور اپنے آباؤ اجداد کی ہمیشہ کے لیے عزت کرنے میں مدد کرنا۔'}
                </p>
            </div>
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
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full px-10 shadow-xl group">
                    <Link href="/locator">
                        <Search className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
                        {sectionContent.cta[language]}
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-10 border-primary text-primary hover:bg-primary hover:text-white">
                    <Link href="/locator">
                        <Heart className="mr-2 h-5 w-5" />
                        {language === 'en' ? 'Pin a Relative' : 'رشتہ دار کو پن کریں'}
                    </Link>
                </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 rounded-[3rem] -rotate-3 scale-105"></div>
            <Card className="relative z-10 rounded-[3rem] border-none shadow-2xl overflow-hidden bg-background p-0">
                <div className="bg-primary p-8 text-primary-foreground relative overflow-hidden">
                    <div className="absolute top-0 right-0 opacity-10 -mr-8 -mt-8">
                        <GitGraph className="h-40 w-40" />
                    </div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Activity className="h-3 w-3 text-green-400 animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">
                                {language === 'en' ? 'Community Live Registry' : 'کمیونٹی لائیو رجسٹری'}
                            </span>
                        </div>
                        <h3 className="text-2xl font-bold leading-tight">
                            {language === 'en' ? 'Digital Legacy Portal' : 'ڈیجیٹل لیگیسی پورٹل'}
                        </h3>
                        <p className="text-sm opacity-80 mt-2">
                            {language === 'en' ? 'Connecting families across borders.' : 'سرحدوں کے پار خاندانوں کو جوڑ رہا ہے۔'}
                        </p>
                    </div>
                </div>
                <div className="p-8 space-y-8">
                    <div className="flex items-center justify-between">
                        <div className="flex -space-x-3">
                            {placeholderImages.avatars.map((avatar) => (
                                <div key={avatar.id} className="h-10 w-10 rounded-full border-2 border-background bg-secondary overflow-hidden shadow-sm">
                                    <img 
                                        src={avatar.url} 
                                        alt="User avatar" 
                                        data-ai-hint={avatar.keywords}
                                        className="h-full w-full object-cover" 
                                    />
                                </div>
                            ))}
                            <div className="h-10 w-10 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg">
                                +1.2k
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                {language === 'en' ? 'Memorials Added' : 'شامل یادگاریں'}
                            </p>
                            <p className="text-xl font-bold text-primary tracking-tighter">1,540+</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-secondary/10 hover:bg-secondary/20 transition-all rounded-2xl p-4 flex items-center gap-4 border border-primary/5 group/card cursor-default">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/card:scale-110 transition-transform">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                                    {language === 'en' ? 'Recent Pin' : 'حالیہ پن'}
                                </p>
                                <p className="font-bold text-foreground">Wadi-e-Hussain, Karachi</p>
                            </div>
                            <Activity className="h-4 w-4 ml-auto text-primary opacity-20 group-hover/card:opacity-100 transition-opacity" />
                        </div>

                        <div className="bg-secondary/10 hover:bg-secondary/20 transition-all rounded-2xl p-4 flex items-center gap-4 border border-primary/5 group/card cursor-default">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/card:scale-110 transition-transform">
                                <GitGraph className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                                    {language === 'en' ? 'Lineage Connection' : 'نسلی تعلق'}
                                </p>
                                <p className="font-bold text-foreground">
                                    {language === 'en' ? '3rd Gen Record Linked' : 'تیسری نسل کا ریکارڈ منسلک'}
                                </p>
                            </div>
                            <Activity className="h-4 w-4 ml-auto text-primary opacity-20 group-hover/card:opacity-100 transition-opacity" />
                        </div>
                    </div>
                    
                    <div className="pt-6 border-t border-dashed">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                            <span>{language === 'en' ? 'Global Search Nodes' : 'عالمی تلاش'}</span>
                            <div className="flex gap-1">
                                <span className="h-1 w-1 bg-primary rounded-full animate-bounce"></span>
                                <span className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-2/3 rounded-full relative">
                                <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                            </div>
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
