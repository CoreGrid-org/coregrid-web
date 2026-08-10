import React from 'react';
import Head from '@docusaurus/Head';

const SITE_URL = 'https://coregrid.example.com';

type Props = {
  path: string;
  title?: string;
  description?: string;
  image?: string;
};

export default function SeoHead({path, title, description, image}: Props): React.ReactElement {
  const url = path === '/' ? SITE_URL : `${SITE_URL}${path}`;
  const metaTitle = title ? `${title} | CoreGrid` : 'CoreGrid - Unified Asset Management Platform';
  const metaDescription =
    description ||
    'CoreGrid centralises every asset across every department - from registration to disposal - with AI-assisted decision support and full audit compliance.';
  const metaImage = image ? `${SITE_URL}${image}` : `${SITE_URL}/img/coregrid-logo.png`;

  return (
    <Head>
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={metaImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />
    </Head>
  );
}
