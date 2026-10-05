import { NextResponse } from "next/server";
import { createEnquiry, databaseConfigured } from "@/lib/db";
import { applicationSchema, contactSchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    if (!databaseConfigured()) return NextResponse.json({ error: "We are unable to receive messages right now. Please try again later." }, { status: 503 });
    const payload = await request.json();
    if (payload.kind === "job-application") {
      const parsed = applicationSchema.safeParse(payload);
      if (!parsed.success) return NextResponse.json({ error: "Please check the application details and try again." }, { status: 400 });
      const value = parsed.data;
      await createEnquiry({
        name: value.name,
        email: value.email,
        phone: value.phone,
        company: value.portfolio,
        service: `Job application — ${value.role}`,
        budget: "",
        message: `${value.message}\n\nCV: ${value.cv.name} (${Math.round(value.cv.size / 1024)} KB, ${value.cv.type})`,
      });
    } else {
      const parsed = contactSchema.safeParse(payload);
      if (!parsed.success) return NextResponse.json({ error: "Please check the highlighted details and try again." }, { status: 400 });
      const value = parsed.data;
      await createEnquiry({ ...value, service: value.interests.join(", ") + (value.timeline ? ` — Timeline: ${value.timeline}` : "") });
    }
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "We could not receive your message. Please try again later." }, { status: 500 });
  }
}
