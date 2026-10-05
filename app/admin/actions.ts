"use server";
import { redirect } from "next/navigation";
import { adminAuthConfigured, clearAdminSession, setAdminSession, validAdminCredentials } from "@/lib/auth";

export async function loginAction(_: { error: string }, formData: FormData) {
  if (!adminAuthConfigured()) {
    return { error: "Admin access has not been configured for this deployment. Contact the site owner." };
  }
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!validAdminCredentials(email, password)) return { error: "Invalid email or password." };
  await setAdminSession(email);
  redirect("/admin");
}
export async function logoutAction() { await clearAdminSession(); redirect("/admin/login"); }
