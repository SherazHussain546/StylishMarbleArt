import type { Metadata } from 'next';
import ReviewsPageClient from './reviews-page-client';

export const metadata: Metadata = {
  title: 'Verified Customer Reviews | Stylish Marble Art Karachi',
  description: 'Read verified testimonials from over 500+ families and businesses in Karachi and worldwide. Discover why we are the trusted choice for Ziarat White and Black Granite.',
  keywords: ['marble reviews Karachi', 'headstone testimonials Pakistan', 'best marble shop Karachi', 'customer feedback Stylish Marble Art', 'Karachi stonemason reviews'],
};

export default function ReviewsPage() {
  return <ReviewsPageClient />;
}