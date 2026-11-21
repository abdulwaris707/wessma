# WESSMAA Website — Complete Production Handover & Deployment Manual

This document is the official, all-in-one technical handover manual for the **WESSMAA Digital Growth Company** website (`https://wessmaa.com`). It is written for company owners, administrators, and incoming developers so that they can run, host, secure, configure official emails, and manage the website independently.

---

## 1. Handover Options: How to Receive & Set Up the Project

The project can be handed over via **GitHub** (recommended for continuous deployment) OR as a **Clean ZIP Archive** (direct folder transfer).

---

### Option A: Direct ZIP Archive Handover (Folder Transfer)

If transferring the codebase as a `.zip` archive, follow these rules:

#### Important: What MUST be EXCLUDED from the ZIP for Security:
Before creating the ZIP, ensure the following are NOT included:
- ❌ **`node_modules/`**: Never zip this folder (it takes gigabytes and causes errors on different operating systems. The receiver will install it fresh via `npm install`).
- ❌ **`.next/` & `out/`**: Temporary build cache and output folders.
- ❌ **`.env.local`**: **NEVER INCLUDE `.env.local` IN THE ZIP!** It contains the original developer's private database credentials, password hashes, and session secrets. The clean template file `.env.example` is provided instead.
- ❌ **`.git/`**: Optional (can be removed if transferring clean source code).

#### How the Receiver Sets Up from the Unzipped Folder:
1. Extract the ZIP archive on your computer.
2. Open terminal in the project directory:
   ```bash
   cd wessmaa
   npm install
   ```
3. Create your own local configuration file:
   ```bash
   cp .env.example .env.local
   ```
4. Open `.env.local` and add your own official company database and email details.
5. Start local development server:
   ```bash
   npm run dev
   # Open http://localhost:3000 in your browser
   ```

---

### Option B: GitHub Repository Handover (Continuous Deployment)

1. The current developer transfers repository ownership:
   - On GitHub: Go to **Settings** > **Danger Zone** > **Transfer ownership**.
   - Enter the company's GitHub account or Organization name.
2. Once accepted, the company has complete, private control over all code branches.
3. Every time code is committed to `main`, Vercel automatically deploys the latest version.

---

## 2. Official Company Email Configuration (Hostinger & Resend)

The website is equipped with an automated email notification system (in `lib/email.ts`). When:
- A client submits a **Contact Enquiry** or **Project Quote Request**
- A candidate submits a **Job Application** (with attached CV)
- An administrator sends an **Email Reply** from `/admin`

The system automatically sends branded confirmation emails to the client/candidate AND delivers an instant alert to the company administration.

### Method 1: Hostinger Business Email (Recommended if domain is on Hostinger)

If you purchased your domain on Hostinger, you get Hostinger Business Email (Titan or Hostinger Webmail).

1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com) > **Emails** > **Email Accounts**.
2. Create your official company email (e.g. `info@wessmaa.com`, `hello@wessmaa.com`, or `careers@wessmaa.com`).
3. Set a strong mailbox password.
4. Add these variables to your Vercel Project Settings (**Settings > Environment Variables**):
   ```env
   EMAIL_FROM=Wessmaa <info@wessmaa.com>
   ADMIN_EMAIL=info@wessmaa.com
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_USER=info@wessmaa.com
   SMTP_PASSWORD=your-hostinger-email-password
   ```

### Method 2: Google Workspace (Gmail SMTP)

If your company uses Google Workspace (`@wessmaa.com` via Gmail):
1. In Google Account Security: Enable **2-Step Verification**.
2. Search for **App Passwords** and generate a 16-character password for "Mail".
3. Add to Vercel Environment Variables:
   ```env
   EMAIL_FROM=Wessmaa <info@wessmaa.com>
   ADMIN_EMAIL=info@wessmaa.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=info@wessmaa.com
   SMTP_PASSWORD=your-16-char-google-app-password
   ```

### Method 3: Resend Cloud API (Alternative)

