"use server";
import { redirect } from "next/navigation";
import { clearAdminSession, setAdminSession, validAdminCredentials } from "@/lib/auth";

export async function loginAction(_: { error: string }, formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!validAdminCredentials(email, password)) return { error: "Invalid email or password." };
  await setAdminSession(email);
  redirect("/admin");
}
export async function logoutAction() { await clearAdminSession(); redirect("/admin/login"); }
