import { readFileSync } from "node:fs";
import { neon } from "@neondatabase/serverless";

const line = readFileSync(".env.local", "utf8").split(/\r?\n/).find((value) => value.startsWith("DATABASE_URL="));
if (!line) throw new Error("DATABASE_URL is missing from .env.local");
const sql = neon(line.slice("DATABASE_URL=".length));
const [jobs, enquiries] = await Promise.all([
  sql.query("SELECT count(*)::int AS count FROM jobs"),
  sql.query("SELECT count(*)::int AS count FROM contact_submissions"),
]);
console.log(`Verified database tables: ${jobs[0].count} jobs, ${enquiries[0].count} enquiries.`);