1. Create a free account on [resend.com](https://resend.com).
2. Add your domain `wessmaa.com` and verify the 3 DNS records provided by Resend.
3. Generate an API Key (starts with `re_...`).
4. Set in Vercel:
   ```env
   EMAIL_FROM=Wessmaa <info@wessmaa.com>
   RESEND_API_KEY=re_1234567890abcdef
   ```

---

## 3. Hosting & Domain Connection (Hostinger to Vercel)

### Step 1: Deploy to Vercel
1. Log in to [Vercel](https://vercel.com) with the company account.
2. Click **Add New...** > **Project** and import the repository.
3. In **Environment Variables**, paste the required variables (Section 4).
4. Click **Deploy**.

### Step 2: Add Domain in Vercel
1. In your Vercel Project, go to **Settings** > **Domains**.
2. Add `wessmaa.com` (select the recommended redirect between `wessmaa.com` and `www.wessmaa.com`).

### Step 3: Set DNS Records in Hostinger
1. Log in to [Hostinger hPanel](https://hpanel.hostinger.com) > **Domains** > Click **Manage** next to `wessmaa.com`.
2. Click **DNS / Nameservers** in the left menu.
3. In the **Manage DNS records** table, ensure these two records are added/updated:
   - **A Record (Root):**
     - Type: `A`
     - Name: `@`
     - Points to: `76.76.21.21`
     - TTL: `300` (or default)
   - **CNAME Record (Subdomain):**
     - Type: `CNAME`
     - Name: `www`
     - Points to: `cname.vercel-dns.com`
     - TTL: `300` (or default)
4. Save changes. Within 5–30 minutes, Vercel will show a green **"Valid Configuration"** checkmark and issue a free SSL certificate.

---

## 4. Database Setup (Neon Serverless PostgreSQL)

The website uses Neon PostgreSQL for persistent storage of contact enquiries, applications, and job listings.

1. Go to [console.neon.tech](https://console.neon.tech) and create a company project (e.g. `wessmaa-db`).
2. Copy your connection string (`postgresql://user:password@ep-xyz.neon.tech/neondb?sslmode=require`).
3. Run the database migration script once to create the required tables:
   ```bash
   DATABASE_URL="your-connection-string" node scripts/migrate.mjs
   ```
4. Add `DATABASE_URL` to your Vercel Environment Variables.

---

## 5. Administrator Portal (`/admin`)

The website includes an administrative dashboard to review inquiries, client quote requests, and job applicants.

- **Admin URL:** `https://yourdomain.com/admin`
- **Login URL:** `https://yourdomain.com/admin/login`
- **Default Login:**
  - Email: `admin@wessmaa.com` (or configured `ADMIN_EMAIL`)
  - Password: `admin123456`

### Changing the Admin Password:
1. Run the password hash tool:
   ```bash
   node scripts/hash-password.mjs "YourNewSecurePassword"
   ```
2. Copy the generated hash (format `scrypt:<salt>:<hash>`).
3. Set `ADMIN_PASSWORD_HASH` in Vercel Environment Variables.

---

## 6. Environment Variables Master Reference

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
| `RESEND_API_KEY` | If using Resend | Alternative Cloud email API key | `re_1234567890abcdef` |
| `NEXT_PUBLIC_BOOKING_URL` | Optional | Discovery call booking link | `https://cal.com/wessmaa/discovery-call` |

---

## 7. Content Management (Where to Edit Copy & Media)

- **Phone, Email, Office Address, Socials, Header & Footer:** `config/site.ts`
- **12 Services (Descriptions, Deliverables, FAQs):** `content/services.ts`
- **Case Studies & Client Results:** `content/case-studies.ts`
- **Team Members, Values, Milestones & Open Roles:** `content/company.ts`
- **Legal Policies (Privacy, Terms, Cookies):** `content/legal.ts`
- **Images & Logos:** `public/images/` and `public/logo-mark.png`
