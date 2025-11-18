import type { Metadata } from 'next';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tailorai.app';
const siteName = 'Tailor AI';
const defaultDescription = 'AI-powered resume tailoring that matches job descriptions perfectly. Beat ATS filters and land more interviews.';

export interface MetadataProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noIndex?: boolean;
}

export function generateMetadata({
  title,
  description = defaultDescription,
  keywords,
  image = '/og-image.png',
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  noIndex = false,
}: MetadataProps): Metadata {
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - AI Resume Tailoring Software`;

  const metadata: Metadata = {
    title: fullTitle,
    description,
    keywords: keywords || 'ATS resume builder, AI resume tailoring, applicant tracking system, resume optimization, ATS-friendly resume, resume keyword optimization, beat ATS filters',
    authors: authors ? authors.map(name => ({ name })) : [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    robots: noIndex ? 'noindex, nofollow' : 'index, follow',
    openGraph: {
      type,
      title: fullTitle,
      description,
      siteName,
      images: [
        {
          url: image.startsWith('http') ? image : `${siteUrl}${image}`,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [image.startsWith('http') ? image : `${siteUrl}${image}`],
      creator: '@tailorai',
    },
    alternates: {
      canonical: siteUrl,
    },
    metadataBase: new URL(siteUrl),
  };

  return metadata;
}

