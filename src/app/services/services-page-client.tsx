
'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Mail, MessageCircle, Phone, ArrowRight, HelpCircle, CheckCircle2, ShieldCheck, Clock, Plane, Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { suggestInscription, type SuggestInscriptionOutput } from '@/ai/flows/suggest-inscription';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ServicesPageClient() {
  const { language } = useLanguage();
  const pageContent = content.servicesPage;
  const phone = content.contactPage.contactInfo.phone.en.replace(/\s/g, '');
  const whatsappNumber = phone.replace(/\D/g, '');
  
  // AI Tool State
  const [relationship, setRelationship] = useState('');
  const [tone, setTone] = useState<'poetic' | 'religious' | 'simple'>('religious');
  const [aiResult, setAiResult] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleSuggest = async () => {
    if (!relationship) return;
    setIsAiLoading(true);
    try {
      const result = await suggestInscription({
        relationship,
        language,
        tone,
      });
      setAiResult(result.inscription);
    } catch (error) {
      console.error(error);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Hero Section */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-primary">
            {pageContent.title[language]}
          </h1>
          <p className="mt-6 text-xl text-muted-foreground leading-relaxed">
            {pageContent.description[language]}
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
             <Button asChild variant="default" size="lg" className="rounded-full px-8 shadow-lg">
                <Link href="/contact">
                    {language === 'en' ? 'Get a Global Quote' : 'عالمی کوٹیشن حاصل کریں'}
                </Link>
             </Button>
             <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                <Link href="/gallery" className="flex items-center gap-2">
                    {language === 'en' ? 'Browse Gallery' : 'گیلری دیکھیں'}
                    <ArrowRight className="h-4 w-4" />
                </Link>
             </Button>
          </div>
        </div>

        {/* AI Inscription Tool */}
        <div className="mt-24 max-w-3xl mx-auto">
            <Card className="border-primary/20 shadow-2xl overflow-hidden">
                <CardHeader className="bg-primary text-primary-foreground text-center">
                    <div className="mx-auto bg-white/20 p-3 rounded-full w-fit mb-4">
                        <Sparkles className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-2xl">
                        {language === 'en' ? 'AI Inscription Assistant' : 'اے آئی کتبہ معاون'}
                    </CardTitle>
                    <CardDescription className="text-primary-foreground/80">
                        {language === 'en' ? 'Let our AI suggest a respectful inscription or Dua for your memorial.' : 'ہمارے اے آئی کو اپنی یادگار کے لیے ایک معزز کتبہ یا دعا تجویز کرنے دیں۔'}
                    </CardDescription>
                </CardHeader>
                <CardContent className="pt-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>{language === 'en' ? 'Relationship' : 'رشتہ'}</Label>
                            <Input 
                                placeholder={language === 'en' ? "e.g. Father, Mother" : "مثلاً والد، والدہ"} 
                                value={relationship}
                                onChange={(e) => setRelationship(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>{language === 'en' ? 'Style/Tone' : 'انداز'}</Label>
                            <Select value={tone} onValueChange={(val: any) => setTone(val)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="religious">{language === 'en' ? 'Religious (Dua)' : 'مذہبی (دعا)'}</SelectItem>
                                    <SelectItem value="poetic">{language === 'en' ? 'Poetic' : 'شاعرانہ'}</SelectItem>
                                    <SelectItem value="simple">{language === 'en' ? 'Simple' : 'سادہ'}</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <Button 
                        onClick={handleSuggest} 
                        className="w-full py-6 text-lg" 
                        disabled={isAiLoading || !relationship}
                    >
                        {isAiLoading ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Suggesting...</> : <><Sparkles className="mr-2 h-5 w-5" /> Generate Suggestion</>}
                    </Button>

                    {aiResult && (
                        <div className="mt-8 p-6 bg-secondary/30 rounded-2xl border border-primary/10 relative group">
                            <p className="text-lg font-medium text-center italic leading-relaxed">
                                "{aiResult}"
                            </p>
                            <div className="mt-4 flex justify-center gap-2">
                                <Button variant="outline" size="sm" onClick={() => {
                                    navigator.clipboard.writeText(aiResult);
                                    alert(language === 'en' ? 'Copied to clipboard!' : 'کلپ بورڈ پر کاپی ہو گیا!');
                                }}>
                                    {language === 'en' ? 'Copy Text' : 'کاپی کریں'}
                                </Button>
                                <Button variant="secondary" size="sm" asChild>
                                    <Link href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(aiResult)}`} target="_blank">
                                        {language === 'en' ? 'Inquire with this Inscription' : 'اس کتبے کے ساتھ انکوائری کریں'}
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>

        {/* Why Choose Us / Trust Badges */}
        <div className="mt-32 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-secondary/30 rounded-2xl">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <ShieldCheck className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg">{language === 'en' ? 'Certified Quality' : 'تصدیق شدہ معیار'}</h3>
                <p className="text-sm text-muted-foreground mt-2">{language === 'en' ? 'Premium A-Grade Ziarat White and Black Granite.' : 'پریمیم اے گریڈ زیارت وائٹ اور بلیک گرینائٹ۔'}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-secondary/30 rounded-2xl">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg">{language === 'en' ? '50+ Years Legacy' : '۵۰ سال سے زیادہ کی میراث'}</h3>
                <p className="text-sm text-muted-foreground mt-2">{language === 'en' ? 'Trusted by families globally for generations.' : 'نسلوں سے عالمی سطح پر خاندانوں کا قابل اعتماد نام۔'}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-secondary/30 rounded-2xl">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg">{language === 'en' ? 'Precision Carving' : 'درست تراش'}</h3>
                <p className="text-sm text-muted-foreground mt-2">{language === 'en' ? 'Modern laser and traditional hand-carved engraving.' : 'جدید لیزر اور روایتی ہاتھ سے تیار کردہ کندہ کاری۔'}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-secondary/30 rounded-2xl">
                <div className="bg-primary/10 p-3 rounded-full mb-4">
                    <Plane className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-bold text-lg">{language === 'en' ? 'Global Shipping' : 'عالمی شپنگ'}</h3>
                <p className="text-sm text-muted-foreground mt-2">{language === 'en' ? 'Expert export to Middle East, Africa, and beyond.' : 'مشرق وسطیٰ، افریقہ اور اس سے باہر ماہرانہ برآمد۔'}</p>
            </div>
        </div>

        {/* Detailed Services */}
        <div className="mt-24 mx-auto max-w-5xl space-y-32">
          {pageContent.serviceList.map((service, index) => (
            <section key={index} className="scroll-mt-24" id={service.name.en.toLowerCase().replace(/\s+/g, '-')}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
                  <div className="lg:col-span-7">
                    <div className="inline-block bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
                        {language === 'en' ? 'Our Expertise' : 'ہماری مہارت'}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">{service.name[language]}</h2>
                    <div className="text-lg text-muted-foreground space-y-6">
                        <p className="leading-relaxed">
                            {service.description[language]}
                        </p>
                        <ul className="space-y-3">
                            {(language === 'en' ? 
                                [
                                    "Premium Ziarat White & Black Granite",
                                    "Custom Urdu/Arabic Calligraphy for Global Clients",
                                    "International Shipping & Secure Packaging",
                                    "Mirror-finish Edge Polishing"
                                ] : 
                                [
                                    "پریمیم زیارت وائٹ اور بلیک گرینائٹ",
                                    "عالمی کلائنٹس کے لیے کسٹم اردو اور عربی خطاطی",
                                    "بین الاقوامی شپنگ اور محفوظ پیکیجنگ",
                                    "مرر فنش ایج پالشنگ"
                                ]
                            ).map((item, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                                    <CheckCircle2 className="h-4 w-4 text-primary" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4">
                        <Button asChild size="lg" className="shadow-md">
                            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                                <MessageCircle className="mr-2 h-5 w-5" />
                                {language === 'en' ? 'Request Pricing' : 'قیمت معلوم کریں'}
                            </a>
                        </Button>
                        <Button asChild variant="outline" size="lg">
                            <Link href="/faq">
                                <HelpCircle className="mr-2 h-5 w-5" />
                                {language === 'en' ? 'View FAQ' : 'سوالات دیکھیں'}
                            </Link>
                        </Button>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative">
                    <Carousel 
                        className="w-full"
                        opts={{
                            align: "start",
                            loop: true,
                        }}
                    >
                        <CarouselContent>
                            {service.images.map((img, imgIndex) => (
                            <CarouselItem key={imgIndex}>
                                <div className="p-1">
                                    <Card className="overflow-hidden shadow-xl border-none">
                                        <CardContent className="relative flex aspect-[4/5] items-center justify-center p-0">
                                            <Image
                                                src={img.src}
                                                alt={`${img.alt} - Premium work by Stylish Marble Art`}
                                                data-ai-hint={img.hint}
                                                fill
                                                className="object-cover"
                                                sizes="(max-width: 768px) 100vw, 40vw"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4">
                                                <p className="text-white text-xs font-bold uppercase tracking-wider opacity-80">{img.alt}</p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                            ))}
                        </CarouselContent>
                        <div className="absolute -bottom-10 right-0 flex gap-2">
                            <CarouselPrevious className="static translate-y-0" />
                            <CarouselNext className="static translate-y-0" />
                        </div>
                    </Carousel>
                  </div>
              </div>

              {index < pageContent.serviceList.length - 1 && <Separator className="mt-32 opacity-50" />}
            </section>
          ))}
        </div>

        {/* Our Process Section */}
        <section className="mt-40 py-20 bg-secondary/20 rounded-[3rem] px-8 md:px-16">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{pageContent.processTitle[language]}</h2>
                <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{language === 'en' ? 'From global inquiry to doorstep delivery, we ensure transparency and excellence.' : 'عالمی انکوائری سے لے کر دہلیز تک پہنچانے تک، ہم شفافیت اور فضیلت کو یقینی بناتے ہیں۔'}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {pageContent.processSteps.map((step, i) => (
                    <Card key={i} className="bg-background/50 border-none shadow-sm hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle className="text-xl text-primary">{step.title[language]}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground">{step.description[language]}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </section>

        {/* CTA Section */}
        <div className="mt-32 text-center bg-primary text-primary-foreground py-16 rounded-3xl shadow-2xl overflow-hidden relative">
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <Image src="/SMAHeader.png" alt="Background pattern" fill className="object-cover grayscale" />
            </div>
            <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6">{language === 'en' ? 'Ready to Start Your Global Project?' : 'کیا آپ اپنا عالمی منصوبہ شروع کرنے کے لیے تیار ہیں؟'}</h2>
                <p className="mb-10 text-primary-foreground/80 max-w-xl mx-auto">
                    {language === 'en' 
                        ? 'Contact the most trusted stonemasons for a detailed quote on gravestones, kitchen marble, or custom engraving, delivered anywhere in the world.' 
                        : 'قبر کے کتبوں، کچن ماربل، یا کسٹم کندہ کاری کے بارے میں تفصیلی کوٹیشن کے لیے سب سے قابل اعتماد سنگ تراشوں سے رابطہ کریں، جو دنیا میں کہیں بھی پہنچایا جاتا ہے۔'}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Button asChild size="lg" variant="secondary" className="px-10 rounded-full font-bold">
                        <a href={`tel:${phone}`}>
                            <Phone className="mr-2 h-5 w-5" />
                            {language === 'en' ? 'Call +92-308-3401606' : 'کال کریں'}
                        </a>
                    </Button>
                    <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 border-none text-white px-10 rounded-full font-bold">
                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="mr-2 h-5 w-5" />
                            {language === 'en' ? 'WhatsApp Now' : 'واٹس ایپ کریں'}
                        </a>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
