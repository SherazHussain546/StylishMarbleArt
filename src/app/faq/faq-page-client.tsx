
'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { useMemo } from 'react';

export default function FAQPageClient() {
  const { language } = useLanguage();
  const pageContent = content.faqPage;

  // FAQ Schema Markup for Rich Results
  const faqSchema = useMemo(() => {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": pageContent.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question.en,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer.en
        }
      }))
    };
  }, [pageContent]);

  return (
    <div className="bg-secondary min-h-screen py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="container mx-auto px-4">
        <header className="mx-auto max-w-4xl text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-primary">{pageContent.title[language]}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{pageContent.description[language]}</p>
        </header>

        <div className="max-w-3xl mx-auto bg-background rounded-2xl shadow-lg p-8">
            <Accordion type="single" collapsible className="w-full">
                {pageContent.faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-0">
                        <AccordionTrigger className="text-lg font-semibold py-6 hover:text-primary transition-colors text-left">
                            {faq.question[language]}
                        </AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-base leading-relaxed pb-6">
                            {faq.answer[language]}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>
        </div>

        <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold mb-4">
                {language === 'en' ? 'Still have questions?' : 'کیا آپ کے مزید سوالات ہیں؟'}
            </h2>
            <p className="mb-8 text-muted-foreground">
                {language === 'en' ? 'Chat with us directly in Karachi for personalized advice.' : 'ذاتی مشورے کے لیے براہ راست ہم سے کراچی میں رابطہ کریں۔'}
            </p>
            <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/contact" className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    {language === 'en' ? 'Contact Us on WhatsApp' : 'واٹس ایپ پر رابطہ کریں'}
                </Link>
            </Button>
        </div>
      </div>
    </div>
  );
}
