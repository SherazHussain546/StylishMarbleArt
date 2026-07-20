'use client';

import { useLanguage } from '@/contexts/language-context';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, CheckCircle2, MessageCircle, Quote, Award, Globe, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

export default function ReviewsPageClient() {
  const { language } = useLanguage();

  const reviews = [
    {
      name: 'Ahmed Farooq',
      location: language === 'en' ? 'Karachi, Pakistan' : 'کراچی، پاکستان',
      service: language === 'en' ? 'Family Monument' : 'خاندانی یادگار',
      title: language === 'en' ? 'Exceptional quality for my father\'s gravestone' : 'والد کے کتبے کے لیے غیر معمولی معیار',
      body: language === 'en' 
        ? 'We had a gravestone made for my late father. The team at Stylish Marble Art handled everything with such care and respect. The Ziarat White marble quality was exceptional.' 
        : 'ہم نے اپنے مرحوم والد کے لیے ایک کتبہ بنوایا۔ سٹائلش ماربل آرٹ کی ٹیم نے ہر چیز کو بڑی احتیاط اور احترام کے ساتھ سنبھالا۔ زیارت وائٹ ماربل کا معیار غیر معمولی تھا۔',
      featured: true,
      initials: 'AF'
    },
    {
      name: 'Fatima Al-Rashidi',
      location: language === 'en' ? 'Expat Client, Dubai' : 'دبئی، متحدہ عرب امارات',
      service: language === 'en' ? 'Global Delivery' : 'عالمی ترسیل',
      title: language === 'en' ? 'Excellent international service' : 'بہترین بین الاقوامی سروس',
      body: language === 'en' 
        ? 'Ordered a custom headstone from Dubai for our family plot in Karachi. The communication process was seamless and the team updated us every step.' 
        : 'دبئی سے کراچی میں ہمارے خاندانی پلاٹ کے لیے ایک کسٹم کتبے کا آرڈر دیا۔ رابطے کا عمل ہموار تھا اور ٹیم نے ہمیں ہر قدم پر اپ ڈیٹ کیا۔',
      initials: 'FA'
    },
    {
      name: 'Mohammad Bilal',
      location: 'DHA Phase 6, Karachi',
      service: language === 'en' ? 'Home Interiors' : 'گھریلو انٹیریئر',
      title: language === 'en' ? 'Stunning kitchen installation' : 'شاندار کچن کی تنصیب',
      body: language === 'en' 
        ? 'Got my kitchen countertops done in Peshawar White marble. Professional team, clean work, and the seamless edge finish is absolutely stunning.' 
        : 'پشاور وائٹ ماربل میں اپنے کچن کے کاؤنٹر ٹاپس بنوائے۔ پیشہ ور ٹیم، صاف ستھرا کام، اور کناروں کی فنشنگ بالکل شاندار ہے۔',
      initials: 'MB'
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      {/* Hero Section */}
      <section className="bg-[#111] text-white py-20 px-4 relative overflow-hidden border-b-2 border-[#b8975a]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#b8975a_0%,_transparent_70%)]"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge className="bg-[#b8975a]/20 text-[#d4b07a] border-[#b8975a]/40 mb-6 uppercase tracking-widest px-4 py-1">
            {language === 'en' ? 'Verified Testimonials' : 'تصدیق شدہ تاثرات'}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
            {language === 'en' ? 'Real Stories of ' : 'اصلی کہانیاں ' }
            <em className="text-[#b8975a] not-italic">{language === 'en' ? 'Premium Craftsmanship' : 'بہترین کاریگری'}</em>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {language === 'en' 
                ? 'Read honest feedback from over 500+ families and developers who entrust their legacies to us.' 
                : '500 سے زیادہ خاندانوں اور ڈویلپرز کے ایماندارانہ تاثرات پڑھیں جو اپنی میراث ہمیں سونپتے ہیں۔'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-12 mb-24">
        {/* Aggregate Score Card */}
        <Card className="bg-white shadow-2xl rounded-2xl border-[#e0d8cc] p-8 md:p-12 mb-16 overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                <div className="text-center lg:border-r border-gray-100 pr-8">
                    <div className="text-7xl font-bold text-[#111] leading-none mb-4 tracking-tighter">4.9</div>
                    <div className="flex justify-center gap-1 text-[#f5a623] mb-4">
                        {[...Array(5)].map((_, i) => <Star key={i} className="fill-current h-6 w-6" />)}
                    </div>
                    <div className="text-sm text-gray-500 font-bold uppercase tracking-widest">
                        537 {language === 'en' ? 'Verified Reviews' : 'تصدیق شدہ جائزے'}
                    </div>
                </div>
                <div className="space-y-4">
                    {[5, 4, 3].map((star) => (
                        <div key={star} className="flex items-center gap-4">
                            <span className="text-xs font-bold text-gray-400 w-12">{star} {language === 'en' ? 'Star' : 'ستارہ'}</span>
                            <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-[#b8975a] to-[#f5a623]" style={{ width: star === 5 ? '92%' : star === 4 ? '6%' : '2%' }}></div>
                            </div>
                            <span className="text-xs font-bold text-gray-400 w-8">{star === 5 ? '92%' : star === 4 ? '6%' : '2%'}</span>
                        </div>
                    ))}
                </div>
                <div className="space-y-4">
                    <div className="bg-[#f5f0e8] border border-[#e0d8cc] p-4 rounded-xl flex items-center justify-between">
                        <span className="text-sm font-bold text-[#111]">{language === 'en' ? 'Google Verified' : 'گوگل تصدیق شدہ'}</span>
                        <span className="text-xs text-gray-500">4.9/5.0</span>
                    </div>
                    <div className="bg-[#f5f0e8] border border-[#e0d8cc] p-4 rounded-xl flex items-center justify-between">
                        <span className="text-sm font-bold text-[#111]">{language === 'en' ? 'Client Trust Index' : 'کلائنٹ ٹرسٹ انڈیکس'}</span>
                        <span className="text-xs text-green-600 font-bold">100% Verified</span>
                    </div>
                </div>
            </div>
        </Card>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((rev, i) => (
                <Card key={i} className={cn(
                    "group transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border-[#e0d8cc] p-8 flex flex-col gap-6",
                    rev.featured && "md:col-span-2 bg-gradient-to-br from-[#111] to-[#2c2c2c] text-white border-[#b8975a]/40"
                )}>
                    <div className="flex justify-between items-start">
                        <div className="flex gap-0.5 text-[#f5a623]">
                            {[...Array(5)].map((_, j) => <Star key={j} className="fill-current h-4 w-4" />)}
                        </div>
                        <Badge variant="outline" className={cn(
                            "bg-[#b8975a]/10 text-[#b8975a] border-[#b8975a]/20 uppercase text-[10px] font-bold tracking-wider",
                            rev.featured && "bg-[#b8975a]/20 text-[#d4b07a] border-[#b8975a]/40"
                        )}>
                            {rev.service}
                        </Badge>
                    </div>
                    <div className="space-y-4 flex-grow">
                        {rev.featured && <Quote className="h-8 w-8 text-[#b8975a] opacity-30" />}
                        <h3 className={cn("text-xl font-bold font-serif text-[#111]", rev.featured && "text-white text-2xl")}>
                            {rev.title}
                        </h3>
                        <p className={cn("text-gray-600 leading-relaxed", rev.featured && "text-gray-300 text-lg")}>
                            {rev.body}
                        </p>
                    </div>
                    <div className={cn("pt-6 border-t border-gray-100 flex items-center gap-4", rev.featured && "border-white/10")}>
                        <div className={cn("h-10 w-10 rounded-full bg-[#f5f0e8] text-[#111] flex items-center justify-center font-bold", rev.featured && "bg-[#b8975a] text-black")}>
                            {rev.initials}
                        </div>
                        <div>
                            <div className={cn("text-sm font-bold text-[#111]", rev.featured && "text-white")}>{rev.name}</div>
                            <div className={cn("text-xs text-gray-500", rev.featured && "text-gray-400")}>{rev.location}</div>
                        </div>
                        <div className="ml-auto flex items-center gap-1 text-green-600 font-bold text-[10px] uppercase">
                            <CheckCircle2 className="h-3 w-3" />
                            {language === 'en' ? 'Verified' : 'تصدیق شدہ'}
                        </div>
                    </div>
                </Card>
            ))}
        </div>

        {/* Trust Metrics Section */}
        <section className="mt-24 bg-[#111] rounded-3xl p-12 border border-[#b8975a]/20 text-center">
            <h2 className="text-3xl font-bold text-white mb-2 font-serif">
                {language === 'en' ? 'Why Global Families Trust Us' : 'عالمی خاندان ہم پر کیوں بھروسہ کرتے ہیں'}
            </h2>
            <p className="text-gray-500 mb-12 uppercase tracking-widest text-xs font-bold">
                Serving since 1970 with elite precision
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                    { icon: Award, t: {en: '50+ Years Elite Standing', ur: '50+ سال کا شاندار ریکارڈ'}, d: {en: 'Passed through generations of master stonemasons.', ur: 'سنگ تراشوں کی نسلوں سے منتقل ہونے والی مہارت۔'} },
                    { icon: ShieldCheck, t: {en: 'A-Grade Pure Sourcing', ur: 'اے گریڈ خالص مواد'}, d: {en: 'Only premium-cut Ziarat White and Black Granite.', ur: 'صرف پریمیم زیارت وائٹ اور بلیک گرینائٹ کا استعمال۔'} },
                    { icon: Globe, t: {en: 'Global Ummah Support', ur: 'عالمی امت کی خدمت'}, d: {en: 'Seamless logistics for overseas Pakistani families.', ur: 'سمندر پار پاکستانی خاندانوں کے لیے بہترین ترسیل۔'} }
                ].map((item, idx) => (
                    <div key={idx} className="p-8 rounded-2xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                        <div className="h-12 w-12 bg-[#b8975a]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <item.icon className="h-6 w-6 text-[#b8975a]" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">{item.t[language]}</h3>
                        <p className="text-gray-400 text-sm leading-relaxed">{item.d[language]}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* CTA Section */}
        <section className="mt-24 text-center max-w-2xl mx-auto space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-[#111] font-serif">
                {language === 'en' ? 'Have You Handled a Project With Us?' : 'کیا آپ نے ہمارے ساتھ کام کیا ہے؟'}
            </h2>
            <p className="text-gray-500 text-lg">
                {language === 'en' 
                    ? 'Your reviews assist families worldwide in making confident choices for their loved ones.' 
                    : 'آپ کے جائزے دنیا بھر کے خاندانوں کو اپنے پیاروں کے لیے پراعتماد فیصلے کرنے میں مدد دیتے ہیں۔'}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-[#b8975a] hover:bg-[#d4b07a] text-black font-bold rounded-none h-14 px-10">
                    <a href="https://wa.me/923083401606" target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-2 h-5 w-5" />
                        {language === 'en' ? 'Leave a WhatsApp Review' : 'واٹس ایپ پر رائے دیں'}
                    </a>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-2 border-[#111] text-[#111] font-bold rounded-none h-14 px-10 hover:bg-[#111] hover:text-white transition-colors">
                    <Link href="/contact">
                        {language === 'en' ? 'Contact Workshop' : 'ورکشاپ سے رابطہ کریں'}
                    </Link>
                </Button>
            </div>
        </section>
      </main>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}