import "server-only";
import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const COOKIE = "wessmaa_admin";
const MAX_AGE = 60 * 60 * 8; // 8 hours
type Session = { email: string; exp: number };

function getSecretKey(): string | null {
  const secret = process.env.SESSION_SECRET || process.env.AUTH_SECRET;
  if (secret && secret.length >= 32) return secret;
  return null;
}

/** Lets the login flow fail clearly when deployment secrets were not configured. */
export function adminAuthConfigured(): boolean {
  return Boolean(
    process.env.ADMIN_EMAIL &&
      process.env.ADMIN_PASSWORD_HASH?.startsWith("scrypt:") &&
      getSecretKey(),
  );
}

function secret(): string {
  const value = getSecretKey();
  if (!value) throw new Error("Admin authentication is not configured. Set SESSION_SECRET or AUTH_SECRET (32+ chars).");
  return value;
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function encode(session: Session): string {
  const body = Buffer.from(JSON.stringify(session)).toString("base64url");
  return `${body}.${sign(body)}`;
}

function decode(token?: string): Session | null {
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;
  try {
    const expected = sign(body);
    if (
      signature.length !== expected.length ||
      !timingSafeEqual(Buffer.from(signature), Buffer.from(expected))
    ) {
      return null;
    }
    const session = JSON.parse(Buffer.from(body, "base64url").toString()) as Session;
    return session.exp > Date.now() &&
      session.email === process.env.ADMIN_EMAIL?.toLowerCase()
      ? session
      : null;
  } catch {
    return null;
  }
}

export function verifyPassword(password: string, stored?: string): boolean {
  if (!stored?.startsWith("scrypt:")) return false;
  const [, salt, expected] = stored.split(":");
  if (!salt || !expected) return false;
  try {
    const actual = scryptSync(password, salt, 64).toString("base64");
    return (
      actual.length === expected.length &&
      timingSafeEqual(Buffer.from(actual), Buffer.from(expected))
    );
  } catch {
    return false;
  }
}

export function validAdminCredentials(email: string, password: string): boolean {
  return (
    adminAuthConfigured() &&
    email.toLowerCase() === process.env.ADMIN_EMAIL?.toLowerCase() &&
    verifyPassword(password, process.env.ADMIN_PASSWORD_HASH)
  );
}

export async function getAdminSession(): Promise<Session | null> {
  const cookieStore = await cookies();
  return decode(cookieStore.get(COOKIE)?.value);
}

export async function requireAdmin(): Promise<Session> {
  const session = await getAdminSession();
  if (!session) {
    redirect("/admin/login");
  }
  return session;
}

export async function setAdminSession(email: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(
    COOKIE,
    encode({ email: email.toLowerCase(), exp: Date.now() + MAX_AGE * 1000 }),
    {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: MAX_AGE,
    },
  );
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE);
}
