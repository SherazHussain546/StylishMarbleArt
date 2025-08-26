'use client';

import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Logo } from '@/components/logo';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useLanguage } from '@/contexts/language-context';
import { content } from '@/lib/content';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/auth-context';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { language } = useLanguage();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  
  // Hide header on admin routes
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

  const NavItems = () =>
    navLinks.map(link => (
      <Link
        key={link.href}
        href={link.href}
        onClick={() => setIsMenuOpen(false)}
        className={cn(
          'text-sm font-medium transition-colors hover:text-primary',
          pathname === link.href ? 'text-primary' : 'text-muted-foreground'
        )}
      >
        {link.label}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-between">
          <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
            <NavItems />
          </nav>

          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <div className="flex h-full flex-col p-6">
                  <div className="mb-8">
                    <Logo />
                  </div>
                  <nav className="flex flex-col space-y-4">
                    <NavItems />
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
          <div className="md:hidden">
             <Logo />
          </div>

          <div className="flex items-center justify-end">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
