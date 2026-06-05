import type { Metadata } from 'next';
import PrivacyPageClient from './privacy-page-client';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Security | Stylish Marble Art',
  description: 'Learn how Stylish Marble Art secures your data and uses it to improve the Karachi community memorial registry. Our commitment to privacy and transparency.',
  keywords: ['privacy policy Karachi marble', 'data security Pakistan', 'memorial registry privacy', 'lead usage transparency'],
};

export default function PrivacyPage() {
  return <PrivacyPageClient />;
}