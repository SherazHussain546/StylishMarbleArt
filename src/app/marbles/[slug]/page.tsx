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
  const title = `${name.en} | ${name.ur}`;
  const description = `${page_description.en.substring(0, 160)} | ${page_description.ur.substring(0, 160)}`;
  
  return {
    title: title,
    description: description,
    keywords: [name.en, name.ur, 'marble type', 'marble details', 'Pakistan marble', 'سنگ مرمر کی قسم', 'سنگ مرمر کی تفصیلات'],
    openGraph: {
      title: title,
      description: description,
      images: [
        {
          url: marble.image,
          width: 800,
          height: 600,
          alt: name.en,
        },
      ],
    },
  };
}


export default function MarbleDetailPage({ params }: { params: { slug: string } }) {
  return <MarbleDetailClient slug={params.slug} />;
}
