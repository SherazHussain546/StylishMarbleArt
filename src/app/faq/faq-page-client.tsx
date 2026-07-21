'use client';

import { useLanguage } from '@/contexts/language-context';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { HelpCircle, MessageCircle, Clock, Truck, ShieldCheck, Gem } from 'lucide-react';
import Link from 'next/link';

export default function FAQPageClient() {
  const { language } = useLanguage();

  const faqs = [
    {
        icon: ShieldCheck,
        q: { en: 'What are the most durable stones for Karachi?', ur: 'کراچی کے لیے سب سے پائیدار پتھر کون سے ہیں؟' },
        a: { en: 'For gravestones in Karachi, we highly recommend Black Granite or Ziarat White marble. These stones are naturally resistant to the harsh sunlight and coastal humidity.', ur: 'کراچی میں کتبوں کے لیے، ہم بلیک گرینائٹ یا زیارت وائٹ ماربل کی سفارش کرتے ہیں۔ یہ پتھر قدرتی طور پر تیز دھوپ اور ساحلی نمی کے خلاف مزاحم ہیں۔' }
    },
    {
        icon: Clock,
        q: { en: 'How long does a custom headstone take?', ur: 'ایک کسٹم کتبہ کتنا وقت لیتا ہے؟' },
        a: { en: 'Typically, a standard headstone takes 7 to 10 working days. For complex laser-engraved designs, it may take 15 to 20 days.', ur: 'عام طور پر ایک معیاری کتبہ 7 سے 10 دن لیتا ہے۔ پیچیدہ لیزر ڈیزائن کے لیے 15 سے 20 دن لگ سکتے ہیں۔' }
    },
    {
        icon: Truck,
        q: { en: 'Do you provide international shipping?', ur: 'کیا آپ بین الاقوامی شپنگ فراہم کرتے ہیں؟' },
        a: { en: 'Yes, we provide expert international shipping with secure wooden crate packaging. We have successfully exported to the UK, USA, UAE, and Africa.', ur: 'جی ہاں، ہم محفوظ لکڑی کی پیکنگ کے ساتھ ماہرانہ بین الاقوامی شپنگ فراہم کرتے ہیں۔ ہم یو کے، امریکہ اور یو اے ای برآمد کر چکے ہیں۔' }
    },
    {
        icon: Gem,
        q: { en: 'Can I customize the calligraphy?', ur: 'کیا میں خطاطی کو تبدیل کر سکتا ہوں؟' },
        a: { en: 'Yes, absolutely. We specialize in custom Urdu, Arabic, and English calligraphy. We provide a digital preview for your approval before carving.', ur: 'جی ہاں، ہم کسٹم اردو، عربی اور انگریزی خطاطی میں مہارت رکھتے ہیں۔ ہم تراشنے سے پہلے ڈیجیٹل پری ویو فراہم کرتے ہیں۔' }
    }
  ];

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      {/* Header Section */}
      <section className="bg-[#111] text-white py-20 px-4 relative overflow-hidden border-b-2 border-[#b8975a]">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#b8975a_0%,_transparent_70%)]"></div>
        <div className="container mx-auto text-center relative z-10">
          <Badge className="bg-[#b8975a]/20 text-[#d4b07a] border-[#b8975a]/40 mb-6 uppercase tracking-widest px-4 py-1">
            {language === 'en' ? 'Expert Support' : 'ماہرانہ مدد'}
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">
            {language === 'en' ? 'How Can We ' : 'ہم آپ کی کیسے ' }
            <em className="text-[#b8975a] not-italic">{language === 'en' ? 'Assist You?' : 'مدد کر سکتے ہیں؟'}</em>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            {language === 'en' 
                ? 'Find answers to common questions about marble craftsmanship and international logistics.' 
                : 'ماربل کرافٹ مین شپ اور بین الاقوامی لاجسٹکس کے بارے میں عام سوالات کے جوابات تلاش کریں۔'}
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 -mt-12 mb-24">
        <div className="max-w-4xl mx-auto">
            <Card className="bg-white shadow-2xl rounded-2xl border-[#e0d8cc] overflow-hidden">
                <div className="p-8 md:p-12">
                    <Accordion type="single" collapsible className="space-y-4">
                        {faqs.map((faq, i) => (
                            <AccordionItem key={i} value={`item-${i}`} className="border-b border-gray-100 last:border-0 pb-2">
                                <AccordionTrigger className="hover:no-underline group py-6 text-left">
                                    <div className="flex items-center gap-6">
                                        <div className="h-10 w-10 rounded-xl bg-[#f5f0e8] flex items-center justify-center shrink-0 group-hover:bg-[#b8975a]/20 transition-colors">
                                            <faq.icon className="h-5 w-5 text-[#b8975a]" />
                                        </div>
                                        <span className="text-lg md:text-xl font-bold text-[#111] font-serif group-hover:text-[#b8975a] transition-colors leading-tight">
                                            {faq.q[language]}
                                        </span>
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-16 pr-4 pb-8">
                                    <p className="text-gray-600 text-lg leading-relaxed">
                                        {faq.a[language]}
                                    </p>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </Card>

            <div className="mt-20 text-center space-y-8">
                <div className="h-1 w-12 bg-[#b8975a] mx-auto rounded-full"></div>
                <h2 className="text-3xl font-bold text-[#111] font-serif">
                    {language === 'en' ? 'Still have specific questions?' : 'کیا آپ کے پاس مزید سوالات ہیں؟'}
                </h2>
                <p className="text-gray-500 text-lg max-w-lg mx-auto">
                    {language === 'en' 
                        ? 'Chat with our lead artisans in Karachi for personalized advice on your project.' 
                        : 'اپنے پروجیکٹ پر ذاتی مشورے کے لیے کراچی میں ہمارے ماہر کاریگروں سے بات کریں۔'}
                </p>
                <div className="pt-4 flex justify-center">
                    <Button asChild size="lg" className="bg-[#b8975a] hover:bg-[#d4b07a] text-black font-bold rounded-none h-14 px-10 shadow-xl">
                        <Link href="/contact" className="flex items-center gap-2">
                            <MessageCircle className="h-5 w-5" />
                            {language === 'en' ? 'Get a Personalized Quote' : 'ذاتی کوٹیشن حاصل کریں'}
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}
