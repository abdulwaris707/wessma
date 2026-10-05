import "server-only";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "wessmaa_admin";
const MAX_AGE = 60 * 60 * 8;
type Session = { email: string; exp: number };

/** Lets the login flow fail clearly when deployment secrets were not configured. */
export function adminAuthConfigured() {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_HASH?.startsWith("scrypt:") &&
      process.env.SESSION_SECRET &&
      process.env.SESSION_SECRET.length >= 32,
  );
}

function secret() {
  const value = process.env.SESSION_SECRET;
  if (!value || value.length < 32) throw new Error("Admin authentication is not configured");
  return value;
}
function sign(value: string) { return createHmac("sha256", secret()).update(value).digest("base64url"); }
function encode(session: Session) {
  const body = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${body}.${sign(body)}`;
}
function decode(token?: string): Session | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  const expected = sign(body);
  if (signature.length !== expected.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return null;
  try {
    const session = JSON.parse(Buffer.from(body, "base64url").toString()) as Session;
    return session.exp > Date.now() && session.email === process.env.ADMIN_EMAIL?.toLowerCase() ? session : null;
  } catch { return null; }
}

export function verifyPassword(password: string, stored?: string) {
  if (!stored?.startsWith("scrypt:")) return false;
  const [, salt, expected] = stored.split(":");
  if (!salt || !expected) return false;
  const actual = scryptSync(password, salt, 64).toString("base64");
  return actual.length === expected.length && timingSafeEqual(Buffer.from(actual), Buffer.from(expected));
}
export function validAdminCredentials(email: string, password: string) {
  return adminAuthConfigured() && email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase() && verifyPassword(password, process.env.ADMIN_PASSWORD_HASH);
}
export async function getAdminSession() { return decode((await cookies()).get(COOKIE)?.value); }
export async function requireAdmin() { if (!(await getAdminSession())) redirect("/admin/login"); }
export async function setAdminSession(email: string) {
  (await cookies()).set(COOKIE, encode({ email: email.toLowerCase(), exp: Date.now() + MAX_AGE * 1000 }), { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: MAX_AGE });
}
export async function clearAdminSession() { (await cookies()).delete(COOKIE); }
