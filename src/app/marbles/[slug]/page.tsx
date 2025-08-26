
import type { Metadata } from 'next';
import { content } from '@/lib/content';
import MarbleDetailClient from './marble-detail-client';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const marble = content.marbleTypes.types.find((m) => m.slug === params.slug);

  if (!marble) {
    return {
      title: 'Marble Not Found | Stylish Marble Art',
      description: 'The requested marble type could not be found.',
    };
  }

  const { name, page_description } = marble;
  const title = `${name.en} Price & Uses in Pakistan | Stylish Marble Art`;
  const description = `Learn about ${name.en}, a premium marble offered by Stylish Marble Art in Karachi. Get details on its use for kitchens, floors, and memorials in Pakistan. ${page_description.en.substring(0, 100)}...`;
  
  return {
    title: title,
    description: description,
    keywords: [name.en, name.ur, 'marble type price', 'marble details Pakistan', 'Pakistan marble', 'marble for kitchens Karachi', 'marble for memorials', 'سنگ مرمر کی قسم', 'سنگ مرمر کی تفصیلات'],
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: marble.image.startsWith('http') ? marble.image : `https://www.stylishmarbleart.com${marble.image}`,
          width: 800,
          height: 600,
          alt: `${name.en} marble in Pakistan`,
        },
      ],
    },
  };
}


export default function MarbleDetailPage({ params }: { params: { slug: 'string' } }) {
  return <MarbleDetailClient />;
}
