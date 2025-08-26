import type { Metadata } from 'next';
import { content } from '@/lib/content';
import MarbleDetailClient from './marble-detail-client';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const marble = content.marbleTypes.types.find((m) => m.slug === params.slug);

  if (!marble) {
    return {
      title: 'Marble Not Found',
      description: 'The requested marble type could not be found.',
    };
  }

  const { name, page_description } = marble;
  const title = `${name.en} Details and Uses | Stylish Marble Art`;
  const description = `Learn about ${name.en}, a premium marble offered by Stylish Marble Art in Karachi. ${page_description.en.substring(0, 120)}...`;
  
  return {
    title: title,
    description: description,
    keywords: [name.en, name.ur, 'marble type', 'marble details', 'Pakistan marble', 'marble for kitchens', 'marble for memorials', 'سنگ مرمر کی قسم', 'سنگ مرمر کی تفصیلات'],
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: marble.image.startsWith('http') ? marble.image : `https://www.stylishmarbleart.com${marble.image}`,
          width: 800,
          height: 600,
          alt: `${name.en} marble`,
        },
      ],
    },
  };
}


export default function MarbleDetailPage({ params }: { params: { slug: 'string' } }) {
  return <MarbleDetailClient />;
}
