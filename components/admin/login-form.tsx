"use client";
import { useActionState } from "react";
import { Loader2, LockKeyhole } from "lucide-react";
import { loginAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function AdminLoginForm() {
  const [state, action, pending] = useActionState(loginAction, { error: "" });
  return <form action={action} className="mt-8 grid gap-5" noValidate><div><label htmlFor="email" className="text-sm font-medium text-ink">Email</label><Input id="email" name="email" type="email" autoComplete="username" required className="mt-2" /></div><div><label htmlFor="password" className="text-sm font-medium text-ink">Password</label><Input id="password" name="password" type="password" autoComplete="current-password" required className="mt-2" /></div>{state.error && <p role="alert" className="text-sm font-medium text-red-600">{state.error}</p>}<Button type="submit" variant="accent" size="lg" disabled={pending}>{pending ? <Loader2 className="size-4 animate-spin" /> : <LockKeyhole className="size-4" />}Sign in securely</Button></form>;
}
