
'use client';

import { content } from '@/lib/content';
import { Button } from '@/components/ui/button';
import { Mail, Phone } from 'lucide-react';
import { WhatsappFooterIcon } from './icons/whatsapp-footer-icon';

export function GalleryFloatingCta() {
  const phone = content.contactPage.contactInfo.phone.en.replace(/\s/g, '');
  const whatsappNumber = phone.replace(/\D/g, '');
  const email = content.contactPage.contactInfo.email.en;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        <Button asChild size="icon" variant="outline" className="rounded-full h-14 w-14 bg-blue-500 text-white hover:bg-blue-600 hover:text-white border-blue-500" aria-label="Call Us">
             <a href={`tel:${phone}`}>
                <Phone className="h-6 w-6" />
            </a>
        </Button>
        <Button asChild size="icon" variant="outline" className="rounded-full h-14 w-14 bg-green-500 text-white hover:bg-green-600 hover:text-white border-green-500" aria-label="WhatsApp Us">
            <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                <WhatsappFooterIcon className="h-7 w-7" />
            </a>
        </Button>
        <Button asChild size="icon" variant="outline" className="rounded-full h-14 w-14 bg-gray-600 text-white hover:bg-gray-700 hover:text-white border-gray-600" aria-label="Email Us">
            <a href={`mailto:${email}`}>
                <Mail className="h-6 w-6" />
            </a>
        </Button>
    </div>
  );
}
