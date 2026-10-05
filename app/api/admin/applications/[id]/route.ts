import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { deleteApplication, getApplications, updateApplicationStatus } from "@/lib/db";
import { applicationStatusSchema } from "@/lib/validation";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const applications = await getApplications();
  return NextResponse.json(applications);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const payload = await request.json();
    const parsed = applicationStatusSchema.safeParse(payload);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid status or parameters" }, { status: 400 });
    }

    const { id } = await params;
    await updateApplicationStatus(id, parsed.data.status, parsed.data.adminNotes);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[APPLICATION UPDATE ERROR]", err);
    return NextResponse.json({ error: "Unable to update application." }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await deleteApplication(id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("[APPLICATION DELETE ERROR]", err);
    return NextResponse.json({ error: "Unable to delete application." }, { status: 500 });
  }
}
