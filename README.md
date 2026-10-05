# Wessmaa — Marketing Website

The marketing site for **Wessmaa**, a software and growth studio. The name stands for **W**ebsite · **E**diting · **S**ocial · **S**EO · **M**arketing · **A**utomation · **A**ds.

Built with Next.js 15 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, shadcn/ui (Radix), Magic UI and Aceternity UI patterns, Motion, Lenis, react-hook-form + zod, and MDX.

---

## Quick start

```bash
# Node 20.18+ (or 22 LTS) recommended
npm install
cp .env.example .env.local   # optional; see "Environment variables"
npm run dev                  # http://localhost:3000
```

| Script                 | What it does                                          |
| ---------------------- | ----------------------------------------------------- |
| `npm run dev`          | Dev server with Turbopack                             |
| `npm run build`        | Production build (SSG for every route)                |
| `npm run start`        | Serve the production build                            |
| `npm run build` | Production build for Vercel or another Node.js-capable host |
| `npm run lint`         | ESLint (next/core-web-vitals + TypeScript)            |
| `npm run typecheck`    | `tsc --noEmit`                                        |
| `npm run format`       | Prettier (with the Tailwind class-sorting plugin)     |

---

## Environment variables

| Variable                     | Purpose                                                                                                                                                          |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`       | Canonical URL, used in metadata, the sitemap, OG tags and JSON-LD. Example: `https://wessmaa.com`                                                                |
| `NEXT_PUBLIC_FORMS_ENDPOINT` | Where every form posts JSON (Formspree, Basin, Getform, or your own API route). Unset = **demo mode**: forms validate and show success without sending anything. |

> **CV uploads:** the careers form validates the file (PDF/DOC/DOCX, 5 MB max) and sends its metadata. To store the file itself, point `NEXT_PUBLIC_FORMS_ENDPOINT` at a provider that accepts multipart uploads (for example Formspree or Basin), or add a route handler that uploads to S3 or Vercel Blob. The only file to change is `lib/forms.ts`.

---

## Project structure

```
app/                     Routes (App Router)
  page.tsx               Home (16 sections)
  services/ [slug]/      Services index + 12 detail pages (Service JSON-LD)
  solutions/             Productised packages
  work/ [slug]/          Filterable portfolio + 6 case studies
  pricing/               Tiers, monthly/project toggle, comparison, FAQ
  about/ careers/ [slug] Company, culture, jobs (JobPosting JSON-LD), application form
  blog/ [slug]/          MDX blog: search, categories, pagination, TOC, progress bar
  contact/ book/ quote/  Multi-step contact, Cal.com embed, live estimator
  faq/                   Categorised, searchable FAQ (FAQPage JSON-LD)
  privacy-policy/ terms/ cookie-policy/
  not-found.tsx          Animated 404
  sitemap.ts robots.ts manifest.ts
components/
  ui/                    shadcn/ui primitives (button, card, dialog, sheet, tabs, accordion, form, …)
  magicui/               Blur fade, shimmer button, border beam, magic card, number ticker, marquee, …
  aceternity/            Spotlight, background beams, tracing beam, container scroll, 3D card, …
  sections/              Page sections (home/*, pricing, work grid, job board, FAQ, CTA)
  forms/                 Contact, quote estimator, job application, shared fields
  blog/                  Post card, index, TOC, reading progress, share buttons, MDX components
  layout/                Navbar (mega menu + mobile sheet), footer, cookie consent, sticky mobile CTA
  shared/                Logo, container, section heading, CTA button, icons, cards, JSON-LD
  providers/             Lenis smooth scroll, page transitions, Motion config
config/site.ts           ALL global copy and links: nav, CTAs, hero, stats, footer, contact, socials
content/                 Services, case studies, team, testimonials, pricing, FAQ, jobs, legal, blog/*.mdx
lib/                     SEO helpers, blog loader, forms, motion tokens, utils
hooks/                   Media-query and reduced-motion hooks
public/                  Logo, icons, OG image, fonts (Satoshi), images
```

