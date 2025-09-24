interface ArticleJsonLdProps {
  title: string;
  description: string;
  image?: string;
  publishedAt: string;
  modifiedAt?: string;
  author?: string;
  url: string;
}

export function ArticleJsonLd({
  title,
  description,
  image,
  publishedAt,
  modifiedAt,
  author = 'Cafe Kinesi',
  url,
}: ArticleJsonLdProps) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: image ? [image] : [],
    datePublished: publishedAt,
    dateModified: modifiedAt || publishedAt,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Cafe Kinesi',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cafe-kinesi.com/logo.jpeg',
      },
    },
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}