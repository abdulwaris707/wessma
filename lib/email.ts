import "server-only";
import nodemailer, { type Transporter } from "nodemailer";
import { logEmail } from "./db";

export type SendEmailOptions = {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  relatedType?: "enquiry" | "application" | "system";
  relatedId?: string;
};

export function emailServiceConfigured(): boolean {
  if (process.env.RESEND_API_KEY) return true;
  if (
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    (process.env.SMTP_PASSWORD || process.env.SMTP_PASS)
  ) {
    return true;
  }
  return false;
}

export function getSenderEmail(): string {
  return process.env.EMAIL_FROM || "Wessmaa <info@wessmaa.com>";
}

export function getAdminNotifyEmail(): string {
  return process.env.ADMIN_EMAIL || "info@wessmaa.com";
}

let transporter: Transporter | null = null;

function getSmtpTransporter() {
  if (transporter) return transporter;
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || "587", 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD || process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    return null;
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });

  return transporter;
}

/**
 * Sends an email using Resend (HTTP) or SMTP (Nodemailer).
 * Safely handles missing config, records to email_logs in DB, and never crashes calling operations.
 */
export async function sendEmail(options: SendEmailOptions): Promise<{ ok: boolean; error?: string }> {
  const from = getSenderEmail();
  const { to, subject, html, text, replyTo, relatedType = "system", relatedId } = options;
  const plainText = text || html.replace(/<[^>]+>/g, " ");

  if (!emailServiceConfigured()) {
    const errorMsg = "Email service not configured (neither RESEND_API_KEY nor SMTP credentials set).";
    console.warn(`[EMAIL SKIPPED] To: ${to} | Subject: ${subject} | ${errorMsg}`);
    
    // Log in database as failed due to configuration
    try {
      await logEmail({
        relatedType,
        relatedId: relatedId || null,
        recipientEmail: to,
        senderEmail: from,
        subject,
        body: plainText,
        status: "failed",
        errorMessage: errorMsg,
      });
    } catch (dbErr) {
      console.error("Failed to log skipped email:", dbErr);
    }

    return { ok: false, error: errorMsg };
  }

  try {
    // 1. Resend API if provided
    if (process.env.RESEND_API_KEY) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from,
          to: [to],
          subject,
          html,
          text: plainText,
          reply_to: replyTo,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        const errMessage = errorData.message || `Resend API returned status ${res.status}`;
        throw new Error(errMessage);
      }
    } else {
      // 2. SMTP Transport
      const mailer = getSmtpTransporter();
      if (!mailer) throw new Error("SMTP transporter could not be initialized");

      await mailer.sendMail({
        from,
        to,
        subject,
        html,
        text: plainText,
        replyTo: replyTo || from,
      });
    }

    // Success log in DB
    try {
      await logEmail({
        relatedType,
        relatedId: relatedId || null,
        recipientEmail: to,
        senderEmail: from,
        subject,
        body: plainText,
        status: "sent",
      });
    } catch (dbErr) {
      console.error("Failed to write email success log to DB:", dbErr);
    }

    return { ok: true };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : String(err);
    console.error(`[EMAIL ERROR] Sending to ${to} failed:`, errorMessage);

    try {
      await logEmail({
        relatedType,
        relatedId: relatedId || null,
        recipientEmail: to,
        senderEmail: from,
        subject,
        body: plainText,
        status: "failed",
        errorMessage,
      });
    } catch (dbErr) {
      console.error("Failed to write email failure log to DB:", dbErr);
    }

    return { ok: false, error: errorMessage };
  }
}

// ---------------------------------------------------------------------------
// Transactional Notification Templates
// ---------------------------------------------------------------------------

/**
 * Sent to applicant when they apply for a job.
 */
export async function sendApplicationAcknowledgement(applicant: {
  name: string;
  email: string;
  jobTitle: string;
  applicationId: string;
}) {
  const subject = `Application Received: ${applicant.jobTitle} at Wessmaa`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0A1F44; background: #ffffff;">
      <div style="padding-bottom: 20px; border-bottom: 2px solid #F97316;">
        <h2 style="margin: 0; color: #0A1F44; font-size: 24px;">wess<span style="color: #F97316;">maa</span></h2>
      </div>
      <div style="padding: 24px 0;">
        <h3 style="font-size: 20px; margin-top: 0; color: #0A1F44;">Hi ${applicant.name},</h3>
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
          Thank you for applying for the <strong>${applicant.jobTitle}</strong> position at Wessmaa.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
          We have received your application and resume. Our hiring team carefully reviews every submission against our current squad requirements.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
          If your profile matches what we're looking for, we will reach out to schedule an introductory discussion within 3–5 business days.
        </p>
        <div style="margin: 30px 0; padding: 16px; background-color: #F8FAFC; border-radius: 12px; border-left: 4px solid #F97316;">
          <p style="margin: 0; font-size: 14px; color: #475569;">
            <strong>Role:</strong> ${applicant.jobTitle}<br/>
            <strong>Reference ID:</strong> ${applicant.applicationId}
          </p>
        </div>
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
          Warm regards,<br/>
          <strong>Wessmaa Hiring Team</strong><br/>
          <a href="https://wessmaa.com" style="color: #F97316; text-decoration: none;">wessmaa.com</a>
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: applicant.email,
    subject,
    html,
    relatedType: "application",
    relatedId: applicant.applicationId,
  });
}

/**
 * Sent to admin notification inbox when a new job application arrives.
 */
