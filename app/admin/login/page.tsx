import { redirect } from "next/navigation";
import { Logo } from "@/components/shared/logo";
import { getAdminSession } from "@/lib/auth";
import { AdminLoginForm } from "@/components/admin/login-form";

export default async function AdminLoginPage() { if (await getAdminSession()) redirect("/admin"); return <main className="min-h-[70vh] bg-surface-alt px-4 py-16 sm:py-24"><div className="mx-auto max-w-md"><Logo /><section className="mt-10 rounded-3xl border border-line bg-white p-7 shadow-[var(--shadow-lift)] sm:p-10"><p className="eyebrow">Wessmaa administration</p><h1 className="mt-4 text-h2 font-bold text-navy-950">Welcome back.</h1><p className="mt-3 text-body">Sign in to manage opportunities and client enquiries.</p><AdminLoginForm /></section></div></main>; }
