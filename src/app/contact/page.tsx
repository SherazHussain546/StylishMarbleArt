'use client';

import { ContactForm } from './contact-form';
import { content } from '@/lib/content';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

// This is a server component that fetches the initial language for its client component child
export default function ContactPage() {
  const { language } = useLanguage();
  const pageContent = content.contactPage;
  const lang = language;

  return (
    <div className="bg-secondary">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">{pageContent.title[lang]}</h1>
          <p className="mt-4 text-xl text-muted-foreground">{pageContent.description[lang]}</p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-3xl font-bold">{pageContent.contactInfo.title[lang]}</h2>
            <div className="space-y-4 text-lg">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <address className="not-italic text-muted-foreground">
                  {pageContent.contactInfo.address[lang]}
                </address>
              </div>
              <div className="flex items-center gap-4">
                <Phone className="h-6 w-6 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">{pageContent.contactInfo.phone[lang]}</span>
              </div>
              <div className="flex items-center gap-4">
                <Mail className="h-6 w-6 flex-shrink-0 text-primary" />
                <a href={`mailto:${pageContent.contactInfo.email.en}`} className="text-muted-foreground hover:text-primary">
                  {pageContent.contactInfo.email[lang]}
                </a>
              </div>
            </div>
          </div>
          
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
