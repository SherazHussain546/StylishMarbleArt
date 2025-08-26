
import type { Metadata } from 'next';
import ContactPageClient from './contact-page-client';

// SEO Metadata
export const metadata: Metadata = {
    title: 'Contact Us for Marble Services in Karachi | Stylish Marble Art',
    description: `Get in touch with Stylish Marble Art in Karachi. Visit our office, call us, or fill out the contact form for a quote on gravestones, kitchen marble, or custom engraving. | سٹائلش ماربل آرٹ سے رابطہ کریں۔ کراچی میں قبر کے پتھر، کچن ماربل، یا اپنی مرضی کے مطابق کندہ کاری کے لیے ہم سے رابطہ کریں۔`,
    keywords: ['contact marble services Karachi', 'get quote gravestone Pakistan', 'marble art contact', 'Karachi marble shop location', 'directions to marble store', 'رابطہ ماربل سروسز', 'قبر کے پتھر کا کوٹیشن', 'ماربل آرٹ کراچی'],
};


// Page Component
export default function ContactPage() {
  return <ContactPageClient />;
}
