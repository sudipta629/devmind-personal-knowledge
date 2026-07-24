import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/constants/site';

interface GenerateMetadataOptions {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  tags?: string[];
}

export function generateMetadata({
  title,
  description,
  image,
  url,
  type = 'website',
  publishedTime,
  tags,
}: GenerateMetadataOptions = {}): Metadata {
  const metaTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : SITE_CONFIG.title;
  const metaDescription = description || SITE_CONFIG.description;
  const metaImage = image || SITE_CONFIG.ogImage;
  const metaUrl = url || SITE_CONFIG.url;

  return {
    title: metaTitle,
    description: metaDescription,
    keywords: tags ?? [...SITE_CONFIG.keywords],
    authors: [{ name: SITE_CONFIG.author.name }],
    creator: SITE_CONFIG.author.name,
    openGraph: {
      type,
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: metaImage,
          width: 1200,
          height: 630,
          alt: metaTitle,
        },
      ],
      ...(publishedTime && { publishedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      creator: SITE_CONFIG.twitterHandle,
      images: [metaImage],
    },
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: metaUrl,
    },
  };
}
