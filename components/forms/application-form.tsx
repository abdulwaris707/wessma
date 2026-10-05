"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { FileText, Loader2, UploadCloud, X } from "lucide-react";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Field } from "./field";
import { SuccessState } from "./success-state";
import { cn } from "@/lib/utils";

const MAX = 5 * 1024 * 1024;
const ACCEPT = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const schema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  location: z.string().min(2, "Please enter your current city or location"),
  role: z.string().min(1, "Please specify or choose a role"),
  linkedinUrl: z.union([z.literal(""), z.string().url("Please enter a valid URL")]),
  portfolioUrl: z.union([z.literal(""), z.string().url("Please enter a valid URL")]),
  coverLetter: z.string().min(20, "Tell us why you'd be a great fit (20+ characters)"),
  website: z.string().optional(), // Honeypot
});
type Values = z.infer<typeof schema>;

export function ApplicationForm({
  defaultRole = "",
  jobId = "",
  availableJobs = [],
}: {
  defaultRole?: string;
  jobId?: string;
  availableJobs?: { id: string; title: string; slug: string }[];
}) {
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string>();
  const [drag, setDrag] = useState(false);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const form = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      role: defaultRole,
      linkedinUrl: "",
      portfolioUrl: "",
      coverLetter: "",
      website: "",
    },
  });
  const e = form.formState.errors;

  const pick = (f?: File) => {
    if (!f) return;
    const isValidType =
      ACCEPT.includes(f.type) ||
      f.name.endsWith(".pdf") ||
      f.name.endsWith(".doc") ||
      f.name.endsWith(".docx");
    if (!isValidType) return setFileError("Please upload a PDF or Word document (.pdf, .doc, .docx)");
    if (f.size > MAX) return setFileError("File size must be 5 MB or smaller");
    setFileError(undefined);
    setFile(f);
  };

  const onSubmit = async (values: Values) => {
    if (!file) {
      setFileError("Please attach your CV / résumé");
      return;
    }

    try {
      // Read file to base64
      const base64Data = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (err) => reject(err);
        reader.readAsDataURL(file);
      });

      const res = await fetch("/api/careers/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: jobId || undefined,
          jobTitle: values.role,
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          location: values.location,
          linkedinUrl: values.linkedinUrl || undefined,
          portfolioUrl: values.portfolioUrl || undefined,
          coverLetter: values.coverLetter,
          resumeFileName: file.name,
          resumeFileType: file.type || "application/pdf",
          resumeFileSize: file.size,
          resumeFileData: base64Data,
          website: values.website, // honeypot
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setDone(true);
      toast.success("Application submitted successfully!");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  if (done) {
    return (
      <SuccessState
        title="Application received"
        text="Thank you for applying to Wessmaa. A confirmation email has been sent to your address. Our recruitment squad reviews every profile carefully and will follow up shortly."
      >
        <Button
          variant="outline"
          onClick={() => {
            setDone(false);
            setFile(null);
            form.reset();
          }}
        >
          Submit another application
        </Button>
      </SuccessState>
    );
  }

  return (
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      noValidate
      className="grid grid-cols-1 gap-5 sm:grid-cols-2"
    >
      {/* Honeypot field for spam prevention */}
      <div className="hidden" aria-hidden="true">
        <input type="text" tabIndex={-1} autoComplete="off" {...form.register("website")} />
      </div>

      <Field id="app-name" label="Full name" error={e.fullName?.message}>
        <Input
          id="app-name"
          placeholder="e.g. Sarah Khan"
          autoComplete="name"
          aria-invalid={!!e.fullName}
          {...form.register("fullName")}
        />
      </Field>

      <Field id="app-email" label="Email address" error={e.email?.message}>
        <Input
          id="app-email"
          type="email"
          placeholder="sarah@example.com"
          autoComplete="email"
          aria-invalid={!!e.email}
          {...form.register("email")}
        />
      </Field>

      <Field id="app-phone" label="Phone number" error={e.phone?.message}>
        <Input
          id="app-phone"
          type="tel"
          placeholder="+92 300 1234567"
          autoComplete="tel"
          aria-invalid={!!e.phone}
          {...form.register("phone")}
        />
      </Field>

      <Field id="app-location" label="Current city / location" error={e.location?.message}>
        <Input
          id="app-location"
          placeholder="e.g. Islamabad, Pakistan"
          aria-invalid={!!e.location}
          {...form.register("location")}
        />
      </Field>

      <Field id="app-role" label="Position applied for" error={e.role?.message} className="sm:col-span-2">
        {defaultRole ? (
          <Input
            id="app-role"
            readOnly
            className="bg-surface-alt font-medium text-ink cursor-not-allowed"
            {...form.register("role")}
          />
        ) : (
          <select
            id="app-role"
            aria-invalid={!!e.role}
            {...form.register("role")}
            className="border-line text-ink h-12 w-full rounded-xl border bg-white px-4 text-[0.9375rem] outline-none focus-visible:border-orange-500 focus-visible:shadow-[0_0_0_4px_rgb(249_115_22/0.12)] aria-[invalid=true]:border-red-500"
          >
            <option value="">Select a role</option>
            {availableJobs.map((j) => (
              <option key={j.id} value={j.title}>
                {j.title}
              </option>
            ))}
            <option value="General application / Open role">General application / Open role</option>
          </select>
        )}
      </Field>

      <Field
        id="app-linkedin"
        label="LinkedIn profile"
        optional
        error={e.linkedinUrl?.message}
      >
        <Input
          id="app-linkedin"
          type="url"
          placeholder="https://linkedin.com/in/username"
          aria-invalid={!!e.linkedinUrl}
          {...form.register("linkedinUrl")}
        />
      </Field>

      <Field
        id="app-portfolio"
        label="Portfolio / GitHub URL"
        optional
        error={e.portfolioUrl?.message}
      >
        <Input
          id="app-portfolio"
          type="url"
          placeholder="https://github.com/username or your site"
          aria-invalid={!!e.portfolioUrl}
          {...form.register("portfolioUrl")}
        />
      </Field>

      <Field
        id="app-message"
        label="Cover letter / Why Wessmaa?"
        error={e.coverLetter?.message}
        className="sm:col-span-2"
      >
        <Textarea
          id="app-message"
          rows={4}
          placeholder="Share your experience, relevant wins, and what excites you about building with Wessmaa..."
          aria-invalid={!!e.coverLetter}
          {...form.register("coverLetter")}
        />
      </Field>

      <div className="sm:col-span-2">
        <p className="text-ink mb-2 text-sm font-medium">CV / Résumé (PDF, DOC, DOCX up to 5 MB)</p>
        {file ? (
          <div className="border-line bg-surface-alt flex items-center gap-3 rounded-2xl border p-4">
            <span className="grid size-11 place-items-center rounded-xl bg-orange-50 text-orange-700">
              <FileText className="size-5" aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-ink truncate text-sm font-semibold">{file.name}</p>
              <p className="text-muted-ink text-xs">{(file.size / 1024).toFixed(0)} KB</p>
            </div>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="text-muted-ink hover:text-ink grid size-10 place-items-center rounded-full hover:bg-white"
              aria-label="Remove file"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            onDragOver={(ev) => {
              ev.preventDefault();
              setDrag(true);
            }}
            onDragLeave={() => setDrag(false)}
            onDrop={(ev) => {
              ev.preventDefault();
              setDrag(false);
              pick(ev.dataTransfer.files[0]);
            }}
            className={cn(
              "flex w-full flex-col items-center gap-2 rounded-2xl border-2 border-dashed px-6 py-8 text-center transition-colors cursor-pointer",
              drag
                ? "border-orange-500 bg-orange-50"
                : fileError
                  ? "border-red-400 bg-red-50/40"
                  : "border-line bg-surface-alt hover:border-navy-800/30",
            )}
          >
            <UploadCloud className="size-7 text-orange-500" aria-hidden />
            <span className="text-ink text-sm font-semibold">
              Drop your CV here or{" "}
              <span className="text-navy-800 underline underline-offset-4">browse files</span>
            </span>
            <span className="text-muted-ink text-xs">Supported: PDF, DOC, DOCX (Max 5 MB)</span>
          </button>
        )}
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          className="sr-only"
          tabIndex={-1}
          aria-label="Upload CV"
          onChange={(ev) => pick(ev.target.files?.[0] ?? undefined)}
        />
        {fileError && (
          <p role="alert" className="mt-2 text-xs font-medium text-red-600">
            {fileError}
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse items-start justify-between gap-4 sm:col-span-2 sm:flex-row sm:items-center">
        <p className="text-muted-ink text-xs">
          Your data is processed securely and directly reviewed by our internal team.
        </p>
        <Button type="submit" variant="accent" size="lg" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting && <Loader2 className="size-4 animate-spin" />}
          Submit application
        </Button>
      </div>
    </form>
  );
}
