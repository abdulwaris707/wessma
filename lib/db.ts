import "server-only";
import { neon } from "@neondatabase/serverless";
import type { z } from "zod";
import { jobSchema, jobApplicationSchema } from "./validation";

export type JobInput = z.infer<typeof jobSchema>;
export type Job = JobInput & { id: string; createdAt: string; updatedAt: string };

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  serviceProjectType: string | null;
  budget: string | null;
  message: string;
  status: "new" | "read" | "replied" | "archived";
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type ApplicationInput = z.infer<typeof jobApplicationSchema>;

export type Application = {
  id: string;
  jobId: string | null;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string | null;
  portfolioUrl: string | null;
  coverLetter: string;
  resumeFileName: string;
  resumeFileType: string;
  resumeFileSize: number;
  resumeFileData?: string | null;
  status: "new" | "reviewed" | "shortlisted" | "rejected" | "hired";
  adminNotes: string | null;
  createdAt: string;
  updatedAt: string;
};

export type EmailLog = {
  id: string;
  relatedType: "enquiry" | "application" | "system";
  relatedId: string | null;
  recipientEmail: string;
  senderEmail: string;
  subject: string;
  body: string;
  status: "sent" | "failed";
  errorMessage: string | null;
  sentAt: string;
};

export const databaseConfigured = () => Boolean(process.env.DATABASE_URL);

function client() {
  if (!process.env.DATABASE_URL) throw new Error("Database unavailable: DATABASE_URL not set");
  return neon(process.env.DATABASE_URL);
}

function mapJob(row: Record<string, unknown>): Job {
  return {
    id: String(row.id),
    title: String(row.title),
    slug: String(row.slug),
    department: String(row.department),
    employmentType: row.employment_type as JobInput["employmentType"],
    location: String(row.location),
    shortDescription: String(row.short_description),
    fullDescription: String(row.full_description),
    responsibilities: (row.responsibilities as string[]) ?? [],
    requirements: (row.requirements as string[]) ?? [],
    benefits: (row.benefits as string[]) ?? [],
    salaryOrCompensation: String(row.salary_or_compensation ?? ""),
    applicationEmailOrLink: String(row.application_email_or_link ?? ""),
    status: row.status as JobInput["status"],
    featured: Boolean(row.featured),
    createdAt: new Date(String(row.created_at)).toISOString(),
    updatedAt: new Date(String(row.updated_at)).toISOString(),
  };
}

const jobColumns =
  "id,title,slug,department,employment_type,location,short_description,full_description,responsibilities,requirements,benefits,salary_or_compensation,application_email_or_link,status,featured,created_at,updated_at";

export async function getPublishedJobs(): Promise<Job[]> {
  if (!databaseConfigured()) return [];
  const rows = await client().query(
    `SELECT ${jobColumns} FROM jobs WHERE status = 'published' ORDER BY featured DESC, created_at DESC`,
  );
  return rows.map(mapJob);
}

export async function getPublishedJob(slug: string): Promise<Job | null> {
  if (!databaseConfigured()) return null;
  const rows = await client().query(
    `SELECT ${jobColumns} FROM jobs WHERE slug = $1 AND status = 'published' LIMIT 1`,
    [slug],
  );
  return rows[0] ? mapJob(rows[0]) : null;
}

export async function getAdminJobs(): Promise<Job[]> {
  if (!databaseConfigured()) return [];
  const rows = await client().query(`SELECT ${jobColumns} FROM jobs ORDER BY created_at DESC`);
  return rows.map(mapJob);
}

export async function saveJob(input: JobInput, id?: string): Promise<Job> {
  const sql = client();
  const values = [
    input.title,
    input.slug,
    input.department,
    input.employmentType,
    input.location,
    input.shortDescription,
    input.fullDescription,
    input.responsibilities,
    input.requirements,
    input.benefits,
    input.salaryOrCompensation || null,
    input.applicationEmailOrLink || "",
    input.status,
    input.featured,
  ];

  const rows = id
    ? await sql.query(
        `UPDATE jobs SET title=$1,slug=$2,department=$3,employment_type=$4,location=$5,short_description=$6,full_description=$7,responsibilities=$8,requirements=$9,benefits=$10,salary_or_compensation=$11,application_email_or_link=$12,status=$13,featured=$14,updated_at=now() WHERE id=$15 RETURNING ${jobColumns}`,
        [...values, id],
      )
    : await sql.query(
        `INSERT INTO jobs (title,slug,department,employment_type,location,short_description,full_description,responsibilities,requirements,benefits,salary_or_compensation,application_email_or_link,status,featured) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING ${jobColumns}`,
        values,
      );

  if (!rows[0]) throw new Error("Job not found");
  return mapJob(rows[0]);
}

