
import type { Metadata } from 'next';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/language-context';
import { AuthProvider } from '@/contexts/auth-context';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { WhatsAppButton } from '@/components/whatsapp-button';
import './globals.css';

const siteUrl = 'https://www.stylishmarbleart.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
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
    url: siteUrl,
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
    canonical: '/',
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
        {/* Meta Pixel Code */}
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
        {/* End Meta Pixel Code */}

        {/* Google Tag Manager */}
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
        {/* End Google Tag Manager */}

        {/* Google tag (gtag.js) */}
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
