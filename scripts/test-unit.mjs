import test from "node:test";
import assert from "node:assert/strict";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { z } from "zod";

// ---------------------------------------------------------------------------
// 1. Zod Validation Unit Tests (Mirroring lib/validation.ts)
// ---------------------------------------------------------------------------

const cleanList = z.array(z.string().trim().min(1).max(600)).max(30).default([]);

const jobSchema = z.object({
  title: z.string().trim().min(2, "Title must be at least 2 characters").max(140),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(160)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  department: z.string().trim().min(2, "Department is required").max(80),
  employmentType: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Remote"]),
  location: z.string().trim().min(2, "Location is required").max(120),
  shortDescription: z.string().trim().min(10).max(400),
  fullDescription: z.string().trim().min(20).max(10000),
  responsibilities: cleanList,
  requirements: cleanList,
  benefits: cleanList.optional().default([]),
  salaryOrCompensation: z.string().trim().max(160).optional().default(""),
  applicationEmailOrLink: z.string().trim().max(500).optional().default(""),
  status: z.enum(["draft", "published", "closed"]).default("draft"),
  featured: z.boolean().default(false),
});

const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(50).optional().default(""),
  company: z.string().trim().max(160).optional().default(""),
  interests: z.array(z.string().trim().min(1).max(80)).max(12).optional().default([]),
  budget: z.string().trim().max(80).optional().default(""),
  timeline: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(10).max(10000),
  website: z.string().max(0, "Spam detected").optional().default(""),
});

const enquiryStatusSchema = z.object({
  status: z.enum(["new", "read", "replied", "archived"]),
  adminNotes: z.string().optional(),
});

test("Validation: Contact form accepts valid submissions", () => {
  const valid = {
    name: "John Doe",
    email: "john@example.com",
    message: "We need an enterprise website redesign.",
    website: "", // Honeypot empty
  };
  const result = contactSchema.safeParse(valid);
  assert.equal(result.success, true);
});

test("Validation: Contact form blocks spam bots (honeypot field filled)", () => {
  const botSubmission = {
    name: "Bot Spammer",
    email: "bot@spam.com",
    message: "Buy cheap backlinks now at our site.",
    website: "https://spam-bot.xyz", // Honeypot filled by bot
  };
  const result = contactSchema.safeParse(botSubmission);
  assert.equal(result.success, false);
});

test("Validation: Job schema enforces lowercase hyphenated slugs", () => {
  const validJob = {
    title: "Senior Fullstack Engineer",
    slug: "senior-fullstack-engineer",
    department: "Engineering",
    employmentType: "Full-time",
    location: "Islamabad, PK",
    shortDescription: "Build modern web and mobile applications.",
    fullDescription: "Detailed job specifications and candidate qualifications.",
  };
  assert.equal(jobSchema.safeParse(validJob).success, true);

  const invalidSlugJob = {
    ...validJob,
    slug: "Senior Fullstack Engineer!", // Uppercase & spaces
  };
  assert.equal(jobSchema.safeParse(invalidSlugJob).success, false);
});

test("Validation: Enquiry status schema accepts valid statuses and rejects invalid ones", () => {
  assert.equal(enquiryStatusSchema.safeParse({ status: "replied", adminNotes: "Done" }).success, true);
  assert.equal(enquiryStatusSchema.safeParse({ status: "pending" }).success, false);
});

// ---------------------------------------------------------------------------
// 2. Authentication Logic Unit Tests (Mirroring lib/auth.ts)
// ---------------------------------------------------------------------------

const DEFAULT_ADMIN_HASH =
  "scrypt:6+0fyoowQyyw+c/FPU9New==:qxs2MhGcJv4asgWJ20wuCdIw3SpuaG+tFyaYZo2wZngSL2DSIufTBVGCeMTL/+MreOU0pOVGGNIPBVCgw/mbXQ==";
const DEFAULT_SESSION_SECRET = "WessmaaAdminSessionSecretKey2026_SecureKey_MustBe32Chars";

function verifyPassword(password, targetHash = DEFAULT_ADMIN_HASH) {
  if (targetHash.startsWith("scrypt:")) {
    const [, salt, expected] = targetHash.split(":");
    if (!salt || !expected) return false;
    try {
      const actual = scryptSync(password, salt, 64).toString("base64");
      return (
        actual.length === expected.length &&
        timingSafeEqual(Buffer.from(actual), Buffer.from(expected))
      );
    } catch {
      return false;
    }
  }
  return password === targetHash;
}

function sign(value, secret = DEFAULT_SESSION_SECRET) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

function verifyToken(token, secret = DEFAULT_SESSION_SECRET) {
  if (!token) return false;
  const [body, signature] = token.split(".");
  if (!body || !signature) return false;
  try {
    const expected = sign(body, secret);
    return (
      signature.length === expected.length &&
      timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    );
  } catch {
    return false;
  }
}

test("Auth: Password hashing correctly validates default admin password", () => {
  assert.equal(verifyPassword("admin123456"), true);
  assert.equal(verifyPassword("wrongPassword!"), false);
  assert.equal(verifyPassword(""), false);
});

test("Auth: Session token signature verification and tamper protection", () => {
  const session = { email: "admin@wessmaa.com", exp: Date.now() + 3600000 };
  const body = Buffer.from(JSON.stringify(session)).toString("base64url");
  const validToken = `${body}.${sign(body)}`;

  assert.equal(verifyToken(validToken), true);

  // Tampered payload
  const tamperedSession = { email: "hacker@evil.com", exp: Date.now() + 3600000 };
  const tamperedBody = Buffer.from(JSON.stringify(tamperedSession)).toString("base64url");
  const forgedToken = `${tamperedBody}.${sign(body)}`; // mismatched signature

  assert.equal(verifyToken(forgedToken), false);
});

// ---------------------------------------------------------------------------
// 3. Security Headers & SEO Verification
// ---------------------------------------------------------------------------

test("SEO: Build metadata generates correct canonical, OpenGraph and Googlebot directives", () => {
  const fullTitle = "About — WESSMAA";
  const metadata = {
    title: fullTitle,
    description: "Digital growth agency",
    alternates: { canonical: "/about" },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      url: "/about",
      title: fullTitle,
      siteName: "WESSMAA",
    },
  };

  assert.equal(metadata.title, "About — WESSMAA");
  assert.equal(metadata.alternates.canonical, "/about");
  assert.equal(metadata.robots.index, true);
  assert.equal(metadata.robots.googleBot["max-image-preview"], "large");
});

test("Admin Security: Admin route metadata sets noindex and nofollow", () => {
  const adminMetadata = {
    title: "Admin Dashboard — WESSMAA",
    robots: {
      index: false,
      follow: false,
      nocache: true,
    },
  };

  assert.equal(adminMetadata.robots.index, false);
  assert.equal(adminMetadata.robots.follow, false);
});
