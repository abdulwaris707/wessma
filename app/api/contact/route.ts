import { NextResponse } from "next/server";
import { createEnquiry, databaseConfigured } from "@/lib/db";
import { contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    if (!databaseConfigured()) return NextResponse.json({ error: "We are unable to receive messages right now. Please try again later." }, { status: 503 });
    const parsed = contactSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Please check the highlighted details and try again." }, { status: 400 });
    const value = parsed.data;
    await createEnquiry({ ...value, service: value.interests.join(", ") + (value.timeline ? ` — Timeline: ${value.timeline}` : "") });
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "We could not receive your message. Please try again later." }, { status: 500 });
  }
}
