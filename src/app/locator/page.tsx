
import type { Metadata } from 'next';
import LocatorPageClient from './locator-client';

export const metadata: Metadata = {
  title: 'Find Your Loved Ones Grave | Karachi Graveyard Map | Stylish Marble Art',
  description: 'Easily find the exact GPS location of your loved ones graves in Karachi. Search by name or graveyard and request professional grave care services like cleaning and watering from anywhere in the world.',
  keywords: ['find grave Karachi', 'locate loved ones grave Pakistan', 'graveyard map Karachi', 'grave care services Pakistan', 'remote grave cleaning', 'Karachi cemetery search'],
};

export default function LocatorPage() {
  return <LocatorPageClient />;
}