### Editing content

- **Copy, navigation, CTAs, contact details and social links:** `config/site.ts`
- **Services:** `content/services.ts` (each entry generates `/services/<slug>`)
- **Case studies:** `content/case-studies.ts`
- **Team, testimonials, pricing, FAQ, jobs, values, timeline:** `content/company.ts`
- **Estimator prices:** `content/estimator.ts`
- **Legal pages:** `content/legal.ts`. Have a lawyer review them before launch.
- **Blog posts:** add a `.mdx` file to `content/blog/` with this front-matter:

```mdx
---
title: "Post title"
excerpt: "One-sentence summary."
date: "2026-09-30"
category: "Product"
author: "abdul-waris" # key from lib/blog.ts → authors
cover: "/images/blog/cover.webp"
featured: false
---
```

`##` and `###` headings appear in the table of contents automatically. You can use `<Callout title="…">…</Callout>` inside posts.

---

## Design system

Tokens live in `app/globals.css` under `@theme`.

- **Surfaces:** `#FFFFFF`, `#F8FAFC`, `#F1F5F9`
- **Navy:** `#0A1F44`, `#1E3A8A`, `#2563EB`
- **Orange:** `#F97316`, `#FF8A3D`, `#FFF1E6`
- **Text:** body `#334155`, muted `#64748B`
- **Borders:** `#E2E8F0`
- **Brand gradient:** `linear-gradient(90deg, #1E3A8A, #F97316)`. Use it only for headline highlights and special buttons.
- **Type:** Satoshi (display, self-hosted variable font), Inter (body) and Instrument Serif italic (accent words). All sizes use fluid `clamp()`.
- **Motion:** 200–700 ms with easing `[0.22, 1, 0.36, 1]`. All motion respects `prefers-reduced-motion`.
- **Accessibility:** skip link, orange focus rings, 44px minimum touch targets, and WCAG AA contrast.

---

## SEO

- Per-page metadata comes from `buildMetadata()` in `lib/seo.ts` and covers canonical URLs, Open Graph and Twitter cards.
- JSON-LD:
  - Organization (every page)
  - BreadcrumbList (inner pages)
  - Service (service pages)
  - Article (blog posts and case studies)
  - FAQPage (FAQ sections)
  - JobPosting (job pages)
- `sitemap.xml`, `robots.txt` and the web manifest are generated at build time.

---

## Deploying to Vercel

1. Push this folder to a GitHub, GitLab or Bitbucket repository:
   ```bash
   git init && git add -A && git commit -m "Wessmaa website"
   git remote add origin git@github.com:<you>/wessmaa-website.git
   git push -u origin main
   ```
2. In Vercel, click **Add New → Project** and import the repository. Vercel detects Next.js automatically; keep the default build command (`next build`) and output settings.
3. Under **Settings → Environment Variables**, add `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_FORMS_ENDPOINT` and `NEXT_PUBLIC_BOOKING_URL`.
4. Click **Deploy**. Then add your domain under **Settings → Domains** and point DNS to Vercel (an `A` record to `76.76.21.21`, or a `CNAME` to `cname.vercel-dns.com`).
5. Submit `https://<your-domain>/sitemap.xml` in Google Search Console.

To deploy from the CLI instead: `npm i -g vercel && vercel && vercel --prod`.

**Other hosts (Netlify, Cloudflare Pages, S3):** run `npm run build:static` and upload the `/out` folder.

---

## Launch checklist

- [ ] Replace the phone number, address and social links in `config/site.ts`
- [ ] Set `NEXT_PUBLIC_FORMS_ENDPOINT` and send a test through every form
- [ ] Connect your Cal.com event and set `NEXT_PUBLIC_BOOKING_URL`
- [ ] Replace the sample case studies, team photos and testimonials with real ones
- [ ] Have the legal pages reviewed
- [ ] Add analytics (for example Vercel Analytics or Plausible), loaded only after cookie consent
