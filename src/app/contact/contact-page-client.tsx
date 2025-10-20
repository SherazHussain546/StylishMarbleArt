
'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { GoogleMap } from '@/components/google-map';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { WhatsappStickyIcon } from '@/components/icons/whatsapp-sticky-icon';

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
          {/* Left Column: Direct Contact Methods */}
          <Card className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-3xl">{language === 'en' ? 'Connect With Us Directly' : 'ہم سے براہ راست جڑیں'}</CardTitle>
              <CardDescription>{language === 'en' ? 'We are ready to assist you with your inquiries.' : 'ہم آپ کی پوچھ گچھ میں مدد کے لیے تیار ہیں۔'}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-grow flex-col items-center justify-center">
                <div className="space-y-4 w-full max-w-xs">
                    <Button asChild size="lg" className="w-full justify-start text-base py-6">
                        <a href={`tel:${phone.replace(/\s/g, '')}`}>
                            <Phone className="mr-4 h-6 w-6" />
                            <div>
                                <p className="font-semibold">{language === 'en' ? 'Call Us' : 'کال کریں'}</p>
                                <p className="text-sm font-normal text-primary-foreground/80">{pageContent.contactInfo.phone[language]}</p>
                            </div>
                        </a>
                    </Button>
                    <Button asChild size="lg" className="w-full justify-start text-base py-6" variant="secondary" style={{backgroundColor: '#E7FDEE', color: '#13872F'}}>
                        <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-4 h-6 w-6"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                            <div>
                                <p className="font-semibold">{language === 'en' ? 'WhatsApp Us' : 'واٹس ایپ کریں'}</p>
                                <p className="text-sm font-normal text-green-700/80">{language === 'en' ? 'Start a conversation' : 'گفتگو شروع کریں'}</p>
                            </div>
                        </a>
                    </Button>
                    <Button asChild size="lg" className="w-full justify-start text-base py-6">
                        <a href={`mailto:${email}`}>
                            <Mail className="mr-4 h-6 w-6" />
                            <div>
                                <p className="font-semibold">{language === 'en' ? 'Email Us' : 'ای میل کریں'}</p>
                                <p className="text-sm font-normal text-primary-foreground/80">{pageContent.contactInfo.email[language]}</p>
                            </div>
                        </a>
                    </Button>
                </div>
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
