import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { deleteJob, saveJob } from "@/lib/db";
import { jobSchema } from "@/lib/validation";

async function allowed() { return Boolean(await getAdminSession()); }
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await allowed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { const parsed = jobSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Please correct the job details." }, { status: 400 }); const { id } = await params; return NextResponse.json(await saveJob(parsed.data, id)); }
  catch { return NextResponse.json({ error: "Unable to update this job." }, { status: 500 }); }
}
export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) { if (!(await allowed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 }); try { await deleteJob((await params).id); return new NextResponse(null, { status: 204 }); } catch { return NextResponse.json({ error: "Unable to delete this job." }, { status: 500 }); } }
