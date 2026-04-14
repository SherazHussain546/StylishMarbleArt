
import type { Metadata } from 'next';
import LocatorPageClient from './locator-client';

export const metadata: Metadata = {
  title: 'Find Your Loved Ones Grave | Karachi Graveyard Map | Stylish Marble Art',
  description: 'Easily find the exact GPS location of your loved ones graves in Karachi. Search by name or graveyard and request professional grave care services like cleaning and watering from anywhere in the world.',
  keywords: [
    'find grave Karachi', 
    'locate loved ones grave Pakistan', 
    'graveyard map Karachi', 
    'grave care services Pakistan', 
    'remote grave cleaning', 
    'Karachi cemetery search',
    'Wadi-e-Hussain grave search',
    'Mewa Shah locator',
    'Islamic grave maintenance',
    'Karachi burial records'
  ],
  openGraph: {
    title: 'Find Your Loved Ones Grave in Karachi | Digital Memorial Locator',
    description: 'A free community service by Stylish Marble Art. Pin and locate graves across Karachi and request professional care services.',
    images: ['/SMAHeader.png'],
  }
};

export default function LocatorPage() {
  return <LocatorPageClient />;
}
