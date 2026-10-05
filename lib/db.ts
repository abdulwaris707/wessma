import "server-only";
import { neon } from "@neondatabase/serverless";
import type { z } from "zod";
import { jobSchema } from "./validation";

export type JobInput = z.infer<typeof jobSchema>;
export type Job = JobInput & { id: string; createdAt: string; updatedAt: string };
export type Enquiry = { id: string; name: string; email: string; phone: string | null; company: string | null; serviceProjectType: string | null; budget: string | null; message: string; status: "new" | "read" | "replied" | "archived"; createdAt: string };
export const databaseConfigured = () => Boolean(process.env.DATABASE_URL);
function client() { if (!process.env.DATABASE_URL) throw new Error("Database unavailable"); return neon(process.env.DATABASE_URL); }
function mapJob(row: Record<string, unknown>): Job {
  return { id: String(row.id), title: String(row.title), slug: String(row.slug), department: String(row.department), employmentType: row.employment_type as JobInput["employmentType"], location: String(row.location), shortDescription: String(row.short_description), fullDescription: String(row.full_description), responsibilities: (row.responsibilities as string[]) ?? [], requirements: (row.requirements as string[]) ?? [], benefits: (row.benefits as string[]) ?? [], salaryOrCompensation: String(row.salary_or_compensation ?? ""), applicationEmailOrLink: String(row.application_email_or_link), status: row.status as JobInput["status"], featured: Boolean(row.featured), createdAt: new Date(String(row.created_at)).toISOString(), updatedAt: new Date(String(row.updated_at)).toISOString() };
}
const jobColumns = "id,title,slug,department,employment_type,location,short_description,full_description,responsibilities,requirements,benefits,salary_or_compensation,application_email_or_link,status,featured,created_at,updated_at";
export async function getPublishedJobs() { if (!databaseConfigured()) return []; const rows = await client().query(`SELECT ${jobColumns} FROM jobs WHERE status = 'published' ORDER BY featured DESC, created_at DESC`); return rows.map(mapJob); }
export async function getPublishedJob(slug: string) { if (!databaseConfigured()) return null; const rows = await client().query("SELECT " + jobColumns + " FROM jobs WHERE slug = $1 AND status = 'published' LIMIT 1", [slug]); return rows[0] ? mapJob(rows[0]) : null; }
export async function getAdminJobs() { if (!databaseConfigured()) return []; const rows = await client().query(`SELECT ${jobColumns} FROM jobs ORDER BY created_at DESC`); return rows.map(mapJob); }
export async function saveJob(input: JobInput, id?: string) {
  const sql = client();
  const values = [input.title,input.slug,input.department,input.employmentType,input.location,input.shortDescription,input.fullDescription,input.responsibilities,input.requirements,input.benefits,input.salaryOrCompensation || null,input.applicationEmailOrLink,input.status,input.featured];
  const rows = id ? await sql.query("UPDATE jobs SET title=$1,slug=$2,department=$3,employment_type=$4,location=$5,short_description=$6,full_description=$7,responsibilities=$8,requirements=$9,benefits=$10,salary_or_compensation=$11,application_email_or_link=$12,status=$13,featured=$14,updated_at=now() WHERE id=$15 RETURNING " + jobColumns, [...values,id]) : await sql.query("INSERT INTO jobs (title,slug,department,employment_type,location,short_description,full_description,responsibilities,requirements,benefits,salary_or_compensation,application_email_or_link,status,featured) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING " + jobColumns, values);
  if (!rows[0]) throw new Error("Job not found"); return mapJob(rows[0]);
}
export async function deleteJob(id: string) { await client().query("DELETE FROM jobs WHERE id=$1", [id]); }
export async function getEnquiries() { if (!databaseConfigured()) return []; const rows = await client().query(`SELECT id,name,email,phone,company,service_project_type,budget,message,status,created_at FROM contact_submissions ORDER BY created_at DESC`); return rows.map((r) => ({ id:String(r.id), name:String(r.name), email:String(r.email), phone:r.phone ? String(r.phone) : null, company:r.company ? String(r.company) : null, serviceProjectType:r.service_project_type ? String(r.service_project_type) : null, budget:r.budget ? String(r.budget) : null, message:String(r.message), status:r.status as Enquiry["status"], createdAt:new Date(String(r.created_at)).toISOString() })); }
export async function createEnquiry(input: { name:string; email:string; phone:string; company:string; service:string; budget:string; message:string }) { await client().query("INSERT INTO contact_submissions (name,email,phone,company,service_project_type,budget,message) VALUES ($1,$2,$3,$4,$5,$6,$7)", [input.name,input.email,input.phone || null,input.company || null,input.service || null,input.budget || null,input.message]); }
export async function updateEnquiryStatus(id: string, status: Enquiry["status"]) { await client().query("UPDATE contact_submissions SET status=$1 WHERE id=$2", [status,id]); }
export async function getDashboardData() { const [jobs,enquiries] = await Promise.all([getAdminJobs(),getEnquiries()]); return { jobs, enquiries, stats: { totalJobs: jobs.length, publishedJobs: jobs.filter((j)=>j.status === "published").length, draftJobs: jobs.filter((j)=>j.status === "draft").length, closedJobs: jobs.filter((j)=>j.status === "closed").length, newEnquiries: enquiries.filter((e)=>e.status === "new").length } }; }
