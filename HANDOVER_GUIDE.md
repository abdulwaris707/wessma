# WESSMAA Website — Complete Handover & Operations Guide

This guide is written for the **Website Owner**, **Administrator**, and **Technical Team** of **WESSMAA Digital Growth Company** (`https://wessmaa.com`). It covers everything needed to deploy the site, create the database, connect official emails, connect the Hostinger domain, and manage the content.

---

## 📋 Table of Contents
1. [How to Deploy to Vercel](#1-how-to-deploy-to-vercel)
2. [How to Create the Neon Database (2 Easy Options)](#2-how-to-create-the-neon-database)
3. [How to Connect Your Hostinger Domain](#3-how-to-connect-your-hostinger-domain)
4. [How to Setup Official Hostinger Email (`info@wessmaa.com`)](#4-how-to-setup-official-hostinger-email)
5. [Complete Environment Variables Master List](#5-complete-environment-variables-master-list)
6. [Administrator Portal Access (`/admin`)](#6-administrator-portal-access)
7. [How to Run Locally (For Developers)](#7-how-to-run-locally)
8. [How to Edit Website Content & Copy](#8-how-to-edit-website-content--copy)

---

## 1. How to Deploy to Vercel

Vercel is the official, high-speed cloud platform for Next.js applications:

1. Go to **[vercel.com](https://vercel.com)** and create or log in with your official company account.
2. Click **Add New...** > **Project**.
3. Import your website repository (from GitHub, GitLab, or upload).
4. Under **Environment Variables**, you will add the configuration keys listed in [Section 5](#5-complete-environment-variables-master-list).
5. Click **Deploy**. Your website will be live in 1–2 minutes!

---

## 2. How to Create the Neon Database

The website uses **Neon Serverless PostgreSQL** to securely store client inquiries, quote requests, and job applicants.

You have **two simple ways** to create this database:

### Option A: Direct 1-Click from Vercel (Easiest)
1. In your **Vercel Project Dashboard**, click on the **Storage** tab at the top.
2. Click **Create Database** > Select **Neon (Postgres)**.
3. Choose a project name (e.g. `wessmaa-db`) and pick the closest region.
4. Click **Create**.
5. Vercel will **automatically inject** the `DATABASE_URL` into your project settings! You don't even have to copy-paste it manually.

### Option B: Via Neon.tech Console
1. Go to **[console.neon.tech](https://console.neon.tech)** and sign up with your company email.
2. Click **New Project** (Name: `wessmaa-db`).
3. Under **Connection Details**, copy the connection string:
   `postgresql://neondb_owner:YOUR_PASSWORD@ep-xyz.neon.tech/neondb?sslmode=require`
4. In your Vercel Project, go to **Settings** > **Environment Variables** and add:
   - **Key:** `DATABASE_URL`
   - **Value:** (Paste your connection string)

### Initializing Database Tables:
Run the one-time migration command in your terminal to create the tables (`jobs`, `applications`, `contact_submissions`, `email_logs`):
```bash
DATABASE_URL="your-connection-string" node scripts/migrate.mjs
```

---

## 3. How to Connect Your Hostinger Domain

### Step 1: In Vercel
1. Go to your project in Vercel > **Settings** > **Domains**.
2. Enter your domain: `wessmaa.com`.
3. Select the recommended option to redirect `wessmaa.com` to `www.wessmaa.com` (or vice versa) and click **Add**.

### Step 2: In Hostinger hPanel
1. Log into **[Hostinger hPanel](https://hpanel.hostinger.com)**.
2. Go to **Domains** > Click **Manage** next to `wessmaa.com`.
3. Click **DNS / Nameservers** in the left menu.
4. In the **Manage DNS records** table, set these two records:
   - **Record 1 (A Record for Root Domain):**
     - **Type:** `A`
     - **Name:** `@`
     - **Points to:** `76.76.21.21`
     - **TTL:** `300` (or default)
     *(If an `@` record already exists, edit it and change the IP).*
   - **Record 2 (CNAME Record for WWW):**
     - **Type:** `CNAME`
     - **Name:** `www`
     - **Points to:** `cname.vercel-dns.com`
     - **TTL:** `300` (or default)
     *(If a `www` record already exists, edit it and change target).*
5. Click **Save**. Within 5–30 minutes, Vercel will show a green **"Valid Configuration"** checkmark and issue a free SSL certificate.

---

## 4. How to Setup Official Hostinger Email (`info@wessmaa.com`)

The website has a built-in automated email notification system (`lib/email.ts`). Whenever:
- A client submits a **Contact Message** or **Quote Request**
- A candidate submits a **Job Application**
- An admin replies from `/admin`

The website automatically emails the company and sends a branded confirmation to the client.

### Step 1: Create your mailbox in Hostinger
1. In Hostinger hPanel > **Emails** > **Email Accounts**, click **Create email account**.
2. Email name: `info@wessmaa.com` (or `hello@wessmaa.com`).
3. Set your mailbox password.

### Step 2: Add these values to Vercel Environment Variables:
Go to Vercel > **Project Settings** > **Environment Variables** and add:
- `EMAIL_FROM`: `Wessmaa <info@wessmaa.com>`
- `ADMIN_EMAIL`: `info@wessmaa.com`
- `SMTP_HOST`: `smtp.hostinger.com`
- `SMTP_PORT`: `465`
- `SMTP_USER`: `info@wessmaa.com`
- `SMTP_PASSWORD`: (your Hostinger mailbox password)

*(If you use Google Workspace instead of Hostinger Email, use `SMTP_HOST=smtp.gmail.com`, `SMTP_PORT=587`, and a 16-character Google App Password).*

---

## 5. Complete Environment Variables Master List

These are the exact variables to add in **Vercel > Settings > Environment Variables** (or locally in `.env.local`):

| Variable Name | Description | Example Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Live URL of the website | `https://wessmaa.com` |
| `DATABASE_URL` | Neon PostgreSQL pooled connection string | `postgresql://user:pass@ep-xyz.neon.tech/neondb?sslmode=require` |
| `ADMIN_EMAIL` | Official admin email for notifications and login | `info@wessmaa.com` |
| `ADMIN_PASSWORD_HASH` | Secure password hash for `/admin` login | `scrypt:6+0fyoowQyyw+c/FPU9New==:qxs2MhGcJv4asgWJ20wuCdIw3SpuaG+tFyaYZo2wZngSL2DSIufTBVGCeMTL/+MreOU0pOVGGNIPBVCgw/mbXQ==` |
| `SESSION_SECRET` | 32+ character random secret for session encryption | `SHj4CCDBLePv6FiC25/TmG2MYkV23o7rOB7udHDW1Ds=` |
| `EMAIL_FROM` | Visible sender email name & address | `Wessmaa <info@wessmaa.com>` |
| `SMTP_HOST` | Hostinger SMTP server | `smtp.hostinger.com` |
| `SMTP_PORT` | Hostinger SSL port | `465` |
| `SMTP_USER` | Official mailbox username | `info@wessmaa.com` |
| `SMTP_PASSWORD` | Official mailbox password | `your-hostinger-mailbox-password` |
| `NEXT_PUBLIC_BOOKING_URL` | (Optional) Discovery call booking link | `https://cal.com/wessmaa/discovery-call` |

---

## 6. Administrator Portal Access

- **Admin URL:** `https://wessmaa.com/admin`
- **Login URL:** `https://wessmaa.com/admin/login`
- **Default Login Credentials:**
  - **Email:** `admin@wessmaa.com` (or whatever email is in `ADMIN_EMAIL`)
  - **Password:** `admin123456`

### How to Change the Admin Password:
Run this command in your local terminal:
```bash
node scripts/hash-password.mjs "YourNewSecurePassword"
```
Copy the resulting output (`scrypt:...`) and update `ADMIN_PASSWORD_HASH` in Vercel Environment Variables.

---

## 7. How to Run Locally (For Developers)

```bash
# 1. Install dependencies
npm install

# 2. Copy environment template
cp .env.example .env.local

# 3. Start local development server
npm run dev
# Website runs at http://localhost:3000

# 4. Run automated test suite
npm test
```

---

## 8. How to Edit Website Content & Copy

You don't need to touch complex code to update business information:
- **Phone, Email, Office Address, WhatsApp, Social Links:** Open `config/site.ts`
- **12 Services (Descriptions, Features, FAQs):** Open `content/services.ts`
- **Portfolio & Case Studies:** Open `content/case-studies.ts`
- **Team Members & Leadership Bios:** Open `content/company.ts`
- **Privacy Policy, Terms of Service:** Open `content/legal.ts`
- **Logos & Brand Visuals:** Replace images in `public/` and `public/images/`
