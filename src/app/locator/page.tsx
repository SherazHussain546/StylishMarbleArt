
import type { Metadata } from 'next';
import LocatorPageClient from './locator-client';

export const metadata: Metadata = {
  title: 'Digital Memorial Locator | Stylish Marble Art Karachi',
  description: 'Find the exact GPS location of your loved ones graves in Karachi. Request grave care services like cleaning, watering, and planting from anywhere in the world.',
  keywords: ['grave locator Karachi', 'find grave location Pakistan', 'memorial map Karachi', 'grave care services Pakistan', 'remote grave cleaning'],
};

export default function LocatorPage() {
  return <LocatorPageClient />;
}
