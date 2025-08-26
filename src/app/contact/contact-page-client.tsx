
'use client';

import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { ContactForm } from './contact-form';
import { Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { GoogleMap } from '@/components/google-map';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ContactPageClient() {
  const { language } = useLanguage();
  const pageContent = content.contactPage;
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const address = "V5HR+38 Ghazi Dawood Brohi Goth, Karachi, Pakistan";
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`;

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
                <address className="not-italic text-muted-foreground">
                  {pageContent.contactInfo.address[language]}
                </address>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 flex-shrink-0 text-primary" />
                <a href={`tel:${pageContent.contactInfo.phone.en.replace(/\s/g, '')}`} className="text-muted-foreground hover:text-primary">
                  {pageContent.contactInfo.phone[language]}
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 flex-shrink-0 text-primary" />
                <a href={`mailto:${pageContent.contactInfo.email.en}`} className="text-muted-foreground hover:text-primary">
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
              {apiKey ? (
                <GoogleMap apiKey={apiKey} />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                  {language === 'en' ? 'Google Map cannot be displayed. API key is missing.' : 'گوگل میپ ظاہر نہیں کیا جا سکتا۔ API کلید غائب ہے۔'}
                </div>
              )}
            </div>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
