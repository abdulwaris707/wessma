/**
 * Form submission helper.
 * Posts JSON to NEXT_PUBLIC_FORMS_ENDPOINT when configured (Formspree, Basin,
 * a serverless function, etc.). Without an endpoint, it runs in demo mode.
 */
export async function submitForm(form: string, data: Record<string, unknown>) {
  if (form === "contact" || form === "job-application") {
    const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (!res.ok) throw new Error("Submission failed");
    return { ok: true, demo: false } as const;
  }
  const endpoint = process.env.NEXT_PUBLIC_FORMS_ENDPOINT;
  if (!endpoint) {
    await new Promise((r) => setTimeout(r, 900));
    return { ok: true, demo: true } as const;
  }
  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ form, ...data, submittedAt: new Date().toISOString() }),
  });
  if (!res.ok) throw new Error("Submission failed");
  return { ok: true, demo: false } as const;
}
