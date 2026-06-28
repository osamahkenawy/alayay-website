import Head from 'next/head';
import { useRouter } from 'next/router';
import { ALAYAY_BRAND, DEFAULT_DESCRIPTION, DEFAULT_OG_IMAGE, DEFAULT_TITLE, SITE_URL } from './data';

type SeoProps = {
  title?: string;
  description?: string;
  image?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  noIndex?: boolean;
};

function toAbsolute(url: string): string {
  if (!url) return SITE_URL;
  if (/^https?:\/\//i.test(url)) return url;
  return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
}

const Seo: React.FC<SeoProps> = ({
  title,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_OG_IMAGE,
  canonical,
  type = 'website',
  noIndex = false,
}) => {
  const router = useRouter();
  const pageTitle = title ? `${title} — ${ALAYAY_BRAND.name}` : DEFAULT_TITLE;
  const url = toAbsolute(canonical ?? router.asPath?.split('?')[0] ?? '/');
  const imageUrl = toAbsolute(image);

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: ALAYAY_BRAND.name,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    telephone: ALAYAY_BRAND.phone,
    email: ALAYAY_BRAND.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: 'AE',
    },
    sameAs: [ALAYAY_BRAND.whatsapp],
  };

  return (
    <Head>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noIndex ? (
        <meta name="robots" content="noindex,nofollow" />
      ) : (
        <meta name="robots" content="index,follow,max-image-preview:large" />
      )}
      <link rel="canonical" href={url} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={ALAYAY_BRAND.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content="en_US" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
    </Head>
  );
};

export default Seo;
