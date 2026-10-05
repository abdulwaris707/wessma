import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { deleteEnquiry, updateEnquiryStatus } from "@/lib/db";
import { enquiryStatusSchema } from "@/lib/validation";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const parsed = enquiryStatusSchema.safeParse(await request.json());
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid status parameters" }, { status: 400 });
    }
    const { id } = await params;
    await updateEnquiryStatus(id, parsed.data.status, parsed.data.adminNotes);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[ENQUIRY UPDATE ERROR]", err);
    return NextResponse.json({ error: "Unable to update this enquiry." }, { status: 500 });
  }
}

export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await getAdminSession())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await deleteEnquiry(id);
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("[ENQUIRY DELETE ERROR]", err);
    return NextResponse.json({ error: "Unable to delete this enquiry." }, { status: 500 });
  }
}
