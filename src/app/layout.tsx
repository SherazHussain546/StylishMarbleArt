import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Stylish Marble Art - Gravestones & Marble Works',
  description:
    'Stylish Marble Art offers expert craftsmanship in gravestones, grave making, and all marble works including kitchen and house marbling. Specialists in all types of marble engraving.',
  keywords: ['marble', 'gravestone', 'engraving', 'kitchen marbling', 'house marbling', 'artificial marble'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companyName = "Stylish Marble Art";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      </head>
      <body className="font-body antialiased">
        <LanguageProvider>
          <div className="flex min-h-screen flex-col">
            <Header companyName={companyName} />
            <main className="flex-grow">{children}</main>
            <Footer companyName={companyName} />
          </div>
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
