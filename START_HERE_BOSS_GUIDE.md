# 📌 START HERE — Guide for Website Owner & Administrators

Dear Website Owner / Administrator,

This package contains the complete, production-ready website for **WESSMAA** (`https://wessmaa.com`). 

Everything has been engineered for high speed, search engine optimization (SEO), mobile responsiveness, and bank-grade web security.

---

## 📋 What is inside this project?
1. **Public Website:** Complete marketing platform including 16 homepage sections, 12 service detail pages, interactive solutions calculator, portfolio case studies, and careers portal.
2. **Admin Portal (`/admin`):** A private control center where you can view client quote requests, incoming contact messages, and job candidates with their attached resumes.
3. **Automated Email Engine:** Built-in system that automatically sends email notifications to you when clients get in touch, and sends branded confirmation receipts to clients.
4. **Automated SEO:** XML sitemaps, robots crawl policies, Googlebot directives, and JSON-LD structured schemas are built right into the code.

---

## 🚀 How to Launch / Deploy This Website (Step-by-Step)

### Step 1: Upload to GitHub (or send to your developer)
- You can give this folder to your in-house IT team or upload it to your company GitHub / GitLab account.

### Step 2: Deploy on Vercel (Free & Instant)
1. Go to [vercel.com](https://vercel.com) and create an account with your company email.
2. Click **Add New...** > **Project** and select this repository.
3. Add your production environment variables (see `.env.example` or Section 5 below).
4. Click **Deploy**. Your website will be live in less than 2 minutes.

### Step 3: Connect Your Hostinger Domain (`wessmaa.com`)
1. In your **Vercel Project**: Go to **Settings** > **Domains** > Add `wessmaa.com`.
2. In your **Hostinger Account**:
   - Go to **Domains** > Click **Manage** next to `wessmaa.com` > Click **DNS / Nameservers**.
   - Add/edit these 2 records in the DNS records table:
     - **A Record:** Name: `@` | Points to: `76.76.21.21`
     - **CNAME Record:** Name: `www` | Points to: `cname.vercel-dns.com`
3. That's it! Within 15 minutes, your domain will load the new website with a free SSL padlock.

### Step 4: Setup Your Official Hostinger Email (`info@wessmaa.com`)
1. In Hostinger hPanel > **Emails**, create your mailbox (e.g. `info@wessmaa.com`).
2. In Vercel Project Settings > **Environment Variables**, set:
   - `SMTP_HOST`: `smtp.hostinger.com`
   - `SMTP_PORT`: `465`
   - `SMTP_USER`: `info@wessmaa.com`
   - `SMTP_PASSWORD`: (your mailbox password)
   - `EMAIL_FROM`: `Wessmaa <info@wessmaa.com>`
   - `ADMIN_EMAIL`: `info@wessmaa.com`

### Step 5: Database & Admin Password
- The website connects to a free serverless PostgreSQL database on [neon.tech](https://neon.tech).
- Your Admin dashboard is at `https://wessmaa.com/admin`.
- Default login: `admin@wessmaa.com` / `admin123456`.
- You can change your password anytime by running `node scripts/hash-password.mjs "YourNewPassword"`.

---

## 📞 How to Edit Contact Info & Content
All company details are easily editable in plain text files:
- **Phone number, office address, WhatsApp link, social handles:** Open `config/site.ts`
- **Services offered:** Open `content/services.ts`
- **Portfolio & Case studies:** Open `content/case-studies.ts`
- **Team members & executive bios:** Open `content/company.ts`

For technical questions or local development instructions, see the accompanying `README.md` and `COMPANY_HANDOVER_GUIDE.md`.
