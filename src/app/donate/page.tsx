
import type { Metadata } from 'next';
import DonatePageClient from './donate-page-client';

export const metadata: Metadata = {
  title: 'Donate for Ramadan | Stylish Marble Art',
  description: 'Join us in supporting families in need this Ramadan. Your contribution can provide Iftar meals and essential aid to our community in Pakistan.',
  keywords: ['Ramadan donation', 'support Pakistan', 'charity Karachi', 'donate for Iftar', 'zakat', 'Ramadan 2024'],
  openGraph: {
    title: 'Support Our Community This Ramadan',
    description: 'Your donation helps us provide essential aid to families in Pakistan during the month of blessings.',
  }
};

export default function DonatePage() {
  return <DonatePageClient />;
}
