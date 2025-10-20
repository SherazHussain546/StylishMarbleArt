
'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { GoogleMap } from '@/components/google-map';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WhatsappStickyIcon } from '@/components/icons/whatsapp-sticky-icon';
import { ContactForm } from './contact-form';
import { MessageCircle } from 'lucide-react';

export default function ContactPageClient() {
  const { language } = useLanguage();
  const pageContent = content.contactPage;
  const address = "V5HR+38 Ghazi Dawood Brohi Goth, Karachi, Pakistan";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;
  const phone = content.contactPage.contactInfo.phone.en;
  const email = content.contactPage.contactInfo.email.en;
  const whatsappNumber = phone.replace(/\D/g, '');

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{pageContent.title[language]}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{pageContent.description[language]}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Contact Actions */}
          <Card>
             <CardHeader>
                <CardTitle className="text-3xl">{language === 'en' ? 'Contact Us Directly' : 'ہم سے براہ راست رابطہ کریں'}</CardTitle>
                <CardDescription>{language === 'en' ? 'Choose your preferred way to get in touch.' : 'رابطہ کرنے کے لیے اپنا پسندیدہ طریقہ منتخب کریں۔'}</CardDescription>
             </CardHeader>
             <CardContent className="flex flex-col space-y-4 pt-6">
                <Button asChild size="lg" className="w-full text-base py-6">
                    <a href={`tel:${phone.replace(/\s/g, '')}`}>
                        <Phone className="mr-4 h-6 w-6" />
                        {language === 'en' ? 'Call Us' : 'کال کریں'}
                    </a>
                </Button>
                <Button asChild size="lg" variant="outline" className="w-full text-base py-6 bg-green-500 text-white hover:bg-green-600 hover:text-white border-green-500">
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                        <MessageCircle className="mr-4 h-6 w-6" />
                        {language === 'en' ? 'WhatsApp' : 'واٹس ایپ'}
                    </a>
                </Button>
                 <Button asChild size="lg" variant="outline" className="w-full text-base py-6">
                    <a href={`mailto:${email}`}>
                        <Mail className="mr-4 h-6 w-6" />
                        {language === 'en' ? 'Email Us' : 'ای میل کریں'}
                    </a>
                </Button>
             </CardContent>
          </Card>

          {/* Right Column: Location & Visit */}
          <Card className="flex flex-col">
             <CardHeader>
              <CardTitle className="text-3xl">{language === 'en' ? 'Visit Our Workshop' : 'ہماری ورکشاپ پر تشریف لائیں'}</CardTitle>
              <CardDescription>{language === 'en' ? 'See our craftsmanship in person.' : 'ہماری دستکاری کو خود دیکھیں۔'}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col space-y-4">
                <div className="flex items-start gap-4 text-muted-foreground">
                    <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                    <p className="not-italic">
                    {pageContent.contactInfo.address[language]}
                    </p>
                </div>
                <div className="flex-grow h-64 w-full overflow-hidden rounded-lg shadow-md mt-4">
                    <GoogleMap />
                </div>
                 <Button asChild size="lg" className="w-full mt-auto text-base py-6" variant="outline">
                  <Link href={directionsUrl} target="_blank" rel="noopener noreferrer">
                    <MapPin className="mr-4 h-6 w-6" />
                     <div>
                        <p className="font-semibold">{language === 'en' ? 'Get Directions' : 'ہدایات حاصل کریں'}</p>
                        <p className="text-sm font-normal text-muted-foreground/80">{language === 'en' ? 'Open in Google Maps' : 'گوگل میپس میں کھولیں'}</p>
                    </div>
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