export async function deleteJob(id: string): Promise<void> {
  await client().query("DELETE FROM jobs WHERE id=$1", [id]);
}

// ---------------------------------------------------------------------------
// Enquiries (Contact submissions)
// ---------------------------------------------------------------------------

function mapEnquiry(r: Record<string, unknown>): Enquiry {
  return {
    id: String(r.id),
    name: String(r.name),
    email: String(r.email),
    phone: r.phone ? String(r.phone) : null,
    company: r.company ? String(r.company) : null,
    serviceProjectType: r.service_project_type ? String(r.service_project_type) : null,
    budget: r.budget ? String(r.budget) : null,
    message: String(r.message),
    status: r.status as Enquiry["status"],
    adminNotes: r.admin_notes ? String(r.admin_notes) : null,
    createdAt: new Date(String(r.created_at)).toISOString(),
    updatedAt: new Date(String(r.updated_at || r.created_at)).toISOString(),
  };
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (!databaseConfigured()) return [];
  const rows = await client().query(
    `SELECT id,name,email,phone,company,service_project_type,budget,message,status,admin_notes,created_at,updated_at FROM contact_submissions ORDER BY created_at DESC`,
  );
  return rows.map(mapEnquiry);
}

export async function createEnquiry(input: {
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
}): Promise<Enquiry> {
  const rows = await client().query(
    `INSERT INTO contact_submissions (name,email,phone,company,service_project_type,budget,message) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id,name,email,phone,company,service_project_type,budget,message,status,admin_notes,created_at,updated_at`,
    [
      input.name,
      input.email,
      input.phone || null,
      input.company || null,
      input.service || null,
      input.budget || null,
      input.message,
    ],
  );
  return mapEnquiry(rows[0]);
}

export async function updateEnquiryStatus(
  id: string,
  status: Enquiry["status"],
  adminNotes?: string,
): Promise<void> {
  if (adminNotes !== undefined) {
    await client().query(
      "UPDATE contact_submissions SET status=$1, admin_notes=$2, updated_at=now() WHERE id=$3",
      [status, adminNotes, id],
    );
  } else {
    await client().query(
      "UPDATE contact_submissions SET status=$1, updated_at=now() WHERE id=$2",
      [status, id],
    );
  }
}

export async function deleteEnquiry(id: string): Promise<void> {
  await client().query("DELETE FROM contact_submissions WHERE id=$1", [id]);
}

// ---------------------------------------------------------------------------
// Job Applications
// ---------------------------------------------------------------------------

function mapApplication(r: Record<string, unknown>, includeData = false): Application {
  return {
    id: String(r.id),
    jobId: r.job_id ? String(r.job_id) : null,
    jobTitle: String(r.job_title),
    fullName: String(r.full_name),
    email: String(r.email),
    phone: String(r.phone),
    location: String(r.location),
    linkedinUrl: r.linkedin_url ? String(r.linkedin_url) : null,
    portfolioUrl: r.portfolio_url ? String(r.portfolio_url) : null,
    coverLetter: String(r.cover_letter),
    resumeFileName: String(r.resume_file_name),
    resumeFileType: String(r.resume_file_type),
    resumeFileSize: Number(r.resume_file_size),
    resumeFileData: includeData && r.resume_file_data ? String(r.resume_file_data) : null,
    status: r.status as Application["status"],
    adminNotes: r.admin_notes ? String(r.admin_notes) : null,
    createdAt: new Date(String(r.created_at)).toISOString(),
    updatedAt: new Date(String(r.updated_at)).toISOString(),
  };
}

export async function createApplication(input: {
  jobId?: string | null;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedinUrl?: string | null;
  portfolioUrl?: string | null;
  coverLetter: string;
  resumeFileName: string;
  resumeFileType: string;
  resumeFileSize: number;
  resumeFileData: string;
}): Promise<Application> {
  const rows = await client().query(
    `INSERT INTO applications (job_id, job_title, full_name, email, phone, location, linkedin_url, portfolio_url, cover_letter, resume_file_name, resume_file_type, resume_file_size, resume_file_data)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
     RETURNING id, job_id, job_title, full_name, email, phone, location, linkedin_url, portfolio_url, cover_letter, resume_file_name, resume_file_type, resume_file_size, status, admin_notes, created_at, updated_at`,
    [
      input.jobId || null,
      input.jobTitle,
      input.fullName,
      input.email,
      input.phone,
      input.location,
      input.linkedinUrl || null,
      input.portfolioUrl || null,
      input.coverLetter,
      input.resumeFileName,
      input.resumeFileType,
      input.resumeFileSize,
      input.resumeFileData,
    ],
  );
  return mapApplication(rows[0]);
}

