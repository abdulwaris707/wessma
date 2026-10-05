import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getAdminJobs, saveJob } from "@/lib/db";
import { jobSchema } from "@/lib/validation";

async function allowed() { return Boolean(await getAdminSession()); }
export async function GET() { if (!(await allowed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); return NextResponse.json(await getAdminJobs()); }
export async function POST(request: Request) {
  if (!(await allowed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { const parsed = jobSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Please correct the job details." }, { status: 400 }); return NextResponse.json(await saveJob(parsed.data), { status: 201 }); }
  catch { return NextResponse.json({ error: "Unable to save this job. The slug may already be in use." }, { status: 500 }); }
}
