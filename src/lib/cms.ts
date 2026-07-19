// Fetches content from the Alayay CMS (Express + JSON store) and maps it into
// the shape the site already uses, so it can OVERLAY the hardcoded content in
// `translations.ts` / `data.ts` with graceful fallback. Nothing here is
// required for the site to work — if the CMS is unreachable or a field is
// empty, the caller keeps its existing default.

const CMS_BASE = (process.env.CMS_URL ?? 'http://localhost:3014').replace(/\/$/, '');

type Locale = 'en' | 'ar';

async function fetchType(type: string): Promise<any> {
  try {
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 4000);
    const res = await fetch(`${CMS_BASE}/api/public/${type}`, { signal: ctrl.signal });
    clearTimeout(timer);
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// pick the localized value, falling back to the English/base field, then undefined
const loc = (obj: any, base: string, locale: Locale) => {
  if (!obj) return undefined;
  const v = locale === 'ar' ? obj[base + 'Ar'] : obj[base];
  return typeof v === 'string' && v.trim() ? v : undefined;
};

const clean = (v: any) => (typeof v === 'string' && v.trim() ? v : undefined);

// Drop undefined keys so a spread/merge never overwrites a good default with a blank.
function compact<T extends Record<string, any>>(obj: T): Partial<T> {
  const out: any = {};
  for (const k of Object.keys(obj)) if (obj[k] !== undefined) out[k] = obj[k];
  return out;
}

export type CmsOverlay = {
  // localized text overrides, shaped to merge onto translations[locale]
  t: {
    hero?: Record<string, any>;
    services?: { items?: Array<{ title?: string; description?: string }> };
    projects?: { items?: Array<{ title?: string; category?: string; description?: string }> };
    testimonials?: { items?: Array<{ name?: string; role?: string; text?: string }> };
  };
  // media / non-text overrides, index-aligned with the site's arrays
  media: {
    services?: Array<{ image?: string }>;
    projects?: Array<{ before?: string; after?: string }>;
    testimonials?: Array<{ avatar?: string; rating?: number }>;
  };
  // contact / brand info
  brand: Record<string, string>;
};

const EMPTY: CmsOverlay = { t: {}, media: {}, brand: {} };

export async function getCmsOverlay(locale: Locale = 'en'): Promise<CmsOverlay> {
  const [settings, hero, services, projects, testimonials] = await Promise.all([
    fetchType('settings'), fetchType('hero'), fetchType('services'),
    fetchType('projects'), fetchType('testimonials'),
  ]);

  const overlay: CmsOverlay = { t: {}, media: {}, brand: {} };

  // ---- Hero ----
  if (hero && Object.keys(hero).length) {
    const h = compact({
      badge: loc(hero, 'eyebrow', locale),
      line1: loc(hero, 'heading1', locale),
      line2: loc(hero, 'heading2', locale),
      subtitle: loc(hero, 'description', locale),
      bookBtn: loc(hero, 'ctaPrimary', locale),
      inspectBtn: loc(hero, 'ctaSecondary', locale),
    });
    if (Object.keys(h).length) overlay.t.hero = h;
  }

  // ---- Services ----
  if (Array.isArray(services) && services.length) {
    const items = services.map((s) => compact({ title: loc(s, 'title', locale), description: loc(s, 'description', locale) }));
    const media = services.map((s) => compact({ image: clean(s.image) }));
    if (items.some((i) => Object.keys(i).length)) overlay.t.services = { items };
    if (media.some((i) => Object.keys(i).length)) overlay.media.services = media;
  }

  // ---- Projects ----
  if (Array.isArray(projects) && projects.length) {
    const items = projects.map((p) => compact({
      title: loc(p, 'title', locale), category: loc(p, 'category', locale), description: loc(p, 'description', locale),
    }));
    const media = projects.map((p) => compact({ before: clean(p.beforeImage), after: clean(p.afterImage) }));
    if (items.some((i) => Object.keys(i).length)) overlay.t.projects = { items };
    if (media.some((i) => Object.keys(i).length)) overlay.media.projects = media;
  }

  // ---- Testimonials ----
  if (Array.isArray(testimonials) && testimonials.length) {
    const items = testimonials.map((t) => compact({ name: loc(t, 'name', locale), role: loc(t, 'role', locale), text: loc(t, 'text', locale) }));
    const media = testimonials.map((t) => compact({ avatar: clean(t.avatar), rating: typeof t.rating === 'number' ? t.rating : undefined }));
    if (items.some((i) => Object.keys(i).length)) overlay.t.testimonials = { items };
    if (media.some((i) => Object.keys(i).length)) overlay.media.testimonials = media;
  }

  // ---- Brand / contact ----
  if (settings && Object.keys(settings).length) {
    overlay.brand = compact({
      name: clean(settings.companyName),
      phone: clean(settings.phone),
      whatsapp: clean(settings.whatsapp),
      email: clean(settings.email),
      address: locale === 'ar' ? (clean(settings.addressAr) ?? clean(settings.address)) : clean(settings.address),
      instagram: clean(settings.instagram),
      facebook: clean(settings.facebook),
      linkedin: clean(settings.linkedin),
    }) as Record<string, string>;
  }

  return { ...EMPTY, ...overlay };
}
