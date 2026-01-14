
'use client';

import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, Users, UtensilsCrossed, Phone, Mail, MessageCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

export default function DonatePageClient() {
  const { language } = useLanguage();
  const stripePaymentLink = 'https://donate.stripe.com/placeholder';
  const phone = '+923083401606';
  const whatsappNumber = phone.replace(/\D/g, '');
  const email = 'stylishmarbleart2020@gmail.com';

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
    ],
    faqTitle: {
        en: 'Frequently Asked Questions',
        ur: 'اکثر پوچھے گئے سوالات',
    },
    faqs: [
        {
            question: { en: 'Is my donation secure?', ur: 'کیا میرا عطیہ محفوظ ہے؟' },
            answer: { en: 'Absolutely. We use Stripe, a global leader in online payments, to process all donations. Your financial information is encrypted and never touches our servers.', ur: 'بالکل۔ ہم تمام عطیات پر کارروائی کے لیے اسٹرائپ، آن لائن ادائیگیوں میں ایک عالمی رہنما، استعمال کرتے ہیں۔ آپ کی مالی معلومات انکرپٹڈ ہوتی ہیں اور ہمارے سرورز کو کبھی نہیں چھوتی ہیں۔' },
        },
        {
            question: { en: 'Can I donate in a currency other than USD?', ur: 'کیا میں USD کے علاوہ کسی اور کرنسی میں عطیہ کر سکتا ہوں؟' },
            answer: { en: 'Yes. While the amounts are shown in USD, Stripe will automatically handle the currency conversion from your local currency when you make the payment.', ur: 'جی ہاں۔ اگرچہ رقم USD میں دکھائی جاتی ہے، لیکن جب آپ ادائیگی کرتے ہیں تو اسٹرائپ خود بخود آپ کی مقامی کرنسی سے کرنسی کی تبدیلی کو سنبھال لے گا۔' },
        },
        {
            question: { en: 'Is this donation Zakat-eligible?', ur: 'کیا یہ عطیہ زکوٰۃ کے لیے اہل ہے؟' },
            answer: { en: 'Yes, your contribution can be considered as Zakat or Sadaqa. We ensure that 100% of your donation goes directly to providing food and aid to verified, eligible families in Pakistan. If you have specific questions, we recommend consulting with a religious scholar.', ur: 'جی ہاں، آپ کا تعاون زکوٰۃ یا صدقہ کے طور پر شمار کیا جا سکتا ہے۔ ہم اس بات کو یقینی بناتے ہیں کہ آپ کا 100% عطیہ براہ راست پاکستان میں تصدیق شدہ، اہل خاندانوں کو خوراک اور امداد فراہم کرنے کے لیے جاتا ہے۔ اگر آپ کے کوئی خاص سوالات ہیں، تو ہم ایک عالم دین سے مشورہ کرنے کی تجویز کرتے ہیں۔' },
        },
        {
            question: { en: 'Will I receive a receipt?', ur: 'کیا مجھے رسید ملے گی؟' },
            answer: { en: 'Yes, Stripe will automatically send a receipt to the email address you provide during the checkout process.', ur: 'جی ہاں، اسٹرائپ خود بخود آپ کو چیک آؤٹ کے عمل کے دوران فراہم کردہ ای میل ایڈریس پر ایک رسید بھیجے گا۔' },
        },
    ],
    helpTitle: {
        en: 'Need Help?',
        ur: 'مدد کی ضرورت ہے؟',
    },
    helpDescription: {
        en: 'If you have any questions or need assistance with your donation, please feel free to reach out to us.',
        ur: 'اگر آپ کے کوئی سوالات ہیں یا اپنے عطیہ کے سلسلے میں مدد کی ضرورت ہے، تو براہ کرم ہم سے رابطہ کرنے میں ہچکچاہٹ محسوس نہ کریں۔',
    },
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

            <div className="mt-24 max-w-4xl mx-auto">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight">{content.faqTitle[language]}</h2>
                </div>
                <Accordion type="single" collapsible className="w-full mt-8">
                    {content.faqs.map((faq, index) => (
                        <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg text-left">{faq.question[language]}</AccordionTrigger>
                            <AccordionContent className="text-base text-muted-foreground">
                                {faq.answer[language]}
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <div className="mt-24 text-center max-w-2xl mx-auto">
                 <h2 className="text-3xl font-bold tracking-tight">{content.helpTitle[language]}</h2>
                 <p className="mt-4 text-lg text-muted-foreground">{content.helpDescription[language]}</p>
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <a href={`tel:${phone.replace(/\s/g, '')}`}>
                            <Phone className="mr-2 h-5 w-5" />
                            {language === 'en' ? 'Call Us' : 'کال کریں'}
                        </a>
                    </Button>
                    <Button asChild size="lg" variant="outline" className="w-full sm:w-auto bg-green-500 text-white hover:bg-green-600 hover:text-white border-green-500">
                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                            <MessageCircle className="mr-2 h-5 w-5" />
                            {language === 'en' ? 'WhatsApp' : 'واٹس ایپ'}
                        </a>
                    </Button>
                     <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
                        <a href={`mailto:${email}`}>
                            <Mail className="mr-2 h-5 w-5" />
                            {language === 'en' ? 'Email Us' : 'ای میل کریں'}
                        </a>
                    </Button>
                </div>
            </div>
        </div>
      </div>
    </>
  );
}
