
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import { FirebaseClientProvider } from '@/firebase';
import './globals.css';

const siteUrl = 'https://www.stylishmarbleart.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Stylish Marble Art - Karachi Headstones & Global Marble Export',
    template: '%s | Stylish Marble Art',
  },
  description:
    'Karachi-based legacy headstone makers serving Pakistan and the global Muslim community. Premium gravestones, memorials, and custom kitchen countertops crafted in Malir 15. Expert Ziarat White export for Middle East, Africa, and beyond.',
  keywords: [
    'Stylish Marble Art', 'gravestones Karachi', 'headstone maker Karachi', 'marble gravestone Pakistan', 'marble engraving Pakistan', 'memorial services Karachi', 'custom headstones Pakistan',
    'kitchen marble Karachi', 'Peshawar White marble Pakistan', 'Ziarat White marble Pakistan', 'marble kitchen countertop Karachi', 'granite countertops Karachi', 'Islamic headstone design',
    'Islamic memorials Saudi Arabia', 'UAE headstones', 'Kuwait marble export', 'Qatar memorials', 'Oman stone carving', 'Bahrain gravestones', 'Egypt marble', 'Morocco stone work', 'global Ummah memorials',
    'قبر کے کتبے کراچی', 'سنگ مرمر کی کندہ کاری', 'یادگار خدمات', 'باورچی خانے کا ماربل', 'ماربل ڈیزائن'
  ],
   openGraph: {
    title: 'Stylish Marble Art - Premium Marble & Gravestones for the Global Muslim Ummah',
    description: 'Specialists in high-quality Islamic gravestones, memorials, and custom marble for kitchens and homes in Karachi, serving clients worldwide.',
    url: siteUrl,
    siteName: 'Stylish Marble Art',
    images: [
      {
        url: '/SMAHeader.png',
        width: 1200,
        height: 630,
        alt: 'Premium Marble Work by Stylish Marble Art - Global Reach from Karachi',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stylish Marble Art - Premium Marble Services Worldwide',
    description: 'Trusted headstone makers and marble specialists in Karachi, serving the global Muslim community.',
    images: ['/SMAHeader.png'],
  },
  alternates: {
    canonical: '/',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Stylish Marble Art",
    "image": `${siteUrl}/SMAHeader.png`,
    "description": "Karachi's premier headstone maker and stone specialists. Expert Islamic memorials, kitchen countertops, and custom engraving based in Pakistan, serving the global Muslim community.",
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": "+92-308-3401606",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Malir 15, At Main National Highway Near Bank Al-Habib Ltd",
      "addressLocality": "Karachi",
      "addressRegion": "Sindh",
      "postalCode": "75080",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.8778,
      "longitude": 67.1952
    },
    "areaServed": [
      {
        "@type": "Country",
        "name": "Pakistan"
      },
      {
        "@type": "Country",
        "name": "Saudi Arabia"
      },
      {
        "@type": "Country",
        "name": "United Arab Emirates"
      },
      {
        "@type": "Country",
        "name": "Qatar"
      },
      {
        "@type": "Country",
        "name": "Kuwait"
      },
      {
        "@type": "Country",
        "name": "Oman"
      },
      {
        "@type": "Country",
        "name": "Algeria"
      },
      {
        "@type": "Country",
        "name": "United Kingdom"
      }
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "21:00"
    },
    "sameAs": [
      "https://facebook.com/stylishmarbleart"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          <AuthProvider>
            <LanguageProvider>
              <div className="flex min-h-screen flex-col">
                <Header />
                <main className="flex-grow">{children}</main>
                <Footer />
              </div>
              <WhatsAppButton phoneNumber="+923083401606" />
              <Toaster />
            </LanguageProvider>
          </AuthProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
