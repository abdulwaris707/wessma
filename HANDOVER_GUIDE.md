# WESSMAA Website — Project Operations & Handover Guide

This guide contains everything required to **run**, **host**, **connect the domain**, **configure official company emails**, and **manage content** for the WESSMAA website (`https://wessmaa.com`).

---

## 1. Quick Start: How to Run Locally

### Step 1: Install Dependencies
Open terminal in the project folder and run:
```bash
npm install
```

### Step 2: Create Environment Variables
Copy the template configuration file:
```bash
# On Windows (PowerShell):
Copy-Item .env.example .env.local

# On Mac / Linux:
cp .env.example .env.local
```

### Step 3: Start Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 2. How to Host & Deploy on Vercel

1. Create or log in to your account at **[vercel.com](https://vercel.com)**.
2. Push or import this project repository into Vercel (**Add New... > Project**).
3. Under **Environment Variables**, add the values from `.env.example` (see Section 6 below).
4. Click **Deploy**. Your website will be live in 1–2 minutes.

---

## 3. How to Connect Your Hostinger Domain (`wessmaa.com`)

### In Vercel:
1. In your Vercel Project, go to **Settings** > **Domains**.
2. Enter your domain: `wessmaa.com` (select the recommended option to redirect `wessmaa.com` to `www.wessmaa.com`).

### In Hostinger:
1. Log into **[Hostinger hPanel](https://hpanel.hostinger.com)**.
2. Go to **Domains** > Click **Manage** next to `wessmaa.com`.
3. Select **DNS / Nameservers** in the left menu.
4. In the **Manage DNS records** table, set these two records:
   - **Record 1 (A Record for Root Domain):**
     - **Type:** `A`
     - **Name:** `@`
     - **Points to:** `76.76.21.21`
     - **TTL:** `300` (or default)
   - **Record 2 (CNAME Record for WWW):**
     - **Type:** `CNAME`
     - **Name:** `www`
     - **Points to:** `cname.vercel-dns.com`
     - **TTL:** `300` (or default)
5. Save changes. Within 5–30 minutes, Vercel will show a green **"Valid Configuration"** checkmark and issue a free SSL certificate.

---

## 4. How to Setup Official Hostinger Email (`info@wessmaa.com`)

When clients submit the contact form or candidates submit job applications, the website automatically sends notification emails to the company and confirmation receipts to the client.

To use your Hostinger business email:
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

## 5. Database Setup (Neon PostgreSQL)

The website uses Neon Serverless PostgreSQL to store enquiries and job applications.
1. Create a free project at **[neon.tech](https://neon.tech)**.
2. Copy the connection string (`postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require`).
3. Run the database migration script once to create tables:
   ```bash
   DATABASE_URL="your-neon-connection-string" node scripts/migrate.mjs
   ```
4. Set `DATABASE_URL` in Vercel Environment Variables.

---

## 6. Environment Variables Reference

Configure these in Vercel under **Project Settings > Environment Variables**:

| Variable | Required | Description | Example Value |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical live site URL | `https://wessmaa.com` |
| `DATABASE_URL` | Yes | Neon PostgreSQL pooled connection string | `postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require` |
| `ADMIN_EMAIL` | Yes | Email permitted to log into `/admin` and receive notifications | `info@wessmaa.com` |
| `ADMIN_PASSWORD_HASH` | Yes | Scrypt hash of admin password | `scrypt:<salt>:<hash>` |
| `SESSION_SECRET` | Yes | 32+ character random secret for signing cookies | `SHj4CCDBLePv6FiC25/TmG2MYkV23o7rOB7udHDW1Ds=` |
| `EMAIL_FROM` | Yes | Visible sender name & email | `Wessmaa <info@wessmaa.com>` |
| `SMTP_HOST` | If using SMTP | Hostinger or Google SMTP server | `smtp.hostinger.com` |
| `SMTP_PORT` | If using SMTP | SMTP port (465 for SSL, 587 for TLS) | `465` |
| `SMTP_USER` | If using SMTP | Official mailbox username/email | `info@wessmaa.com` |
| `SMTP_PASSWORD` | If using SMTP | Mailbox password | `your-secret-password` |

---

## 7. Admin Dashboard Access

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

## 8. How to Edit Website Content

- **Company Phone, Email, Office Address, Socials, Header & Footer:** `config/site.ts`
- **12 Services (Descriptions, Deliverables, FAQs):** `content/services.ts`
- **Case Studies & Portfolio:** `content/case-studies.ts`
- **Team Members, Values, Milestones & Jobs:** `content/company.ts`
- **Privacy Policy, Terms, Cookies:** `content/legal.ts`
- **Logos & Images:** `public/images/` and `public/logo-mark.png`
