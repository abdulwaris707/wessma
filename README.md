# WESSMAA — Official Production Source Code & Deployment Guide

Welcome to the official source code of the **WESSMAA Digital Growth Company** website (`https://wessmaa.com`).

This project is built using modern production-grade technologies:
- **Framework:** Next.js 15 (App Router with TypeScript)
- **Styling & UI:** Tailwind CSS v4, Lucide Icons, Framer Motion, Lenis Smooth Scroll
- **Database:** Neon Serverless PostgreSQL
- **Admin Dashboard:** Built-in portal at `/admin` (Manage enquiries, quote requests, and job applicants)
- **Email Service:** Built-in SMTP (Hostinger / Google Workspace) and Resend API support
- **Hosting:** Ready for Vercel, Node.js VPS, or Docker container
- **SEO & Security:** Pre-configured security headers (HSTS, CSP, X-Frame-Options), dynamic XML sitemap, robots.txt, and JSON-LD structured schemas

---

## ⚡ Quick Start: Run Locally in 3 Steps

### Step 1: Install Dependencies
Open terminal in this directory and run:
```bash
npm install
```

### Step 2: Configure Environment Variables
Copy the template configuration file:
```bash
# On Windows (PowerShell):
Copy-Item .env.example .env.local

# On Mac / Linux:
cp .env.example .env.local
```
Open `.env.local` in your editor and enter your database and email credentials (see Section below).

### Step 3: Start the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🚀 How to Deploy to Vercel (Recommended)

1. Push this folder to your company's **GitHub**, **GitLab**, or **Bitbucket** account.
2. Go to [Vercel](https://vercel.com) and log in with your company account.
3. Click **Add New...** > **Project** and select your repository.
4. Add the required Environment Variables in Vercel Project Settings (see below).
5. Click **Deploy**.

---

## 🌐 How to Connect Your Hostinger Domain to Vercel

1. In your **Vercel Project**:
   - Go to **Settings** > **Domains**.
   - Enter your domain (e.g. `wessmaa.com`) and click **Add**.
2. In your **Hostinger hPanel**:
   - Go to **Domains** > Click **Manage** next to `wessmaa.com`.
   - Click **DNS / Nameservers** in the left menu.
   - In the **Manage DNS records** table, set these two records:
     - **Record 1 (A Record):**
       - Type: `A` | Name: `@` | Points to: `76.76.21.21` | TTL: `300`
     - **Record 2 (CNAME Record):**
       - Type: `CNAME` | Name: `www` | Points to: `cname.vercel-dns.com` | TTL: `300`
3. Save changes. Within 5–30 minutes, Vercel will issue a free SSL (HTTPS) certificate and your site will be live!

---

## 📧 How to Connect Your Official Hostinger Email

When clients fill out the contact form or candidates submit job applications, the website automatically sends notification emails.

To use your Hostinger business email (e.g. `info@wessmaa.com`):
1. In Hostinger hPanel > **Emails** > **Email Accounts**, create your mailbox (e.g. `info@wessmaa.com`).
2. Add these variables to your Vercel Project Settings (or local `.env.local`):
   ```env
   EMAIL_FROM=Wessmaa <info@wessmaa.com>
   ADMIN_EMAIL=info@wessmaa.com
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_USER=info@wessmaa.com
   SMTP_PASSWORD=your-hostinger-mailbox-password
   ```

*(If you use Google Workspace instead, use `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, and a 16-character Google App Password).*

---

## 🗄️ Database Setup (Neon PostgreSQL)

The website uses Neon Serverless PostgreSQL to store enquiries and job applications.
1. Create a free project at [console.neon.tech](https://console.neon.tech).
2. Copy the connection string (`postgresql://...`).
3. Run the database migration script once to create tables:
   ```bash
   DATABASE_URL="your-neon-connection-string" node scripts/migrate.mjs
   ```
4. Set `DATABASE_URL` in Vercel Environment Variables.

---

## 🔐 Admin Dashboard Access

- **Dashboard URL:** `https://yourdomain.com/admin`
- **Login URL:** `https://yourdomain.com/admin/login`
- **Default Login:**
  - Email: `admin@wessmaa.com` (or your configured `ADMIN_EMAIL`)
  - Password: `admin123456`

### To change the Admin Password:
Run this command in your terminal:
```bash
node scripts/hash-password.mjs "YourNewPasswordHere"
```
Copy the generated hash (`scrypt:...`) and set it as `ADMIN_PASSWORD_HASH` in Vercel Environment Variables.

---

## ✏️ How to Edit Website Content

- **Company Phone, Email, Office Address, Socials, Header & Footer:** `config/site.ts`
- **12 Services (Descriptions, Deliverables, FAQs):** `content/services.ts`
- **Case Studies & Portfolio:** `content/case-studies.ts`
- **Team Members, Values, Milestones & Jobs:** `content/company.ts`
- **Privacy Policy, Terms, Cookies:** `content/legal.ts`
- **Logos & Images:** `public/images/` and `public/logo-mark.png`

---

## 🧪 Testing & Verification

Run the built-in test suite:
```bash
npm test        # Runs unit validation & security tests
npm run typecheck # Verifies TypeScript type safety
```
