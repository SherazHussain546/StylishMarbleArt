
import type { Metadata } from 'next';
import ContactPageClient from './contact-page-client';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Contact Us | Stylish Marble Art',
    description: `Contact Stylish Marble Art in Karachi for a quote on gravestones, kitchen marble, or custom engraving. Call or fill out our form. | سٹائلش ماربل آرٹ سے رابطہ کریں۔`,
    keywords: ['contact marble services', 'get quote gravestone', 'marble art contact', 'Karachi marble', 'رابطہ ماربل سروسز', 'قبر کے پتھر کا کوٹیشن'],
};


// Page Component
export default function ContactPage() {
  return <ContactPageClient />;
}
