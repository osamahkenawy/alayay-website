# Alayay CMS Portal — Implementation Plan

## Overview
Build a headless CMS using **Sanity.io** (free tier) + a password-protected
admin route in the existing Next.js app. The client gets a clean UI to edit
all website content in English and Arabic without touching code.

---

## Phase 1 — Sanity Studio Setup
- [ ] 1.1  Create Sanity project (`sanity init`) linked to alayay workspace
- [ ] 1.2  Install Sanity client in Next.js (`@sanity/client`, `next-sanity`)
- [ ] 1.3  Configure `.env.local` with SANITY_PROJECT_ID, DATASET, TOKEN
- [ ] 1.4  Add Sanity Studio at `/studio` route (embedded in Next.js app)
- [ ] 1.5  Set up CORS to allow alayay.com origin in Sanity dashboard

---

## Phase 2 — Content Schemas (what the client can edit)

### Site Settings
- [ ] 2.1  Company name, tagline, phone, WhatsApp, email, address
- [ ] 2.2  Social media links (Instagram, Facebook, LinkedIn)
- [ ] 2.3  SEO defaults (meta title, meta description, OG image)

### Hero Section
- [ ] 2.4  Headline (EN + AR)
- [ ] 2.5  Subheadline / description (EN + AR)
- [ ] 2.6  CTA button labels and links
- [ ] 2.7  Background image

### Services
- [ ] 2.8  Service title, short description, long description (EN + AR)
- [ ] 2.9  Service icon selection
- [ ] 2.10 Service image upload
- [ ] 2.11 "What's included" bullet list (EN + AR)

### Projects
- [ ] 2.12 Project title, category, description (EN + AR)
- [ ] 2.13 Before/after image upload
- [ ] 2.14 Project status (completed / ongoing)

### Testimonials
- [ ] 2.15 Client name, role, review text (EN + AR)
- [ ] 2.16 Star rating
- [ ] 2.17 Avatar image upload

### About Page
- [ ] 2.18 Story paragraphs (EN + AR)
- [ ] 2.19 Core values (title + description, EN + AR)
- [ ] 2.20 Stats (years, projects, clients, satisfaction %)
- [ ] 2.21 Team member name, role, photo

### How It Works / Why Us
- [ ] 2.22 Steps content (EN + AR)
- [ ] 2.23 Features / reasons content (EN + AR)

### AMC Section
- [ ] 2.24 AMC plan names, prices, features (EN + AR)

### Footer
- [ ] 2.25 Footer tagline (EN + AR)
- [ ] 2.26 Quick links list
- [ ] 2.27 Copyright text

---

## Phase 3 — Connect Sanity to Next.js Pages

- [ ] 3.1  Create `lib/sanity.ts` — configured client + image URL builder
- [ ] 3.2  Replace hardcoded `translations.ts` strings with Sanity queries
- [ ] 3.3  Replace hardcoded `data.ts` constants with Sanity site settings
- [ ] 3.4  Update `getStaticProps` on all pages to fetch from Sanity
- [ ] 3.5  Update `services/[slug].tsx` to pull service details from Sanity
- [ ] 3.6  Add `revalidate: 60` (ISR) so edits go live within 60 seconds
- [ ] 3.7  Support `locale` in all Sanity queries (EN/AR bilingual fields)

---

## Phase 4 — Image Handling

- [ ] 4.1  Use Sanity's image CDN (`cdn.sanity.io`) for all uploaded images
- [ ] 4.2  Migrate existing local images (`/public/images/alayay/`) to Sanity assets
- [ ] 4.3  Update Next.js `next.config.js` to allow `cdn.sanity.io` domain

---

## Phase 5 — Admin Portal UI (Client-Facing)

- [ ] 5.1  Embed Sanity Studio at `alayay.com/studio`
- [ ] 5.2  Configure studio branding (Alayay logo, navy color theme)
- [ ] 5.3  Create client Sanity account with Editor role (limited access)
- [ ] 5.4  Hide developer-only schemas from client view
- [ ] 5.5  Add field descriptions/hints in Arabic for client guidance
- [ ] 5.6  Test all edit flows in studio (save → site updates within 60s)

---

## Phase 6 — Deploy & Handoff

- [ ] 6.1  Add Sanity env vars to server PM2 ecosystem.config.js
- [ ] 6.2  Redeploy to alayay.com with Sanity integration
- [ ] 6.3  Verify ISR revalidation works on production
- [ ] 6.4  Create client login credentials for Sanity Studio
- [ ] 6.5  Write simple Arabic guide (PDF) for client: how to edit content
- [ ] 6.6  Test on mobile — studio must be usable on phone/tablet

---

## Tech Stack

| Layer        | Tool                        |
|--------------|-----------------------------|
| CMS Backend  | Sanity.io (free tier)       |
| Frontend     | Next.js 13 (existing)       |
| Data Fetch   | GROQ queries via @sanity/client |
| Images       | Sanity Image CDN            |
| Hosting      | VPS (existing, port 3013)   |
| Studio URL   | https://alayay.com/studio   |

---

## Estimated Effort

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| Phase 1 — Setup         | 5  | 2 hrs  |
| Phase 2 — Schemas       | 27 | 4 hrs  |
| Phase 3 — Data Fetching | 7  | 4 hrs  |
| Phase 4 — Images        | 3  | 1 hr   |
| Phase 5 — Studio UI     | 6  | 2 hrs  |
| Phase 6 — Deploy        | 6  | 1 hr   |
| **Total**               | **54** | **~14 hrs** |

---

## Priority Order (if doing in stages)

1. Phase 1 + Phase 2 (schemas) — client can start adding content
2. Phase 3 (connect to site) — edits go live
3. Phase 4 (images) — upload photos from studio
4. Phase 5 (polish studio) — make it easy for client
5. Phase 6 (deploy + handoff)
