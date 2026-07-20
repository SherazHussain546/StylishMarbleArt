import type { Metadata } from 'next';
import FAQPageClient from './faq-page-client';

export const metadata: Metadata = {
  title: 'Marble FAQ & Expert Advice | Stylish Marble Art Karachi',
  description: 'Expert answers on stone durability, custom engraving times, and international shipping from Karachi\'s trusted legacy headstone makers.',
  keywords: ['marble FAQ Pakistan', 'gravestone price Karachi', 'stone engraving time', 'export marble from Pakistan', 'Ziarat White durability'],
};

export default function FAQPage() {
  return <FAQPageClient />;
}