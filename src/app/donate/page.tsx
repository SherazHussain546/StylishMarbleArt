
import type { Metadata } from 'next';
import DonatePageClient from './donate-page-client';

export const metadata: Metadata = {
  title: 'Ramadan Charity 2026: Donate Zakat & Sadaqa to Pakistan | Stylish Marble Art',
  description: 'Share your blessings this Ramadan. Your Zakat or Sadaqa donation helps provide Iftar meals and essential food packs to families in need across Pakistan. Donate securely online and make a lasting impact.',
  keywords: ['Ramadan charity', 'donate Zakat online', 'Sadaqa donation', 'Iftar for the needy', 'Ramadan 2026 appeal', 'support families in Pakistan', 'Muslim charity', 'humanitarian aid Pakistan', 'Zakat calculator', 'charity in Ramadan'],
  openGraph: {
    title: 'Share Your Blessings This Ramadan | Donate to Families in Pakistan',
    description: 'Your contribution, no matter the size, helps provide Iftar meals and essential aid during this holy month. Give your Zakat or Sadaqa securely online with Stripe.',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1588276552401-7602d3535239?q=80&w=1200&auto=format&fit=crop',
        width: 1200,
        height: 630,
        alt: 'A mosque silhouetted against a night sky with a crescent moon, representing Ramadan.',
      },
    ],
  }
};

export default function DonatePage() {
  return <DonatePageClient />;
}
