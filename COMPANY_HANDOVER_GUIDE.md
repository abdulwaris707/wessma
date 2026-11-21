# WESSMAA Website — Production Handover & Deployment Guide

This document is the complete, official handover manual for the **WESSMAA Digital Growth Company** website (`https://wessmaa.com`). It covers everything required to transfer ownership, run the site locally, deploy to production on Vercel, connect the Hostinger domain, configure the Neon PostgreSQL database, and manage website content.

---

## 1. Project & Tech Stack Overview

- **Framework:** Next.js 15 (App Router with TypeScript & Strict Typing)
- **Styling:** Tailwind CSS v4, Lucide Icons, Framer Motion, Lenis Smooth Scroll
- **Database:** Neon Serverless PostgreSQL (Stores enquiries, job applications, and career postings)
- **Hosting / Serverless:** Vercel
- **Domain Registrar:** Hostinger
- **Admin Portal:** Built-in dashboard at `/admin` (Protected with scrypt-hashed passwords & HTTP-only secure cookie sessions)

---

## 2. Handover: Transferring to the Company Accounts

Follow these steps to transfer full control from the developer's personal accounts to the company's official accounts.

### Step 1: GitHub Repository Transfer
The company needs ownership of the code repository so future updates can be pushed securely.

1. **If the company has a GitHub account/organization:**
   - On the current repository: Go to **Settings** > Scroll down to the **Danger Zone** > Click **Transfer ownership**.
   - Enter the company's GitHub username or Organization name.
   - The company owner will receive an email/notification to accept the transfer.
2. **Alternative (Fresh Push to Company Repo):**
   - Create a new empty repository in the company GitHub account (e.g., `github.com/company/wessmaa-website`).
   - Run in the project terminal:
     ```bash
     git remote set-url origin https://github.com/company/wessmaa-website.git
     git push -u origin main
     ```

---

### Step 2: Vercel Project Handover & Deployment
Vercel is the recommended hosting platform for Next.js 15.

