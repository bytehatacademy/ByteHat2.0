
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  author?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'course';
  publishedDate?: string;
  modifiedDate?: string;
  articleSchema?: {
    authorName: string;
    publishedDate: string;
    modifiedDate?: string;
    image?: string;
    category?: string;
  };
  courseSchema?: {
    name: string;
    description: string;
    provider: string;
    duration: string;
    courseLevel: string;
  };
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords = '',
  author = 'ByteHat Academy',
  image = '/og-image.jpg',
  url = '',
  type = 'website',
  publishedDate,
  modifiedDate,
  articleSchema,
  courseSchema,
}) => {
  // Build full URL
  const baseUrl = 'https://bytehatacademy.com';
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImageUrl = image.startsWith('http') ? image : `${baseUrl}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta name="author" content={author} />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImageUrl} />

      {/* Article specific meta tags */}
      {type === 'article' && publishedDate && (
        <>
          <meta property="article:published_time" content={publishedDate} />
          {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}
        </>
      )}

      {/* JSON-LD Structured Data for Articles */}
      {articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: title,
            description: description,
            image: articleSchema.image || fullImageUrl,
            author: {
              '@type': 'Person',
              name: articleSchema.authorName,
            },
            publisher: {
              '@type': 'Organization',
              name: 'ByteHat Academy',
              logo: {
                '@type': 'ImageObject',
                url: `${baseUrl}/logo.png`,
              },
            },
            datePublished: articleSchema.publishedDate,
            dateModified: articleSchema.modifiedDate || articleSchema.publishedDate,
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': fullUrl,
            },
            ...(articleSchema.category && { articleSection: articleSchema.category }),
          })}
        </script>
      )}

      {/* JSON-LD Structured Data for Courses */}
      {courseSchema && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: courseSchema.name,
            description: courseSchema.description,
            provider: {
              '@type': 'Organization',
              name: courseSchema.provider,
              sameAs: baseUrl,
            },
            timeRequired: courseSchema.duration,
            educationalLevel: courseSchema.courseLevel,
          })}
        </script>
      )}

      {/* JSON-LD Structured Data for Organization */}
      {type === 'website' && (
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'ByteHat Academy',
            url: baseUrl,
            logo: `${baseUrl}/logo.png`,
            sameAs: [
              'https://twitter.com/ByteHatAcademy',
              'https://www.linkedin.com/company/bytehatacademy/',
              'https://www.instagram.com/bytehatacademy',
            ],
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+91 7558 9513 51',
              contactType: 'customer service',
              email: 'bytehatacademy@gmail.com',
              areaServed: 'IN',
              availableLanguage: 'English',
            },
          })}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
