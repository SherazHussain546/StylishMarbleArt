
import type { Metadata } from 'next';
import DonatePageClient from './donate-page-client';

export const metadata: Metadata = {
  title: 'Ramadan Donation 2024: Support Families in Pakistan | Stylish Marble Art',
  description: 'Join Stylish Marble Art this Ramadan to provide Iftar meals & essential aid to families in need across Pakistan. Give your Zakat or Sadaqa securely online. Your contribution makes a difference.',
  keywords: ['Ramadan donation', 'support Pakistan', 'charity Karachi', 'donate for Iftar', 'zakat online', 'sadaqa', 'Ramadan 2024', 'Muslim charity', 'iftar meals', 'humanitarian aid Pakistan'],
  openGraph: {
    title: 'Support Families in Pakistan This Ramadan | Stylish Marble Art',
    description: 'Your donation helps provide Iftar meals and essential aid during this month of blessings. Give your Zakat or Sadaqa securely online.',
  }
};

export default function DonatePage() {
  return <DonatePageClient />;
}
