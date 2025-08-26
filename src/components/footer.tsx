'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Logo } from './logo';
import { Mail } from 'lucide-react';
import { FacebookIcon } from './icons/facebook-icon';
import { WhatsappFooterIcon } from './icons/whatsapp-footer-icon';
import { usePathname } from 'next/navigation';

export function Footer() {
  const { language } = useLanguage();
  const pathname = usePathname();

  // Hide footer on admin routes
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const navLinks = [
    { href: '/', label: content.nav.home[language] },
    { href: '/services', label: content.nav.services[language] },
    { href: '/gallery', label: content.nav.gallery[language] },
    { href: '/about', label: content.nav.about[language] },
    { href: '/contact', label: content.nav.contact[language] },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-start">
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">{content.footer.tagline[language]}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href="https://facebook.com/stylishmarbleart" target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-lg flex items-center border border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
                <FacebookIcon />
                <span className="sr-only">Facebook</span>
              </a>
               <a href={`https://wa.me/${content.contactPage.contactInfo.phone.en.replace(/\D/g, '')}`} target="_blank" rel="noopener noreferrer"
                 className="p-2 rounded-lg flex items-center border border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
                <WhatsappFooterIcon />
                 <span className="sr-only">WhatsApp</span>
              </a>
               <a href={`mailto:${content.contactPage.contactInfo.email.en}`}
                 className="p-2 rounded-lg flex items-center border border-gray-300 justify-center transition-all duration-500 hover:border-gray-100 hover:bg-gray-100">
                <Mail className="h-7 w-7" />
                 <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
          <div className="md:justify-self-center">
            <h3 className="font-headline text-lg font-semibold">{content.footer.quickLinks[language]}</h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:justify-self-end">
            <h3 className="font-headline text-lg font-semibold">{content.contactPage.contactInfo.title[language]}</h3>
            <address className="mt-4 space-y-2 not-italic text-sm text-muted-foreground">
              <p>{content.contactPage.contactInfo.address[language]}</p>
              <p>
                 <a href={`tel:${content.contactPage.contactInfo.phone.en.replace(/\s/g, '')}`} className="hover:text-primary">
                    {content.contactPage.contactInfo.phone[language]}
                </a>
              </p>
              <p>
                <a href={`mailto:${content.contactPage.contactInfo.email.en}`} className="hover:text-primary">
                  {content.contactPage.contactInfo.email[language]}
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center flex justify-center items-center">
          <p className="text-sm text-muted-foreground">
            {content.footer.legal[language]} | Developed by <a href="https://www.synctech.ie" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">SYNC TECH</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
