
import type { Metadata } from 'next';
import { content } from '@/lib/content';
import AboutPageClient from './about-page-client';

// SEO Metadata
export async function generateMetadata(): Promise<Metadata> {
  const pageContent = content.aboutPage;
  const englishTitle = pageContent.title.en;
  const urduTitle = pageContent.title.ur;
  const englishDescription = pageContent.ourStoryText.en;
  const urduDescription = pageContent.ourStoryText.ur;

  return {
    title: `${englishTitle} | ${urduTitle}`,
    description: `${englishDescription.substring(0, 150)}... | ${urduDescription.substring(0, 150)}...`,
    keywords: ['about Stylish Marble Art', 'marble history', 'family business marble', 'stonemasonry Karachi', 'ہمارے بارے میں', 'سنگ مرمر کی تاریخ'],
  };
}

// Page Component
export default function AboutPage() {
  return <AboutPageClient />;
}
