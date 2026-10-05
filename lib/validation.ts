import { z } from "zod";

const cleanList = z.array(z.string().trim().min(1).max(600)).max(30).default([]);

export const jobSchema = z.object({
  title: z.string().trim().min(2).max(140),
  slug: z.string().trim().min(2).max(160).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  department: z.string().trim().min(2).max(80),
  employmentType: z.enum(["Full-time", "Part-time", "Contract", "Internship", "Remote"]),
  location: z.string().trim().min(2).max(120),
  shortDescription: z.string().trim().min(10).max(400),
  fullDescription: z.string().trim().min(20).max(10000),
  responsibilities: cleanList,
  requirements: cleanList,
  benefits: cleanList.optional().default([]),
  salaryOrCompensation: z.string().trim().max(160).optional().default(""),
  applicationEmailOrLink: z.string().trim().min(3).max(500),
  status: z.enum(["draft", "published", "closed"]),
  featured: z.boolean().default(false),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.email().max(254),
  phone: z.string().trim().max(50).optional().default(""),
  company: z.string().trim().max(160).optional().default(""),
  interests: z.array(z.string().trim().min(1).max(80)).max(12).optional().default([]),
  budget: z.string().trim().max(80).optional().default(""),
  timeline: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(10).max(10000),
});

export const enquiryStatusSchema = z.object({ status: z.enum(["new", "read", "replied", "archived"]) });
