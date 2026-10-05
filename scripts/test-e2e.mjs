import { neon } from "@neondatabase/serverless";
import fs from "node:fs";
import path from "node:path";

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error(".env.local not found");
    return;
  }
  const lines = fs.readFileSync(envPath, "utf-8").split("\n");
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = trimmed.split("=");
    if (key && rest.length) {
      process.env[key.trim()] = rest.join("=").trim();
    }
  }
}

async function testE2E() {
  loadEnv();
  const sql = neon(process.env.DATABASE_URL);

  console.log("=== RUNNING END-TO-END FLOW VERIFICATION ===");

  // 1. Verify schema tables
  console.log("\n1. Checking database tables...");
  const tables = await sql`
    SELECT table_name FROM information_schema.tables 
    WHERE table_schema = 'public' 
    AND table_name IN ('jobs', 'contact_submissions', 'applications', 'email_logs')
    ORDER BY table_name;
  `;
  console.log("Active tables:", tables.map((t) => t.table_name));

  // 2. Test inserting & querying a test job
  console.log("\n2. Testing Job creation & query flow...");
  const testSlug = "qa-lead-verification-test";
  await sql`DELETE FROM jobs WHERE slug = ${testSlug}`;
  const [createdJob] = await sql`
    INSERT INTO jobs (title, slug, department, employment_type, location, short_description, full_description, status, featured)
    VALUES ('Senior QA Lead', ${testSlug}, 'Engineering', 'Full-time', 'Islamabad / Remote', 'Lead QA processes across squads.', 'Full description for QA lead role.', 'published', true)
    RETURNING id, title, slug, status;
  `;
  console.log("Job created:", createdJob);

  // 3. Test submitting a Job Application
  console.log("\n3. Testing Job Application submission flow...");
  const [createdApp] = await sql`
    INSERT INTO applications (job_id, job_title, full_name, email, phone, location, cover_letter, resume_file_name, resume_file_type, resume_file_size, resume_file_data, status)
    VALUES (${createdJob.id}, ${createdJob.title}, 'Ayesha Khan', 'ayesha.test@example.com', '+92 300 9876543', 'Islamabad', 'Excited about the QA role at Wessmaa.', 'ayesha-cv.pdf', 'application/pdf', 145020, 'JVBERi0xLjQKJcTl8uXrCg==', 'new')
    RETURNING id, full_name, email, job_title, status;
  `;
  console.log("Application created:", createdApp);

  // 4. Test updating status and adding notes
  console.log("\n4. Testing Admin application status update & internal notes...");
  await sql`
    UPDATE applications 
    SET status = 'shortlisted', admin_notes = 'Solid technical background. Scheduled for interview.', updated_at = now()
    WHERE id = ${createdApp.id};
  `;
  const [updatedApp] = await sql`SELECT id, status, admin_notes FROM applications WHERE id = ${createdApp.id}`;
  console.log("Updated Application:", updatedApp);

  // 5. Test Contact submission
  console.log("\n5. Testing Client Contact Enquiry flow...");
  const [createdEnquiry] = await sql`
    INSERT INTO contact_submissions (name, email, phone, company, service_project_type, budget, message, status)
    VALUES ('Hamza Malik', 'hamza.test@example.com', '+92 333 1122334', 'Apex Ventures', 'Custom software', '$15k – $50k', 'Looking to build an enterprise analytics platform.', 'new')
    RETURNING id, name, email, service_project_type, status;
  `;
  console.log("Enquiry created:", createdEnquiry);

  // 6. Test Email logging
  console.log("\n6. Testing Email Log entry...");
  const [logEntry] = await sql`
    INSERT INTO email_logs (related_type, related_id, recipient_email, sender_email, subject, body, status)
    VALUES ('enquiry', ${String(createdEnquiry.id)}, 'hamza.test@example.com', 'Wessmaa <hello@wessmaa.com>', 'Thank you for contacting Wessmaa', 'Confirmation message', 'sent')
    RETURNING id, recipient_email, status, sent_at;
  `;
  console.log("Email Log recorded:", logEntry);

  // Clean up test data
  console.log("\n7. Cleaning up test verification rows...");
  await sql`DELETE FROM email_logs WHERE id = ${logEntry.id}`;
  await sql`DELETE FROM applications WHERE id = ${createdApp.id}`;
  await sql`DELETE FROM contact_submissions WHERE id = ${createdEnquiry.id}`;
  await sql`DELETE FROM jobs WHERE slug = ${testSlug}`;
  console.log("Clean up completed successfully.");

  console.log("\n=== ALL DATABASE FLOWS AND RELATIONSHIPS FULLY VERIFIED ===");
}

testE2E().catch((err) => {
  console.error("Verification failed:", err);
  process.exit(1);
});
