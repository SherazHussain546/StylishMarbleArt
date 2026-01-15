
'use client';

import { useLanguage } from '@/contexts/language-context';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Heart, Users, UtensilsCrossed, Phone, Mail, MessageCircle, Package, Gift, Landmark } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';
import { useState } from 'react';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export default function DonatePageClient() {
  const { language } = useLanguage();
  const stripePaymentLink = 'https://donate.stripe.com/placeholder';
  const phone = '+923083401606';
  const whatsappNumber = phone.replace(/\D/g, '');
  const email = 'stylishmarbleart2020@gmail.com';
  
  const [totalDonated, setTotalDonated] = useState(150);

  const content = {
    title: {
      en: 'Share Your Blessings This Ramadan',
      ur: 'اس رمضان میں اپنی برکتیں بانٹیں',
    },
    subtitle: {
      en: 'In this month of mercy, your Zakat and Sadaqa can bring hope and relief to families in need across Pakistan. Every contribution, no matter how small, is a powerful act of kindness.',
      ur: 'رحمت کے اس مہینے میں، آپ کی زکوٰۃ اور صدقہ پورے پاکستان میں ضرورت مند خاندانوں کے لیے امید اور راحت کا باعث بن سکتا ہے۔ ہر تعاون، چاہے چھوٹا ہو یا بڑا، نیکی کا ایک طاقتور عمل ہے۔',
    },
    cardTitle: {
      en: 'Give with a Pure Heart',
      ur: 'صاف دل سے دیں',
    },
    cardDescription: {
      en: 'Click the button below to donate securely with Stripe. You can contribute any amount you wish in USD, starting from just $1. Your generosity will directly support our Ramadan outreach programs.',
      ur: 'اسٹرائپ کے ساتھ محفوظ طریقے سے عطیہ کرنے کے لیے نیچے دیے گئے بٹن پر کلک کریں۔ آپ USD میں کوئی بھی رقم، صرف $1 سے شروع کر سکتے ہیں۔ آپ کی سخاوت براہ راست ہمارے رمضان کے امدادی پروگراموں کی حمایت کرے گی۔',
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
    timelineTitle: {
        en: 'Our Ramadan 2024 Journey',
        ur: 'ہمارا رمضان ۲۰۲۴ کا سفر',
    },
    timeline: [
        {
            icon: UtensilsCrossed,
            title: { en: 'First Week Goal', ur: 'پہلے ہفتے کا ہدف' },
            amount: 250,
            description: { en: 'Host a public Iftar on the road, offering a warm meal to anyone in need, including travelers and daily wage workers.', ur: 'سڑک پر ایک عوامی افطار کا اہتمام کریں، جس میں مسافروں اور دیہاڑی دار مزدوروں سمیت ہر ضرورت مند کو گرم کھانا پیش کیا جائے۔' },
        },
        {
            icon: Package,
            title: { en: 'First Ashra Goal', ur: 'پہلا عشرہ کا ہدف' },
            amount: 750,
            description: { en: 'In the first 10 days of mercy, we will distribute essential food ration packs to sustain families through the holy month.', ur: 'رحمت کے پہلے 10 دنوں میں، ہم مقدس مہینے میں خاندانوں کو سہارا دینے کے لیے ضروری راشن پیک تقسیم کریں گے۔' },
        },
        {
            icon: Gift,
            title: { en: 'Second Ashra Goal', ur: 'دوسرا عشرہ کا ہدف' },
            amount: 1000,
            description: { en: 'During the 10 days of forgiveness, we will share joy by providing new Eid clothes to children and families in need.', ur: 'بخشش کے 10 دنوں کے دوران، ہم ضرورت مند بچوں اور خاندانوں کو عید کے نئے کپڑے فراہم کرکے خوشیاں بانٹیں گے۔' },
        },
        {
            icon: Landmark,
            title: { en: 'Third Ashra Goal', ur: 'تیسرا عشرہ کا ہدف' },
            amount: 750,
            description: { en: 'In the last 10 days, we aim to provide nutritious meals to those observing Itikaf in local mosques, supporting their devotion.', ur: 'آخری 10 دنوں میں، ہمارا مقصد مقامی مساجد میں اعتکاف کرنے والوں کو ان کی عبادت میں مدد کے لیے غذائیت سے بھرپور کھانا فراہم کرنا ہے۔' },
        }
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
  
  const totalGoal = content.timeline.reduce((sum, goal) => sum + goal.amount, 0);

  const getProgress = (goalAmount: number, accumulatedDonations: number) => {
    return Math.min((accumulatedDonations / goalAmount) * 100, 100);
  };
  
  let accumulatedDonations = totalDonated;
  let accumulatedGoals = 0;

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

            <div className="mt-24 max-w-5xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold tracking-tight">{content.timelineTitle[language]}</h2>
                </div>

                <Card className="mb-8 p-6 shadow-lg">
                    <Label htmlFor="donation-slider" className="text-lg font-semibold">{language === 'en' ? 'Simulate Donations' : 'عطیات کی تقلید کریں'}</Label>
                    <p className="text-sm text-muted-foreground mb-4">{language === 'en' ? 'Drag the slider to see how the goals progress as more donations come in.' : 'ڈریگ کریں کہ مزید عطیات آنے پر اہداف کیسے آگے بڑھتے ہیں۔'}</p>
                    <div className="flex items-center gap-4">
                        <Slider
                            id="donation-slider"
                            min={0}
                            max={totalGoal}
                            step={50}
                            value={[totalDonated]}
                            onValueChange={(value) => setTotalDonated(value[0])}
                        />
                        <span className="font-bold text-primary text-lg whitespace-nowrap">
                            ${totalDonated}
                        </span>
                    </div>
                </Card>

                <div className="relative">
                    <div className="absolute left-1/2 w-0.5 h-full bg-border -translate-x-1/2 hidden md:block"></div>
                    <div className="space-y-16">
                        {content.timeline.map((item, index) => {
                            const Icon = item.icon;
                            const isEven = index % 2 === 0;

                            const goalProgress = getProgress(item.amount, Math.max(0, totalDonated - accumulatedGoals));
                            const raisedAmount = Math.min(item.amount, Math.max(0, totalDonated - accumulatedGoals));
                            accumulatedGoals += item.amount;
                            
                            return (
                                <div key={index} className="relative flex flex-col md:flex-row items-center gap-8">
                                    <div className={`flex-1 ${isEven ? 'md:order-last' : ''}`}>
                                        <Card className="shadow-lg">
                                            <CardContent className="p-6">
                                                <div className="flex items-start gap-4">
                                                    <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                        <Icon className="h-7 w-7" />
                                                    </div>
                                                    <div>
                                                        <h3 className="font-bold text-lg text-primary">{item.title[language]}</h3>
                                                        <p className="mt-1 text-muted-foreground">{item.description[language]}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4">
                                                    <Progress value={goalProgress} className="h-3" />
                                                    <div className="mt-2 flex justify-between text-sm font-medium text-muted-foreground">
                                                        <span>{language === 'en' ? 'Raised:' : 'جمع:'} ${Math.round(raisedAmount)}</span>
                                                        <span>{language === 'en' ? 'Goal:' : 'ہدف:'} ${item.amount}</span>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </div>
                                    <div className="absolute left-1/2 top-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background -translate-x-1/2 -translate-y-1/2 hidden md:block"></div>
                                    <div className="flex-1 hidden md:block"></div>
                                </div>
                            );
                        })}
                    </div>
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