export async function sendApplicationAdminAlert(app: {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  coverLetter: string;
  resumeFileName: string;
  linkedinUrl?: string | null;
  portfolioUrl?: string | null;
}) {
  const adminEmail = getAdminNotifyEmail();
  const subject = `[New Job Application] ${app.jobTitle} - ${app.name}`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0A1F44;">
      <h2 style="color: #0A1F44; border-bottom: 2px solid #0A1F44; padding-bottom: 8px;">New Job Application Received</h2>
      <p style="font-size: 15px;"><strong>Position:</strong> ${app.jobTitle}</p>
      <p style="font-size: 15px;"><strong>Applicant:</strong> ${app.name} (&lt;${app.email}&gt;)</p>
      <p style="font-size: 15px;"><strong>Phone:</strong> ${app.phone}</p>
      <p style="font-size: 15px;"><strong>Location:</strong> ${app.location}</p>
      ${app.linkedinUrl ? `<p style="font-size: 15px;"><strong>LinkedIn:</strong> <a href="${app.linkedinUrl}">${app.linkedinUrl}</a></p>` : ""}
      ${app.portfolioUrl ? `<p style="font-size: 15px;"><strong>Portfolio:</strong> <a href="${app.portfolioUrl}">${app.portfolioUrl}</a></p>` : ""}
      <p style="font-size: 15px;"><strong>Resume File:</strong> ${app.resumeFileName}</p>
      <div style="background: #F1F5F9; padding: 16px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin-top: 0; color: #0A1F44;">Cover Letter / Message:</h4>
        <p style="white-space: pre-wrap; font-size: 14px; color: #334155; margin-bottom: 0;">${app.coverLetter}</p>
      </div>
      <p style="margin-top: 24px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://wessmaa.com"}/admin" style="background: #0A1F44; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
          Open in Admin Dashboard
        </a>
      </p>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject,
    html,
    replyTo: app.email,
    relatedType: "application",
    relatedId: app.id,
  });
}

/**
 * Sent to client acknowledging their contact submission.
 */
export async function sendEnquiryAcknowledgement(enquiry: {
  id: string;
  name: string;
  email: string;
  service?: string | null;
}) {
  const subject = `Thank you for contacting Wessmaa`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0A1F44; background: #ffffff;">
      <div style="padding-bottom: 20px; border-bottom: 2px solid #F97316;">
        <h2 style="margin: 0; color: #0A1F44; font-size: 24px;">wess<span style="color: #F97316;">maa</span></h2>
      </div>
      <div style="padding: 24px 0;">
        <h3 style="font-size: 20px; margin-top: 0; color: #0A1F44;">Hi ${enquiry.name},</h3>
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
          Thank you for reaching out to Wessmaa. We have received your inquiry${enquiry.service ? ` regarding <strong>${enquiry.service}</strong>` : ""}.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
          One of our technical and growth consultants will review your project scope and get in touch within 24 hours.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
          If you'd like to talk right away, you can also schedule an intro call directly on our discovery calendar or message us on WhatsApp.
        </p>
        <p style="font-size: 15px; line-height: 1.6; color: #334155;">
          Best regards,<br/>
          <strong>Wessmaa Team</strong><br/>
          <a href="https://wessmaa.com" style="color: #F97316; text-decoration: none;">wessmaa.com</a>
        </p>
      </div>
    </div>
  `;

  return sendEmail({
    to: enquiry.email,
    subject,
    html,
    relatedType: "enquiry",
    relatedId: enquiry.id,
  });
}

/**
 * Sent to admin notification inbox when a new contact inquiry arrives.
 */
export async function sendEnquiryAdminAlert(enquiry: {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  service?: string | null;
  budget?: string | null;
  message: string;
}) {
  const adminEmail = getAdminNotifyEmail();
  const subject = `[New Contact Enquiry] ${enquiry.service || "General Inquiry"} - ${enquiry.name}`;
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #0A1F44;">
      <h2 style="color: #0A1F44; border-bottom: 2px solid #0A1F44; padding-bottom: 8px;">New Client Enquiry</h2>
      <p style="font-size: 15px;"><strong>Client:</strong> ${enquiry.name} (&lt;${enquiry.email}&gt;)</p>
      ${enquiry.company ? `<p style="font-size: 15px;"><strong>Company:</strong> ${enquiry.company}</p>` : ""}
      ${enquiry.phone ? `<p style="font-size: 15px;"><strong>Phone:</strong> ${enquiry.phone}</p>` : ""}
      ${enquiry.service ? `<p style="font-size: 15px;"><strong>Service / Scope:</strong> ${enquiry.service}</p>` : ""}
      ${enquiry.budget ? `<p style="font-size: 15px;"><strong>Budget:</strong> ${enquiry.budget}</p>` : ""}
      <div style="background: #F1F5F9; padding: 16px; border-radius: 8px; margin: 20px 0;">
        <h4 style="margin-top: 0; color: #0A1F44;">Message:</h4>
        <p style="white-space: pre-wrap; font-size: 14px; color: #334155; margin-bottom: 0;">${enquiry.message}</p>
      </div>
      <p style="margin-top: 24px;">
        <a href="${process.env.NEXT_PUBLIC_SITE_URL || "https://wessmaa.com"}/admin" style="background: #0A1F44; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: bold; display: inline-block;">
          Reply in Admin Dashboard
        </a>
      </p>
    </div>
  `;

  return sendEmail({
    to: adminEmail,
    subject,
    html,
    replyTo: enquiry.email,
    relatedType: "enquiry",
    relatedId: enquiry.id,
  });
}
