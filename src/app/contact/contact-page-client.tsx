
'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { GoogleMap } from '@/components/google-map';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
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

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">{pageContent.contactInfo.title[language]}</h2>
            <div className="space-y-4 text-lg">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <p className="not-italic text-muted-foreground">
                  {pageContent.contactInfo.address[language]}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 flex-shrink-0 text-primary" />
                <a href={`tel:${phone.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-primary">
                  {pageContent.contactInfo.phone[language]}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 flex-shrink-0 text-primary" />
                <a href={`mailto:${email}`} className="text-muted-foreground hover:text-primary">
                  {pageContent.contactInfo.email[language]}
                </a>
              </div>
            </div>
            <Button asChild size="lg">
              <Link href={directionsUrl} target="_blank" rel="noopener noreferrer">
                {language === 'en' ? 'Get Directions' : 'ہدایات حاصل کریں'}
                <ExternalLink className="ml-2 h-5 w-5" />
              </Link>
            </Button>
             <div className="mt-8 h-96 w-full overflow-hidden rounded-lg shadow-xl">
               <GoogleMap />
            </div>
          </div>
          
          <div className="flex flex-col items-center justify-center space-y-6 rounded-lg bg-card p-8 shadow-lg">
             <h2 className="text-3xl font-bold text-center">{language === 'en' ? 'Contact Us Directly' : 'ہم سے براہ راست رابطہ کریں'}</h2>
             <p className="text-muted-foreground text-center">{language === 'en' ? 'Choose your preferred method to get in touch.' : 'رابطہ کرنے کے لیے اپنا پسندیدہ طریقہ منتخب کریں۔'}</p>
             <div className="w-full space-y-4 pt-4">
                <Button asChild size="lg" className="w-full">
                    <a href={`tel:${phone.replace(/\s/g, '')}`}>
                        <Phone className="mr-2 h-5 w-5" />
                        {language === 'en' ? 'Call Us' : 'کال کریں'}
                    </a>
                </Button>
                <Button asChild size="lg" className="w-full" variant="secondary" style={{backgroundColor: '#E7FDEE', color: '#13872F'}}>
                    <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                       <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path><path d="m14 2-3 4-3-4"></path></svg>
                        {language === 'en' ? 'WhatsApp Us' : 'واٹس ایپ کریں'}
                    </a>
                </Button>
                 <Button asChild size="lg" className="w-full">
                     <a href={`mailto:${email}`}>
                        <Mail className="mr-2 h-5 w-5" />
                        {language === 'en' ? 'Email Us' : 'ای میل کریں'}
                    </a>
                </Button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
