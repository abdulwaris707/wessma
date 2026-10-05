import { z } from "zod";

const cleanList = z.array(z.string().trim().min(1).max(600)).max(30).default([]);

export const jobSchema = z.object({
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
  shortDescription: z.string().trim().min(10, "Short description must be at least 10 characters").max(400),
  fullDescription: z.string().trim().min(20, "Full description must be at least 20 characters").max(10000),
  responsibilities: cleanList,
  requirements: cleanList,
  benefits: cleanList.optional().default([]),
  salaryOrCompensation: z.string().trim().max(160).optional().default(""),
  applicationEmailOrLink: z.string().trim().max(500).optional().default(""),
  status: z.enum(["draft", "published", "closed"]).default("draft"),
  featured: z.boolean().default(false),
});

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  phone: z.string().trim().max(50).optional().default(""),
  company: z.string().trim().max(160).optional().default(""),
  interests: z.array(z.string().trim().min(1).max(80)).max(12).optional().default([]),
  budget: z.string().trim().max(80).optional().default(""),
  timeline: z.string().trim().max(80).optional().default(""),
  message: z.string().trim().min(10, "Please provide at least 10 characters").max(10000),
  website: z.string().max(0, "Spam detected").optional().default(""), // Honeypot field
});

export const jobApplicationSchema = z.object({
  jobId: z.string().uuid().optional().or(z.literal("")),
  jobTitle: z.string().trim().min(2, "Please choose or specify the role").max(140),
  fullName: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email address").max(254),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(50),
  location: z.string().trim().min(2, "Please enter your current city or location").max(120),
  linkedinUrl: z
    .string()
    .trim()
    .url("Please enter a valid LinkedIn URL")
    .optional()
    .or(z.literal("")),
  portfolioUrl: z
    .string()
    .trim()
    .url("Please enter a valid portfolio or GitHub URL")
    .optional()
    .or(z.literal("")),
  coverLetter: z.string().trim().min(20, "Cover letter / message must be at least 20 characters").max(10000),
  resumeFileName: z.string().trim().min(1).max(255),
  resumeFileType: z.string().max(120),
  resumeFileSize: z.number().max(5 * 1024 * 1024, "File exceeds 5MB limit"),
  resumeFileData: z.string().min(1, "Resume data is required"),
  website: z.string().max(0, "Spam detected").optional().default(""), // Honeypot field
});

export const enquiryStatusSchema = z.object({
  status: z.enum(["new", "read", "replied", "archived"]),
  adminNotes: z.string().optional(),
});

export const applicationStatusSchema = z.object({
  status: z.enum(["new", "reviewed", "shortlisted", "rejected", "hired"]),
  adminNotes: z.string().optional(),
});

export const replyEmailSchema = z.object({
  recipientEmail: z.string().email(),
  recipientName: z.string().min(1),
  subject: z.string().trim().min(2, "Subject is required").max(250),
  message: z.string().trim().min(5, "Message cannot be empty").max(10000),
  relatedType: z.enum(["enquiry", "application"]),
  relatedId: z.string().min(1),
});
