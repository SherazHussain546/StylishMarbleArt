'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GitGraph, MapPin, Search, Heart, Sparkles, Activity, Loader2, Share2, Users, ShieldCheck, Globe } from 'lucide-react';
import { useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { collection, query, orderBy, where, limit } from 'firebase/firestore';

export function HomeFamilyTree() {
  const { language } = useLanguage();
  const sectionContent = content.homeFamilyTree;
  const db = useFirestore();

  // Fetch total count for stats
  const memorialsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'memorials'));
  }, [db]);
  const { data: allMemorials } = useCollection<any>(memorialsQuery);
  const totalCount = allMemorials?.length || 0;

  // Fetch most recent for the activity feed
  const recentMemorialsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, 'memorials'), orderBy('createdAt', 'desc'), limit(1));
  }, [db]);
  const { data: recentMemorials, isLoading: recentLoading } = useCollection<any>(recentMemorialsQuery);
  const latestMemorial = recentMemorials?.[0];

  // REAL DATA: Fetch memorials with actual images to show in the row
  const memorialsWithImagesQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(
        collection(db, 'memorials'), 
        where('imageUrl', '!=', ''), 
        limit(4)
    );
  }, [db]);
  const { data: featuredMemorials } = useCollection<any>(memorialsWithImagesQuery);

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
                <Button asChild size="lg" className="rounded-full px-10 shadow-xl group text-lg h-14">
                    <Link href="/locator">
                        <Search className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" />
                        {sectionContent.cta[language]}
                    </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="rounded-full px-10 border-primary text-primary hover:bg-primary hover:text-white h-14">
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
                        <div className="flex -space-x-3 items-center">
                            {/* Showing Real Data: Featured memorials with photos */}
                            {featuredMemorials && featuredMemorials.length > 0 ? (
                                featuredMemorials.map((m: any) => (
                                    <div key={m.id} className="h-12 w-12 rounded-full border-2 border-background bg-secondary overflow-hidden shadow-md">
                                        <img 
                                            src={m.imageUrl} 
                                            alt={m.deceasedName} 
                                            className="h-full w-full object-cover" 
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="h-12 w-12 rounded-full border-2 border-background bg-secondary flex items-center justify-center shadow-md">
                                    <Users className="h-5 w-5 text-muted-foreground opacity-20" />
                                </div>
                            )}
                            <div className="h-12 w-12 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-lg z-10">
                                {recentLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : `+${totalCount > 4 ? totalCount - 4 : 0}`}
                            </div>
                            <div className="ml-6 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                {language === 'en' ? 'Families Joined' : 'خاندان شامل ہوئے'}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                {language === 'en' ? 'Memorials Linked' : 'شامل یادگاریں'}
                            </p>
                            <p className="text-2xl font-bold text-primary tracking-tighter">
                                {recentLoading ? '---' : totalCount.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="bg-secondary/10 hover:bg-secondary/20 transition-all rounded-2xl p-4 flex items-center gap-4 border border-primary/5 group/card cursor-default">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/card:scale-110 transition-transform">
                                <MapPin className="h-6 w-6 text-primary" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                                    {language === 'en' ? 'Latest Memorial Pin' : 'حالیہ یادگاری پن'}
                                </p>
                                <p className="font-bold text-foreground truncate">
                                    {recentLoading ? '...' : (latestMemorial?.graveyardName || latestMemorial?.deceasedName || 'Karachi, Pakistan')}
                                </p>
                            </div>
                            <Activity className="h-4 w-4 ml-auto text-primary opacity-20 group-hover/card:opacity-100 transition-opacity" />
                        </div>

                        <div className="bg-secondary/10 hover:bg-secondary/20 transition-all rounded-2xl p-4 flex items-center gap-4 border border-primary/5 group/card cursor-default">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/card:scale-110 transition-transform">
                                <ShieldCheck className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                                    {language === 'en' ? 'Heritage Preservation' : 'ورثے کا تحفظ'}
                                </p>
                                <p className="font-bold text-foreground">
                                    {language === 'en' ? 'Secure Digital Archiving' : 'محفوظ ڈیجیٹل آرکائیونگ'}
                                </p>
                            </div>
                            <Activity className="h-4 w-4 ml-auto text-primary opacity-20 group-hover/card:opacity-100 transition-opacity" />
                        </div>

                        <div className="bg-secondary/10 hover:bg-secondary/20 transition-all rounded-2xl p-4 flex items-center gap-4 border border-primary/5 group/card cursor-default">
                            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover/card:scale-110 transition-transform">
                                <Globe className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                                    {language === 'en' ? 'Global Access' : 'عالمی رسائی'}
                                </p>
                                <p className="font-bold text-foreground">
                                    {language === 'en' ? 'Searchable from Anywhere' : 'دنیا بھر سے قابلِ تلاش'}
                                </p>
                            </div>
                            <Activity className="h-4 w-4 ml-auto text-primary opacity-20 group-hover/card:opacity-100 transition-opacity" />
                        </div>
                    </div>
                    
                    <div className="pt-6 border-t border-dashed">
                        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-4">
                            <span>{language === 'en' ? 'Digital Lineage Progress' : 'ڈیجیٹل شجرہ کی ترقی'}</span>
                            <div className="flex gap-1">
                                <span className="h-1 w-1 bg-primary rounded-full animate-bounce"></span>
                                <span className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:0.2s]"></span>
                                <span className="h-1 w-1 bg-primary rounded-full animate-bounce [animation-delay:0.4s]"></span>
                            </div>
                        </div>
                        <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                            <div className="h-full bg-primary w-3/4 rounded-full relative">
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
