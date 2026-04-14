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
    default: 'Stylish Marble Art - Gravestones, Kitchens & Custom Marble in Karachi',
    template: '%s | Stylish Marble Art',
  },
  description:
    'Karachi-based headstone makers and marble specialists. Premium gravestones, memorials, and custom kitchen countertops in Pakistan. Expert Ziarat White and Black Granite engraving.',
  keywords: [
    'Stylish Marble Art', 'gravestones Karachi', 'headstone maker Karachi', 'marble gravestone Pakistan', 'marble engraving Pakistan', 'memorial services Karachi', 'custom headstones Pakistan',
    'kitchen marble Karachi', 'Peshawar White marble Pakistan', 'Ziarat White marble Pakistan', 'marble kitchen countertop Karachi', 'granite countertops Karachi', 'Islamic headstone design',
    'قبر کے کتبے کراچی', 'سنگ مرمر کی کندہ کاری', 'یادگار خدمات', 'باورچی خانے کا ماربل', 'ماربل ڈیزائن'
  ],
   openGraph: {
    title: 'Stylish Marble Art - Premium Marble & Gravestones in Karachi, Pakistan',
    description: 'Specialists in high-quality Islamic gravestones, memorials, and custom marble for kitchens and homes.',
    url: siteUrl,
    siteName: 'Stylish Marble Art',
    images: [
      {
        url: '/SMAHeader.png',
        width: 1200,
        height: 630,
        alt: 'Premium Marble Work by Stylish Marble Art in Karachi',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Stylish Marble Art - Premium Marble Services in Karachi',
    description: 'Trusted headstone makers and marble specialists in Malir 15, Karachi.',
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
    "description": "Premium marble gravestone makers and stone specialists in Karachi. Expert Islamic memorials, kitchen countertops, and custom engraving.",
    "@id": siteUrl,
    "url": siteUrl,
    "telephone": "+92-308-3401606",
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
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '839876528851938');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=839876528851938&ev=PageView&noscript=1"
          />
        </noscript>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N9G7PZJS');
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-9X1XV3Q3HJ"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-9X1XV3Q3HJ');
            `,
          }}
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-K21SD8BH3Z"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-K21SD8BH3Z');
            `,
          }}
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
