# ANA Candles — ana-gift

Luxury zodiac-inspired candle brand site for **ANA Candles** (Dubai, UAE).
Built with Next.js 13 + Tailwind CSS.

> *A Candle That Feels Like You.*

---

## Stack

- **Next.js** 13.5 (pages router)
- **React** 18
- **Tailwind CSS** 3 (custom `ana` brand palette: ink black, brushed gold, cream)
- **TypeScript**
- Custom fonts via Google Fonts: *Cormorant Garamond* + *Inter*

## Local development

```bash
npm install
npm run dev
# http://localhost:3000
```

## Environment

Copy `.env.example` to `.env.local` and set the public site URL (used for canonical, OG, JSON-LD, sitemap):

```bash
NEXT_PUBLIC_SITE_URL=https://anacandles.com
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server on http://localhost:3000 |
| `npm run build` | Production build |
| `npm start` | Run production build |

## Project structure

```
public/
  favicon.ico, og-image.png, robots.txt, site.webmanifest
  images/ana/
    logos/      ANA logo
    bg/         hero + order CTA backgrounds
    products/   12 zodiac + 4 signature candle PNGs
src/
  components/ana/
    Layout, Header, Footer, Seo, icons, data
    sections/   Hero, About, Signature, Zodiac, Gifts, OrderCTA
  pages/
    index.tsx, about.tsx, sitemap.xml.ts, _app.tsx, _document.tsx
  assets/styles/index.css   Tailwind + ANA utilities
tailwind.config.js          ANA brand palette + animations
```

## SEO

- Centralized in `src/components/ana/Seo.tsx`
- Per-page override via `<Layout title="…" description="…" ogImage="…" canonical="…" />`
- Emits Open Graph, Twitter `summary_large_image`, JSON-LD (Organization + WebSite)
- `/sitemap.xml` and `/robots.txt` ready out of the box

## Contact

- WhatsApp: +971 55 535 9422
- Email: Ana.19.19.19.1992@gmail.com
