export const ANA_BRAND = {
  name: 'ANA Candles',
  tagline: 'A Candle That Feels Like You',
  whatsappNumber: '+971 55 535 9422',
  whatsappLink: 'https://wa.me/971555359422',
  email: 'info@anagift.ae',
  city: 'Dubai, United Arab Emirates',
  country: 'AE',
};

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://anacandles.com'
).replace(/\/$/, '');

export const DEFAULT_OG_IMAGE = '/og-image.png'; // 1920x1080, 16:9
export const DEFAULT_TITLE = 'ANA Candles — A Candle That Feels Like You';
export const DEFAULT_DESCRIPTION =
  'Luxury zodiac-inspired candles crafted for elegant moments, cozy nights, and meaningful gifts. Hand-poured in the spirit of the Gulf.';

export const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About ANA', href: '/about' },
  { label: 'Collections', href: '/#collections' },
  { label: 'Zodiac Candles', href: '/#zodiac' },
  { label: 'Gifts', href: '/#gifts' },
  { label: 'Contact', href: '/#contact' },
];

export type SignatureScent = {
  slug: string;
  name: string;
  mood: string;
  image: string;
};

export const SIGNATURE_SCENTS: SignatureScent[] = [
  {
    slug: 'midnight-oud',
    name: 'Midnight Oud',
    mood: 'Deep',
    image: '/images/ana/products/midnight-oud.png',
  },
  {
    slug: 'desert-rose',
    name: 'Desert Rose',
    mood: 'Soft',
    image: '/images/ana/products/dessert-rose.png',
  },
  {
    slug: 'heaven-code',
    name: 'Heaven Code',
    mood: 'Pure',
    image: '/images/ana/products/heaven-code.png',
  },
  {
    slug: 'snow-musk',
    name: 'Snow Musk',
    mood: 'Cool',
    image: '/images/ana/products/snow-mask.png',
  },
];

export type ZodiacSign = {
  slug: string;
  name: string;
  dates: string;
  image: string;
};

// Note: all 12 zodiac product images are now present under
// /public/images/ana/products/. Filename typos in the asset folder
// (gemeini, lio) are mapped here to canonical names.
export const ZODIAC_SIGNS: ZodiacSign[] = [
  { slug: 'aries',       name: 'Aries',       dates: 'MAR 21 — APR 19', image: '/images/ana/products/aries.png' },
  { slug: 'taurus',      name: 'Taurus',      dates: 'APR 20 — MAY 20', image: '/images/ana/products/taurus.png' },
  { slug: 'gemini',      name: 'Gemini',      dates: 'MAY 21 — JUN 20', image: '/images/ana/products/gemeini.png' },
  { slug: 'cancer',      name: 'Cancer',      dates: 'JUN 21 — JUL 22', image: '/images/ana/products/cancer.png' },
  { slug: 'leo',         name: 'Leo',         dates: 'JUL 23 — AUG 22', image: '/images/ana/products/lio.png' },
  { slug: 'virgo',       name: 'Virgo',       dates: 'AUG 23 — SEP 22', image: '/images/ana/products/virgo.png' },
  { slug: 'libra',       name: 'Libra',       dates: 'SEP 23 — OCT 22', image: '/images/ana/products/libra.png' },
  { slug: 'scorpio',     name: 'Scorpio',     dates: 'OCT 23 — NOV 21', image: '/images/ana/products/scorpio.png' },
  { slug: 'sagittarius', name: 'Sagittarius', dates: 'NOV 22 — DEC 21', image: '/images/ana/products/sagittarius.png' },
  { slug: 'capricorn',   name: 'Capricorn',   dates: 'DEC 22 — JAN 19', image: '/images/ana/products/capricorn.png' },
  { slug: 'aquarius',    name: 'Aquarius',    dates: 'JAN 20 — FEB 18', image: '/images/ana/products/aquarius.png' },
  { slug: 'pisces',      name: 'Pisces',      dates: 'FEB 19 — MAR 20', image: '/images/ana/products/pisces.png' },
];
