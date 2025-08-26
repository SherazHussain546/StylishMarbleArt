import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Stylish Marble Art - Gravestones, Kitchens & Custom Marble Works',
    template: '%s | Stylish Marble Art',
  },
  description:
    'Karachi-based experts in gravestones, memorials, and custom marble work for kitchens and homes. We specialize in all types of marble and granite engraving, including Ziarat White and Black Granite.',
  keywords: [
    'Stylish Marble Art', 'gravestones Karachi', 'marble engraving Pakistan', 'memorial services', 'custom headstones',
    'kitchen marble', 'home marble installation', 'artificial marble', 'granite countertops', 'tombstone design',
    'grave making services', 'Ziarat White Marble', 'Black Granite', 'Rosso Verona Marble', 'marble repair', 'marble polishing',
    'قبر کے کتبے کراچی', 'سنگ مرمر کی کندہ کاری', 'یادگار خدمات', 'باورچی خانے کا ماربل'
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <WhatsAppButton phoneNumber="+923002193808" />
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
