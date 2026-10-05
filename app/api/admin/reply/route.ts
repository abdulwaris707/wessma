import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { replyEmailSchema } from "@/lib/validation";
import { sendEmail } from "@/lib/email";
import { updateApplicationStatus, updateEnquiryStatus } from "@/lib/db";

export async function POST(request: Request) {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = await request.json();
    const parsed = replyEmailSchema.safeParse(payload);
    if (!parsed.success) {
      const issue = parsed.error.issues[0]?.message || "Invalid reply information";
      return NextResponse.json({ error: issue }, { status: 400 });
    }

    const { recipientEmail, recipientName, subject, message, relatedType, relatedId } =
      parsed.data;

    const formattedHtml = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0A1F44; background: #ffffff;">
        <div style="padding-bottom: 20px; border-bottom: 2px solid #F97316;">
          <h2 style="margin: 0; color: #0A1F44; font-size: 24px;">wess<span style="color: #F97316;">maa</span></h2>
        </div>
        <div style="padding: 24px 0;">
          <h3 style="font-size: 18px; margin-top: 0; color: #0A1F44;">Dear ${recipientName},</h3>
          <div style="font-size: 15px; line-height: 1.6; color: #334155; white-space: pre-wrap;">
${message}
          </div>
          <div style="margin-top: 36px; padding-top: 16px; border-top: 1px solid #E2E8F0;">
            <p style="margin: 0; font-size: 14px; font-weight: bold; color: #0A1F44;">Wessmaa Team</p>
            <p style="margin: 4px 0 0; font-size: 13px; color: #64748B;">
              Building and scaling high-performance software & brand digital experiences.<br/>
              <a href="https://wessmaa.com" style="color: #F97316; text-decoration: none;">wessmaa.com</a>
            </p>
          </div>
        </div>
      </div>
    `;

    // Send email via official company address
    const result = await sendEmail({
      to: recipientEmail,
      subject,
      html: formattedHtml,
      text: message,
      relatedType,
      relatedId,
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          error: result.error || "Failed to send email. Check SMTP or Resend credentials in .env.local",
        },
        { status: 502 },
      );
    }

    // Auto-update status to "replied"
    if (relatedType === "enquiry") {
      await updateEnquiryStatus(relatedId, "replied");
    } else if (relatedType === "application") {
      await updateApplicationStatus(relatedId, "reviewed");
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[REPLY API ERROR]", err);
    return NextResponse.json({ error: "Failed to dispatch reply." }, { status: 500 });
  }
}
