
'use client';

import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, Users, UtensilsCrossed } from 'lucide-react';

export default function DonatePageClient() {
  const { language } = useLanguage();
  const stripePaymentLink = 'https://donate.stripe.com/placeholder';

  const content = {
    title: {
      en: 'Share Your Blessings This Ramadan',
      ur: 'اس رمضان میں اپنی برکتیں بانٹیں',
    },
    subtitle: {
      en: 'In this month of mercy, your Zakat and Sadaqa can bring hope and relief to families in need across Pakistan. Every contribution, no matter the size, is a powerful act of kindness.',
      ur: 'رحمت کے اس مہینے میں، آپ کی زکوٰۃ اور صدقہ پورے پاکستان میں ضرورت مند خاندانوں کے لیے امید اور راحت کا باعث بن سکتا ہے۔ ہر تعاون، چاہے چھوٹا ہو یا بڑا، نیکی کا ایک طاقتور عمل ہے۔',
    },
    cardTitle: {
      en: 'Give with a Pure Heart',
      ur: 'صاف دل سے دیں',
    },
    cardDescription: {
      en: 'Click the button below to donate securely with Stripe. You can contribute any amount in USD, starting from just $1. Your generosity will directly provide Iftar meals and essential food packs to those who need them most.',
      ur: 'اسٹرائپ کے ساتھ محفوظ طریقے سے عطیہ کرنے کے لیے نیچے دیے گئے بٹن پر کلک کریں۔ آپ USD میں کوئی بھی رقم، صرف $1 سے شروع کر سکتے ہیں۔ آپ کی سخاوت براہ راست ان لوگوں کو افطار کے کھانے اور ضروری فوڈ پیک فراہم کرے گی جنہیں اس کی سب سے زیادہ ضرورت ہے۔',
    },
    buttonText: {
      en: 'Donate Securely via Stripe',
      ur: 'اسٹرائپ کے ذریعے محفوظ طریقے سے عطیہ کریں',
    },
    thankYou: {
      en: 'May your generosity be rewarded abundantly. Thank you.',
      ur: 'اللہ آپ کو اس سخاوت کا بہترین اجر عطا فرمائے۔ شکریہ۔',
    },
    causesTitle: {
        en: 'How Your Donation Helps',
        ur: 'آپ کا عطیہ کیسے مدد کرتا ہے۔'
    },
    causes: [
        {
            icon: UtensilsCrossed,
            title: { en: 'Sponsor Iftar Meals', ur: 'افطار کے کھانے اسپانسر کریں' },
            description: { en: 'Your contribution can provide hot, nutritious Iftar meals for individuals and families to break their fast.', ur: 'آپ کا تعاون افراد اور خاندانوں کو روزہ افطار کرنے کے لیے گرم، غذائیت سے بھرپور افطار فراہم کر سکتا ہے۔' },
        },
        {
            icon: Users,
            title: { en: 'Family Food Packs', ur: 'فیملی فوڈ پیکس' },
            description: { en: 'Help us deliver essential grocery packs with items like flour, rice, oil, and dates to sustain a family for weeks.', ur: 'آٹے، چاول، تیل اور کھجور جیسی ضروری اشیاء پر مشتمل گروسری پیک فراہم کرنے میں ہماری مدد کریں جو ایک خاندان کو ہفتوں تک برقرار رکھ سکیں۔' },
        },
        {
            icon: Heart,
            title: { en: 'General Sadaqa', ur: 'عمومی صدقہ' },
            description: { en: 'Your general donations will be used where the need is greatest, ensuring aid reaches the most vulnerable communities.', ur: 'آپ کے عمومی عطیات وہاں استعمال کیے جائیں گے جہاں سب سے زیادہ ضرورت ہو، اس بات کو یقینی بناتے ہوئے کہ امداد سب سے زیادہ کمزور کمیونٹیز تک پہنچے۔' },
        },
    ]
  };

  return (
    <>
    <div className="relative bg-secondary/50 py-24 md:py-32">
        <Image
            src="https://images.unsplash.com/photo-1521483451569-e33803c0330c?q=80&w=1887&auto=format&fit=crop"
            alt="Community sharing food during a Ramadan Iftar, symbolizing charity and togetherness"
            data-ai-hint="charity community"
            fill
            className="object-cover object-center z-0 opacity-20"
            priority
        />
        <div className="container relative z-10 mx-auto px-4 text-center">
            <div className="mx-auto max-w-4xl">
            <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl lg:text-6xl">{content.title[language]}</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">{content.subtitle[language]}</p>
            </div>
        </div>
    </div>
    <div className="bg-background py-16 sm:py-24">
        <div className="container mx-auto px-4">
             <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
                <div className="lg:order-last">
                    <Card className="flex flex-col items-center justify-center text-center shadow-2xl">
                        <CardHeader>
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                            <Heart className="h-8 w-8 text-primary" />
                        </div>
                        <CardTitle className="mt-4 text-3xl">{content.cardTitle[language]}</CardTitle>
                        <CardDescription className="text-md leading-relaxed px-4">
                            {content.cardDescription[language]}
                        </CardDescription>
                        </CardHeader>
                        <CardContent className="w-full px-6 pb-8">
                        <Button asChild size="lg" className="w-full text-lg py-7">
                            <Link href={stripePaymentLink} target="_blank" rel="noopener noreferrer">
                            {content.buttonText[language]}
                            </Link>
                        </Button>
                        <p className="mt-4 text-sm text-muted-foreground">{content.thankYou[language]}</p>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <h2 className="text-3xl font-bold tracking-tight text-center lg:text-left">{content.causesTitle[language]}</h2>
                    <ul className="space-y-6">
                        {content.causes.map((cause, index) => {
                            const Icon = cause.icon;
                            return (
                                <li key={index} className="flex gap-4 items-start">
                                    <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">{cause.title[language]}</h3>
                                        <p className="mt-1 text-muted-foreground">{cause.description[language]}</p>
                                    </div>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    </>
  );
}
