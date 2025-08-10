import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'Legacy Stone - Honoring Memories with Timeless Craftsmanship',
  description:
    'Legacy Stone provides dignified and beautifully crafted memorial stones, headstones, and engraving services. We help you create a lasting tribute for your loved ones with respect and compassion.',
  keywords: ['memorials', 'headstones', 'gravestones', 'engraving', 'monuments', 'remembrance'],
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
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
