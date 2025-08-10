'use client';

import Link from 'next/link';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { Logo } from './logo';

export function Footer() {
  const { language } = useLanguage();
  const companyName = "Stylish Marble Art";

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
            <Logo companyName={companyName} />
            <p className="mt-2 text-sm text-muted-foreground">{content.footer.tagline[language]}</p>
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
              <p>{content.contactPage.contactInfo.phone[language]}</p>
              <p>
                <a href={`mailto:${content.contactPage.contactInfo.email.en}`} className="hover:text-primary">
                  {content.contactPage.contactInfo.email[language]}
                </a>
              </p>
            </address>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">{content.footer.legal[language]}</p>
        </div>
      </div>
    </footer>
  );
}
