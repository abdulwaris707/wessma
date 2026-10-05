import { NextResponse } from "next/server";
import { createApplication, databaseConfigured } from "@/lib/db";
import { jobApplicationSchema } from "@/lib/validation";
import { sendApplicationAcknowledgement, sendApplicationAdminAlert } from "@/lib/email";

export async function POST(request: Request) {
  try {
    if (!databaseConfigured()) {
      return NextResponse.json(
        { error: "Our careers system is undergoing maintenance. Please email your application directly to hr@wessmaa.com." },
        { status: 503 },
      );
    }

    const payload = await request.json();

    // Honeypot spam check
    if (payload.website) {
      console.warn("[SPAM BLOCKED] Honeypot field was filled in job application.");
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const parsed = jobApplicationSchema.safeParse(payload);
    if (!parsed.success) {
      const firstIssue = parsed.error.issues[0]?.message || "Please check your application fields and try again.";
      return NextResponse.json({ error: firstIssue }, { status: 400 });
    }

    const v = parsed.data;

    // 1. Save application with resume to database
    const application = await createApplication({
      jobId: v.jobId || null,
      jobTitle: v.jobTitle,
      fullName: v.fullName,
      email: v.email,
      phone: v.phone,
      location: v.location,
      linkedinUrl: v.linkedinUrl || null,
      portfolioUrl: v.portfolioUrl || null,
      coverLetter: v.coverLetter,
      resumeFileName: v.resumeFileName,
      resumeFileType: v.resumeFileType,
      resumeFileSize: v.resumeFileSize,
      resumeFileData: v.resumeFileData,
    });

    // 2. Trigger transactional emails (acknowledgement to applicant, notification to admin)
    Promise.allSettled([
      sendApplicationAcknowledgement({
        name: application.fullName,
        email: application.email,
        jobTitle: application.jobTitle,
        applicationId: application.id,
      }),
      sendApplicationAdminAlert({
        id: application.id,
        name: application.fullName,
        email: application.email,
        phone: application.phone,
        location: application.location,
        jobTitle: application.jobTitle,
        coverLetter: application.coverLetter,
        resumeFileName: application.resumeFileName,
        linkedinUrl: application.linkedinUrl,
        portfolioUrl: application.portfolioUrl,
      }),
    ]).catch((err) => {
      console.error("[EMAIL NOTIFICATION ERROR]", err);
    });

    return NextResponse.json(
      {
        ok: true,
        id: application.id,
        message: "Application received successfully",
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("[APPLY API ERROR]", err);
    return NextResponse.json(
      { error: "We could not process your application. Please check your connection or email info@wessmaa.com." },
      { status: 500 },
    );
  }
}
