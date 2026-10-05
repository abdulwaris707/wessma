import { NextResponse } from "next/server";
import { createEnquiry, databaseConfigured } from "@/lib/db";
import { contactSchema } from "@/lib/validation";
import { sendEnquiryAcknowledgement, sendEnquiryAdminAlert } from "@/lib/email";

export async function POST(request: Request) {
  try {
    if (!databaseConfigured()) {
      return NextResponse.json(
        { error: "Our database is currently undergoing maintenance. Please try again in a few moments." },
        { status: 503 },
      );
    }

    const payload = await request.json();

    // Honeypot spam check
    if (payload.website) {
      console.warn("[SPAM BLOCKED] Honeypot field was filled in contact submission.");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || "Please check the highlighted details and try again.";
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    const value = parsed.data;
    const serviceLabel =
      value.interests.length > 0
        ? value.interests.join(", ") + (value.timeline ? ` — Timeline: ${value.timeline}` : "")
        : value.timeline
          ? `Timeline: ${value.timeline}`
          : "General Inquiry";

    // 1. Save enquiry to database
    const enquiry = await createEnquiry({
      name: value.name,
      email: value.email,
      phone: value.phone || null,
      company: value.company || null,
      service: serviceLabel,
      budget: value.budget || null,
      message: value.message,
    });

    // 2. Trigger transactional emails (acknowledgement to client, alert to admin)
    // Non-blocking so email service issues never prevent the user from receiving a 201 success
    Promise.allSettled([
      sendEnquiryAcknowledgement({
        id: enquiry.id,
        name: enquiry.name,
        email: enquiry.email,
        service: enquiry.serviceProjectType,
      }),
      sendEnquiryAdminAlert({
        id: enquiry.id,
        name: enquiry.name,
        email: enquiry.email,
        phone: enquiry.phone,
        company: enquiry.company,
        service: enquiry.serviceProjectType,
        budget: enquiry.budget,
        message: enquiry.message,
      }),
    ]).catch((err) => {
      console.error("[EMAIL NOTIFICATION ERROR]", err);
    });

    return NextResponse.json({ ok: true, id: enquiry.id }, { status: 201 });
  } catch (err) {
    console.error("[CONTACT API ERROR]", err);
    return NextResponse.json(
      { error: "We could not receive your message. Please try again later or email us directly at info@wessmaa.com." },
      { status: 500 },
    );
  }
}
