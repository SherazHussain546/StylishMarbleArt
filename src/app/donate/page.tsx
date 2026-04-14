
import type { Metadata } from 'next';
import DonatePageClient from './donate-page-client';

export const metadata: Metadata = {
  title: 'Ramadan 2026 Sadaqa Jariya | Stylish Marble Art Charity',
  description: 'Join Stylish Marble Art in supporting the global Muslim Ummah this Ramadan 2026. Sponsor Iftar, food packs, and Eid joy for families in need across Pakistan.',
  keywords: ['Ramadan charity Pakistan', 'Sadaqa Jariya Karachi', 'donate Iftar Pakistan', 'Zakat eligible projects', 'Muslim community support'],
};

export default function DonatePage() {
  return <DonatePageClient />;
}
