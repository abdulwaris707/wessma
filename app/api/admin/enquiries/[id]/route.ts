import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { updateEnquiryStatus } from "@/lib/db";
import { enquiryStatusSchema } from "@/lib/validation";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await getAdminSession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try { const parsed = enquiryStatusSchema.safeParse(await request.json()); if (!parsed.success) return NextResponse.json({ error: "Invalid status" }, { status: 400 }); await updateEnquiryStatus((await params).id, parsed.data.status); return NextResponse.json({ ok: true }); }
  catch { return NextResponse.json({ error: "Unable to update this enquiry." }, { status: 500 }); }
}
