import fs from 'fs';
import path from 'path';

// ANA product catalog generated from /public/images/ana/products/*.png.
// Filename (without extension) is the slug/id; metadata can be overridden via PRODUCT_OVERRIDES.

const PRODUCTS_DIR = path.join(process.cwd(), 'public', 'images', 'ana', 'products');
const PUBLIC_IMAGE_BASE = '/images/ana/products';

// Known zodiac slugs (incl. common misspellings used in the asset folder)
const ZODIAC_SLUGS = new Set([
  'aries',
  'taurus',
  'gemeini', // misspelling of gemini in assets
  'gemini',
  'cancer',
  'lio', // misspelling of leo in assets
  'leo',
  'virgo',
  'libra',
  'scorpio',
  'sagittarius',
  'capricorn',
  'aquarius',
  'pisces',
]);

const DISPLAY_NAME: Record<string, string> = {
  gemeini: 'Gemini',
  lio: 'Leo',
  'dessert-rose': 'Desert Rose',
  'heaven-code': 'Heaven Code',
  'midnight-oud': 'Midnight Oud',
  'snow-mask': 'Snow Mask',
};

const ZODIAC_NOTES: Record<string, string> = {
  aries: 'Amber, Saffron, Cedarwood',
  taurus: 'Rose, Vanilla, Sandalwood',
  gemeini: 'Bergamot, Iris, White Musk',
  gemini: 'Bergamot, Iris, White Musk',
  cancer: 'Jasmine, Lotus, Moonflower',
  lio: 'Oud, Tobacco, Gold Amber',
  leo: 'Oud, Tobacco, Gold Amber',
  virgo: 'Green Tea, Vetiver, Cypress',
  libra: 'Peony, Pink Pepper, Cashmeran',
  scorpio: 'Black Oud, Patchouli, Leather',
  sagittarius: 'Cardamom, Cedar, Smoked Vanilla',
  capricorn: 'Frankincense, Birch, Stone',
  aquarius: 'Ozone, Mint, Crystal Musk',
  pisces: 'Sea Salt, Ambergris, Driftwood',
};

const SIGNATURE_NOTES: Record<string, string> = {
  'dessert-rose': 'Damask Rose, Saffron, Oud',
  'heaven-code': 'Iris, White Amber, Skin Musk',
  'midnight-oud': 'Black Oud, Smoked Resin, Leather',
  'snow-mask': 'Cold Mint, White Musk, Glacial Iris',
};

function toTitle(slug: string) {
  if (DISPLAY_NAME[slug]) return DISPLAY_NAME[slug];
  return slug
    .split('-')
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(' ');
}

export async function getProducts() {
  let files: string[] = [];
  try {
    files = fs
      .readdirSync(PRODUCTS_DIR)
      .filter((f) => /\.(png|jpe?g|webp|avif)$/i.test(f))
      .sort();
  } catch {
    return [];
  }

  const products = files.map((file, idx) => {
    const slug = file.replace(/\.[^.]+$/, '').toLowerCase();
    const isZodiac = ZODIAC_SLUGS.has(slug);
    const name = isZodiac
      ? `${toTitle(slug)} — Zodiac Edition`
      : toTitle(slug);
    const collection = isZodiac ? 'Zodiac Collection' : 'Signature Collection';
    const substance = isZodiac
      ? ZODIAC_NOTES[slug] ?? 'Curated Oriental Accord'
      : SIGNATURE_NOTES[slug] ?? 'Curated Oriental Accord';

    return {
      id: `ana-${slug}`,
      name,
      description: `${name} — a refined ANA fragrance from the ${collection}.`,
      image: `${PUBLIC_IMAGE_BASE}/${file}`,
      price: isZodiac ? 120 : 180,
      manufacturer: 'ANA Parfums',
      type: 'Eau de Parfum',
      quantity: 1,
      dosage: '50 ml',
      substance,
      category_ids: isZodiac ? 'zodiac' : 'signature',
    };
  });

  return JSON.parse(JSON.stringify(products));
}
