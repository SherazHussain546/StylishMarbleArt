
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Stylish Marble Art - Gravestones, Kitchens & Custom Marble in Karachi',
    template: '%s | Stylish Marble Art',
  },
  description:
    'Karachi-based experts in premium gravestones, memorials, & custom marble work for kitchens & homes. We specialize in all types of marble and granite engraving, including Ziarat White & Black Granite. Contact us for a quote in Pakistan.',
  keywords: [
    'Stylish Marble Art', 'gravestones Karachi', 'marble engraving Pakistan', 'memorial services', 'custom headstones',
    'kitchen marble', 'home marble installation', 'artificial marble', 'granite countertops', 'tombstone design',
    'grave making services', 'Ziarat White Marble', 'Black Granite', 'Rosso Verona Marble', 'marble repair', 'marble polishing', 'marble shop Karachi',
    'قبر کے کتبے کراچی', 'سنگ مرمر کی کندہ کاری', 'یادگار خدمات', 'باورچی خانے کا ماربل', 'ماربل ڈیزائن'
  ],
   openGraph: {
    title: 'Stylish Marble Art - Premium Marble Services in Karachi, Pakistan',
    description: 'Specialists in beautiful gravestones, memorials, and custom marble for kitchens and homes.',
    url: 'https://www.stylishmarbleart.com',
    siteName: 'Stylish Marble Art',
    images: [
      {
        url: '/SMAHeader.png',
        width: 1200,
        height: 630,
        alt: 'A beautiful memorial by Stylish Marble Art in Karachi',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stylish Marble Art - Premium Marble Services in Karachi',
    description: 'From elegant gravestones to custom kitchen countertops, we are Karachi\'s trusted marble experts.',
    images: ['/SMAHeader.png'],
  },
  alternates: {
    canonical: 'https://www.stylishmarbleart.com',
  }
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
        <AuthProvider>
          <LanguageProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <WhatsAppButton phoneNumber="+923002193808" />
            <Toaster />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
