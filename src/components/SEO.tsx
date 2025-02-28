
import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  twitterCard?: 'summary' | 'summary_large_image';
}

/**
 * SEO component for consistent metadata across pages
 * @param {SEOProps} props - SEO properties
 * @returns {JSX.Element} - Helmet component with SEO metadata
 */
const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonicalUrl,
  ogImage = 'https://bytehatacademy.com/logo.png',
  ogType = 'website',
  twitterCard = 'summary_large_image',
}) => {
  // Base URL for canonical links and open graph images
  const baseUrl = 'https://bytehatacademy.com';
  
  // Format canonical URL if provided
  const canonical = canonicalUrl ? `${baseUrl}${canonicalUrl}` : undefined;
  
  // Format OG image URL to ensure it's absolute
  const ogImageUrl = ogImage.startsWith('http') ? ogImage : `${baseUrl}${ogImage}`;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{`${title} | ByteHat Academy`}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph metadata */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:site_name" content="ByteHat Academy" />
      
      {/* Twitter metadata */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImageUrl} />
      
      {/* Additional security headers */}
      <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://images.unsplash.com; font-src 'self' https://fonts.gstatic.com; connect-src 'self' https://api.emailjs.com;" />
      <meta http-equiv="X-Content-Type-Options" content="nosniff" />
      <meta http-equiv="X-Frame-Options" content="DENY" />
      <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
    </Helmet>
  );
};

export default SEO;
