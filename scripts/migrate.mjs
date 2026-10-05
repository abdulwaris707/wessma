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

async function migrate() {
  loadEnv();
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error("DATABASE_URL is not set.");
    process.exit(1);
  }

  const sql = neon(dbUrl);
  const schemaFile = path.resolve(process.cwd(), "database/schema.sql");
  const schemaSql = fs.readFileSync(schemaFile, "utf-8");

  console.log("Applying schema migrations to Neon...");
  // Split statements by semicolon
  const statements = schemaSql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const stmt of statements) {
    await sql.query(stmt);
  }

  // Also alter existing tables if needed (safe ADD COLUMN IF NOT EXISTS)
  try {
    await sql.query("ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS admin_notes TEXT");
    await sql.query("ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT now()");
    await sql.query("ALTER TABLE jobs ALTER COLUMN application_email_or_link DROP NOT NULL");
  } catch (err) {
    console.log("Column alteration notice:", err.message);
  }

  const [jobs, enquiries, applications, emailLogs] = await Promise.all([
    sql`SELECT count(*) FROM jobs`,
    sql`SELECT count(*) FROM contact_submissions`,
    sql`SELECT count(*) FROM applications`,
    sql`SELECT count(*) FROM email_logs`,
  ]);

  console.log("Database schema successfully synced!");
  console.log({
    jobsCount: jobs[0].count,
    enquiriesCount: enquiries[0].count,
    applicationsCount: applications[0].count,
    emailLogsCount: emailLogs[0].count,
  });
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
