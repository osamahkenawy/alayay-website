import Head from 'next/head';
import { useRouter } from 'next/router';
import {
  ANA_BRAND,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  SITE_URL,
} from './data';

type SeoProps = {
  title?: string;
  description?: string;
  /** Path under /public OR absolute URL. 16:9 ~1200x630+ recommended. */
  image?: string;
  /** Override canonical (defaults to current path). */
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
  const pageTitle = title
    ? `${title} — ${ANA_BRAND.name}`
    : DEFAULT_TITLE;
  const url = toAbsolute(canonical ?? router.asPath?.split('?')[0] ?? '/');
  const imageUrl = toAbsolute(image);

  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: ANA_BRAND.name,
    url: SITE_URL,
    logo: toAbsolute('/images/ana/logos/ana-logo.png'),
    image: imageUrl,
    description: DEFAULT_DESCRIPTION,
    slogan: ANA_BRAND.tagline,
    email: ANA_BRAND.email,
    telephone: ANA_BRAND.whatsappNumber,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Dubai',
      addressCountry: ANA_BRAND.country,
    },
    sameAs: [ANA_BRAND.whatsappLink],
  };

  const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: ANA_BRAND.name,
    url: SITE_URL,
    inLanguage: 'en',
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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1"
      />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={ANA_BRAND.name} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:secure_url" content={imageUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1920" />
      <meta property="og:image:height" content="1080" />
      <meta property="og:image:alt" content={`${ANA_BRAND.name} — ${ANA_BRAND.tagline}`} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={`${ANA_BRAND.name} — ${ANA_BRAND.tagline}`} />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
      />
    </Head>
  );
};

export default Seo;
