
'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MessageCircle, Phone, ArrowRight, HelpCircle, CheckCircle2, ShieldCheck, Clock, Plane, MapPin, Heart } from 'lucide-react';

export default function ServicesPageClient() {
  const { language } = useLanguage();
  const pageContent = content.servicesPage;
  const phone = content.contactPage.contactInfo.phone.en.replace(/\s/g, '');
  const whatsappNumber = phone.replace(/\D/g, '');
  
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
             <Button asChild variant="outline" size="lg" className="rounded-full px-8 border-primary text-primary hover:bg-primary hover:text-white">
                <Link href="/locator" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {language === 'en' ? 'Find Loved Ones Grave' : 'یادگار تلاش کنندہ'}
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

        {/* Highlight Section: Free Locator */}
        <div className="mt-20 bg-primary/5 rounded-[2rem] p-8 md:p-12 border border-primary/10 flex flex-col md:flex-row items-center gap-8 shadow-inner">
            <div className="bg-primary text-white p-6 rounded-2xl shadow-xl">
                <MapPin className="h-12 w-12" />
            </div>
            <div className="flex-grow text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                    {language === 'en' ? 'Digital Memorial Locator - Free for All' : 'ڈیجیٹل یادگار تلاش کنندہ - سب کے لیے مفت'}
                </h2>
                <p className="text-muted-foreground text-lg mb-6">
                    {language === 'en' 
                        ? 'Pin your loved one\'s grave location on our interactive map at no cost. Help your family find and visit their resting places easily, forever.' 
                        : 'اپنے پیارے کی قبر کا مقام ہمارے انٹرایکٹو نقشے پر بغیر کسی قیمت کے پن کریں۔ اپنے خاندان کو ہمیشہ کے لیے ان کی آرام گاہوں کو آسانی سے تلاش کرنے اور وہاں جانے میں مدد کریں۔'}
                </p>
                <Button asChild size="lg" className="rounded-full px-10">
                    <Link href="/locator">
                        {language === 'en' ? 'Start Pinning Now' : 'ابھی پن کرنا شروع کریں'}
                    </Link>
                </Button>
            </div>
        </div>

        {/* Why Choose Us / Trust Badges */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
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
                                    "Professional Grave Cleaning & Maintenance",
                                    "Scheduled Watering & Plant Care Services",
                                    "Custom Urdu/Arabic Calligraphy for Global Clients",
                                    "International Shipping & Secure Packaging"
                                ] : 
                                [
                                    "پریمیم زیارت وائٹ اور بلیک گرینائٹ",
                                    "قبر کی پیشہ ورانہ صفائی اور دیکھ بھال",
                                    "طے شدہ پانی دینے اور پودوں کی دیکھ بھال کی خدمات",
                                    "عالمی کلائنٹس کے لیے کسٹم اردو اور عربی خطاطی",
                                    "بین الاقوامی شپنگ اور محفوظ پیکیجنگ"
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
                                        <CardContent className="relative flex aspect-square items-center justify-center p-0">
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
