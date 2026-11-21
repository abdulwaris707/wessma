# WESSMAA — Digital Growth Platform

Official web platform for **WESSMAA Digital Growth Company** (`https://wessmaa.com`). 
The company combines technology, creative content, social media, SEO, marketing, advertising, and business automation into a single growth stack.

> For setup instructions, hosting on Vercel, connecting the Hostinger domain, and email configuration, see **[HANDOVER_GUIDE.md](./HANDOVER_GUIDE.md)**.

---

## 🌟 Platform Highlights

- **Modern Web Architecture:** Built with Next.js 15 (App Router), React 19, TypeScript (strict mode), and Tailwind CSS v4.
- **Enterprise Design & Polish:** Aceternity UI, Magic UI, Radix UI primitives, Lucide icons, Framer Motion animations, and Lenis smooth scrolling.
- **Full SEO Optimization:** Dynamic OpenGraph & Twitter image generation, Googlebot rich snippet directives, automated XML sitemap (`/sitemap.xml`), robots.txt, and Schema.org JSON-LD structured data.
- **Security Pre-configured:** Strict-Transport-Security (HSTS), X-Frame-Options, X-Content-Type-Options, Referrer-Policy, and Permissions-Policy headers.
- **Admin Management Portal:** Dedicated dashboard at `/admin` for reviewing quote requests, client enquiries, and job applications.
- **Automated Communication:** Built-in email dispatch via Hostinger SMTP, Google Workspace, or Resend Cloud API with automatic database delivery logging.

---

## 🛠️ Tech Stack & Libraries

| Category | Technology |
|---|---|
| **Core Framework** | Next.js 15 (App Router), React 19, TypeScript 5 |
| **Styling & Theme** | Tailwind CSS v4, PostCSS |
| **UI Components** | shadcn/ui (Radix Primitives), Magic UI, Aceternity UI |
| **Animation & Motion** | Framer Motion, Lenis Smooth Scrolling |
| **Database** | Neon Serverless PostgreSQL (`@neondatabase/serverless`) |
| **Form Handling** | `react-hook-form`, `zod` schema validation, Honeypot bot protection |
| **Icons & Media** | Lucide React, Self-hosted Satoshi variable fonts |
| **Email Service** | Nodemailer (SMTP) & Resend API |

---

## 📁 Repository Structure

```
wessmaa/
├── app/                  # Next.js App Router (Pages, layouts, API routes, sitemap, robots)
│   ├── about/            # About page, leadership, company values & timeline
│   ├── admin/            # Secure admin dashboard & login portal
│   ├── api/              # Backend endpoints (contact, careers, admin API)
│   ├── careers/          # Career portal & dynamic job openings [slug]
│   ├── contact/          # Multi-step contact enquiry form
│   ├── quote/            # Interactive project cost & timeline estimator
│   ├── services/         # 12 Digital growth services & dynamic detail pages [slug]
│   ├── solutions/        # Productised digital packages & ROI frameworks
│   └── work/             # Filterable portfolio & 6 in-depth case studies [slug]
├── components/           # Reusable UI primitives, cards, sections, and form controls
├── config/               # Global site configuration, navigation, and company metadata
├── content/              # Core business copy (services, team, jobs, testimonials, legal)
├── lib/                  # Database client, authentication, SEO builders, email dispatcher
├── public/               # Static assets (brand logos, OG sharing images, web fonts)
├── scripts/              # Migration utilities, password hasher, and automated test suite
├── HANDOVER_GUIDE.md     # Complete owner & developer operations guide
└── package.json          # Project scripts and dependencies
```

---

## 🧪 Verification & Quality Control

The project includes an automated test suite verifying form validations, anti-bot protection, authentication security, and database models:

```bash
npm test          # Run unit validation and security tests
npm run typecheck # Run strict TypeScript check (0 errors)
```