export async function getApplications(): Promise<Application[]> {
  if (!databaseConfigured()) return [];
  const rows = await client().query(
    `SELECT id, job_id, job_title, full_name, email, phone, location, linkedin_url, portfolio_url, cover_letter, resume_file_name, resume_file_type, resume_file_size, status, admin_notes, created_at, updated_at FROM applications ORDER BY created_at DESC`,
  );
  return rows.map((r) => mapApplication(r, false));
}

export async function getApplication(id: string, includeResumeData = false): Promise<Application | null> {
  if (!databaseConfigured()) return null;
  const columns = includeResumeData
    ? `id, job_id, job_title, full_name, email, phone, location, linkedin_url, portfolio_url, cover_letter, resume_file_name, resume_file_type, resume_file_size, resume_file_data, status, admin_notes, created_at, updated_at`
    : `id, job_id, job_title, full_name, email, phone, location, linkedin_url, portfolio_url, cover_letter, resume_file_name, resume_file_type, resume_file_size, status, admin_notes, created_at, updated_at`;

  const rows = await client().query(`SELECT ${columns} FROM applications WHERE id = $1 LIMIT 1`, [id]);
  return rows[0] ? mapApplication(rows[0], includeResumeData) : null;
}

export async function updateApplicationStatus(
  id: string,
  status: Application["status"],
  adminNotes?: string,
): Promise<void> {
  if (adminNotes !== undefined) {
    await client().query(
      "UPDATE applications SET status=$1, admin_notes=$2, updated_at=now() WHERE id=$3",
      [status, adminNotes, id],
    );
  } else {
    await client().query("UPDATE applications SET status=$1, updated_at=now() WHERE id=$2", [
      status,
      id,
    ]);
  }
}

export async function deleteApplication(id: string): Promise<void> {
  await client().query("DELETE FROM applications WHERE id=$1", [id]);
}

// ---------------------------------------------------------------------------
// Email Logging
// ---------------------------------------------------------------------------

export async function logEmail(input: {
  relatedType: "enquiry" | "application" | "system";
  relatedId?: string | null;
  recipientEmail: string;
  senderEmail: string;
  subject: string;
  body: string;
  status: "sent" | "failed";
  errorMessage?: string | null;
}): Promise<void> {
  if (!databaseConfigured()) return;
  await client().query(
    `INSERT INTO email_logs (related_type, related_id, recipient_email, sender_email, subject, body, status, error_message)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
    [
      input.relatedType,
      input.relatedId || null,
      input.recipientEmail,
      input.senderEmail,
      input.subject,
      input.body,
      input.status,
      input.errorMessage || null,
    ],
  );
}

export async function getEmailLogs(limit = 50): Promise<EmailLog[]> {
  if (!databaseConfigured()) return [];
  const rows = await client().query(
    `SELECT id, related_type, related_id, recipient_email, sender_email, subject, body, status, error_message, sent_at FROM email_logs ORDER BY sent_at DESC LIMIT $1`,
    [limit],
  );
  return rows.map((r) => ({
    id: String(r.id),
    relatedType: r.related_type as EmailLog["relatedType"],
    relatedId: r.related_id ? String(r.related_id) : null,
    recipientEmail: String(r.recipient_email),
    senderEmail: String(r.sender_email),
    subject: String(r.subject),
    body: String(r.body),
    status: r.status as EmailLog["status"],
    errorMessage: r.error_message ? String(r.error_message) : null,
    sentAt: new Date(String(r.sent_at)).toISOString(),
  }));
}

// ---------------------------------------------------------------------------
// Dashboard Aggregator
// ---------------------------------------------------------------------------

export async function getDashboardData() {
  const [jobs, enquiries, applications] = await Promise.all([
    getAdminJobs(),
    getEnquiries(),
    getApplications(),
  ]);

  return {
    jobs,
    enquiries,
    applications,
    stats: {
      totalJobs: jobs.length,
      publishedJobs: jobs.filter((j) => j.status === "published").length,
      draftJobs: jobs.filter((j) => j.status === "draft").length,
      closedJobs: jobs.filter((j) => j.status === "closed").length,
      totalApplications: applications.length,
      newApplications: applications.filter((a) => a.status === "new").length,
      totalEnquiries: enquiries.length,
      newEnquiries: enquiries.filter((e) => e.status === "new").length,
    },
  };
}
