import type { Metadata } from 'next';
import FAQPageClient from './faq-page-client';

// SEO Metadata for the FAQ page
export const metadata: Metadata = {
    title: 'Frequently Asked Questions | Marble Services Karachi - Stylish Marble Art',
    description: 'Find answers to common questions about marble prices in Karachi, gravestone making times, and custom kitchen installations in Pakistan. | کراچی میں ماربل کی قیمتوں، کتبے بنانے کے اوقات، اور کچن کی تنصیب کے بارے میں اکثر پوچھے گئے سوالات۔',
    keywords: ['marble FAQ Karachi', 'gravestone price Pakistan', 'marble installation help', 'stone carving questions', 'Karachi stonemason advice', 'سوالات ماربل کراچی', 'قبر کے پتھر کی قیمت'],
};

// Page Component
export default function FAQPage() {
  return <FAQPageClient />;
}