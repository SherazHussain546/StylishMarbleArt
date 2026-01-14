
'use client';

import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart } from 'lucide-react';

export default function DonatePageClient() {
  const { language } = useLanguage();
  // NOTE: Replace this with your actual Stripe Payment Link
  const stripePaymentLink = 'https://donate.stripe.com/placeholder';

  const content = {
    title: {
      en: 'Support Our Community This Ramadan',
      ur: 'اس رمضان میں ہماری کمیونٹی کی مدد کریں',
    },
    subtitle: {
      en: 'Your contribution will help us provide Iftar meals and essential aid to families in need across Pakistan during this month of blessings.',
      ur: 'آپ کا تعاون ہمیں اس مبارک مہینے میں پورے پاکستان میں ضرورت مند خاندانوں کو افطار کے کھانے اور ضروری امداد فراہم کرنے میں مدد دے گا۔',
    },
    cardTitle: {
      en: 'Make a Donation',
      ur: 'عطیہ کریں',
    },
    cardDescription: {
      en: 'Click the button below to donate securely with Stripe. You can choose any amount in USD. Every donation, big or small, makes a difference.',
      ur: 'اسٹرائپ کے ساتھ محفوظ طریقے سے عطیہ کرنے کے لیے نیچے دیے گئے بٹن پر کلک کریں۔ آپ USD میں کوئی بھی رقم منتخب کر سکتے ہیں۔ ہر عطیہ، چاہے چھوٹا ہو یا بڑا، ایک فرق ڈالتا ہے۔',
    },
    buttonText: {
      en: 'Donate Now with Stripe',
      ur: 'اسٹرائپ کے ساتھ ابھی عطیہ کریں',
    },
    thankYou: {
      en: 'Thank you for your generosity.',
      ur: 'آپ کی فراخدلی کا شکریہ۔',
    }
  };

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{content.title[language]}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{content.subtitle[language]}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="relative h-96 w-full overflow-hidden rounded-lg shadow-xl">
            <Image
              src="https://placehold.co/600x400/0E4424/FFFFFF?text=Giving"
              alt="A conceptual image representing charity and community during Ramadan"
              data-ai-hint="charity community"
              fill
              className="object-cover"
            />
          </div>
          <Card className="flex flex-col items-center justify-center text-center">
            <CardHeader>
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="mt-4 text-3xl">{content.cardTitle[language]}</CardTitle>
              <CardDescription className="text-md leading-relaxed">
                {content.cardDescription[language]}
              </CardDescription>
            </CardHeader>
            <CardContent className="w-full px-6 pb-6">
              <Button asChild size="lg" className="w-full text-lg py-7">
                <Link href={stripePaymentLink} target="_blank" rel="noopener noreferrer">
                  {content.buttonText[language]}
                </Link>
              </Button>
              <p className="mt-4 text-sm text-muted-foreground">{content.thankYou[language]}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