1. **Option A: Transfer Existing Vercel Project (Easiest)**
   - Developer logs into [Vercel](https://vercel.com).
   - Go to the project: **Settings** > **General** > Scroll down to **Transfer Project**.
   - Enter the company's Vercel Team name or company Vercel account email.
2. **Option B: Fresh Import into Company's Vercel Account**
   - Company logs into their official [Vercel](https://vercel.com) account.
   - Click **Add New...** > **Project**.
   - Select the transferred GitHub repository (`wessmaa-website`).
   - Under **Environment Variables**, paste the required production variables (see Section 4 below).
   - Click **Deploy**.

---

### Step 3: Neon PostgreSQL Database Setup
The website uses Neon Serverless PostgreSQL for dynamic features (Contact form submissions, quote requests, job applications, and job board management).

1. Go to [Neon Console](https://console.neon.tech) and create an official company account.
2. Click **Create Project** (Name: `wessmaa-db`, Region: choose closest, e.g. Frankfurt / AWS Singapore).
3. Copy the **Connection string** (Starts with `postgresql://...`).
4. Ensure the tables are initialized by running the migration script:
   ```bash
   DATABASE_URL="your-neon-connection-string" npm run db:migrate # or run scripts/migrate.mjs
   ```
5. Add this `DATABASE_URL` to Vercel's Environment Variables.

---

### Step 4: Connecting the Hostinger Domain to Vercel

To point your custom domain (purchased on Hostinger) to the Vercel-hosted website:

#### In Vercel:
1. Go to **Settings** > **Domains**.
2. Enter your domain (e.g. `wessmaa.com`) and click **Add**.
3. Choose the recommended option to redirect `wessmaa.com` to `www.wessmaa.com` (or vice-versa).
4. Vercel will display the required DNS records:
   - **A Record**: Name `@`, Value `76.76.21.21`
   - **CNAME Record**: Name `www`, Value `cname.vercel-dns.com`

#### In Hostinger hPanel:
1. Log into [Hostinger hPanel](https://hpanel.hostinger.com).
2. Go to **Domains** > Click **Manage** next to your domain.
3. In the left navigation, select **DNS / Nameservers**.
4. In the **Manage DNS records** section, add or update the following two records:
   - **Record 1 (A Record for Root Domain):**
     - **Type:** `A`
     - **Name:** `@`
     - **Points to:** `76.76.21.21`
     - **TTL:** `300` (or default)
     *(If an `@` record already exists, edit it and change the IP to `76.76.21.21`).*
   - **Record 2 (CNAME Record for WWW):**
     - **Type:** `CNAME`
     - **Name:** `www`
     - **Target:** `cname.vercel-dns.com`
     - **TTL:** `300` (or default)
     *(If a `www` record already exists, edit it and change target to `cname.vercel-dns.com`).*
5. Save changes. Within 5–30 minutes, Vercel will show a green **"Valid Configuration"** checkmark and issue a free SSL certificate.

---

## 3. Administrator Dashboard & Access

The website includes an administrative dashboard to review incoming inquiries, client quote requests, and job applicants.

- **Admin URL:** `https://yourdomain.com/admin`
- **Login URL:** `https://yourdomain.com/admin/login`
- **Default Credentials (Local/Fallback):**
  - Email: `admin@wessmaa.com` (or the email configured in `ADMIN_EMAIL`)
  - Default Password: `admin123456`

### Changing the Admin Password in Production:
To set a secure custom password:
1. Run the password hashing utility locally:
   ```bash
   node scripts/hash-password.mjs "YourSuperSecretPassword"
   ```
2. Copy the resulting scrypt hash output (starts with `scrypt:...`).
3. In Vercel Project Settings > **Environment Variables**, update `ADMIN_PASSWORD_HASH` with this hash.
4. Redeploy or restart the deployment.

---

## 4. Environment Variables Reference

Configure these in Vercel under **Project Settings > Environment Variables** (Environment: **Production, Preview, Development**):

| Variable | Description | Example Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical public URL of the live site | `https://wessmaa.com` |
| `DATABASE_URL` | Neon PostgreSQL pooled connection string | `postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require` |
| `ADMIN_EMAIL` | Official administrator login email | `info@wessmaa.com` |
| `ADMIN_PASSWORD_HASH` | Secure scrypt hash of the admin password | `scrypt:<salt>:<hash>` |
| `SESSION_SECRET` | 32+ character random secret for signing cookies | Generate with `openssl rand -base64 32` |
| `NEXT_PUBLIC_BOOKING_URL` | Booking/Discovery call link (Cal.com or Calendly) | `https://cal.com/wessmaa/discovery-call` |
| `RESEND_API_KEY` | *(Optional)* For transactional email confirmations | `re_1234567890abcdef` |

---

## 5. Website Content Management (Where to Edit What)

All company-specific content is structured into simple, maintainable configuration files:

- **Company Info, Contact, Socials, Header & Footer:**
  - File: `config/site.ts`
  - Edit phone number, email, physical office address, WhatsApp link, social media handles, and navbar links here.
- **Services (12 Digital Growth Offerings):**
  - File: `content/services.ts`
  - Edit service descriptions, features, deliverables, process steps, and FAQs.
- **Case Studies / Portfolio:**
  - File: `content/case-studies.ts`
  - Add or update client projects, metrics, quotes, and screenshots.
- **Team Members, Values, Milestones & Open Roles:**
  - File: `content/company.ts`
  - Update team members, executive bios, LinkedIn profiles, and job listings.

---

## 6. SEO & Post-Launch Checklist

1. **Google Search Console Verification:**
   - Log into [Google Search Console](https://search.google.com/search-console).
   - Add property: `https://wessmaa.com`.
   - Verify via DNS TXT record in Hostinger, or via HTML tag in Next.js layout.
   - Go to **Sitemaps** and submit: `https://wessmaa.com/sitemap.xml`.
2. **Robots & Sitemap Verification:**
   - Public sitemap URL: `https://wessmaa.com/sitemap.xml`
   - Public robots URL: `https://wessmaa.com/robots.txt`
   - Notice that `/admin/` and `/api/` are automatically disallowed from crawler indexation for privacy and security.
3. **Google Analytics (GA4):**
   - Create a Google Analytics 4 property and add your measurement tag in `app/layout.tsx` if desired.

---

## 7. Local Development Setup (For Future Developers)

```bash
# 1. Clone the repository
git clone <repository-url>
cd wessmaa

# 2. Install dependencies (Node.js 20+ required)
npm install

# 3. Create local environment file
cp .env.example .env.local

# 4. Start local development server
npm run dev
# Website runs at http://localhost:3000
```
