"use client";

import { useMemo, useState } from "react";
import {
  BriefcaseBusiness,
  CheckCircle2,
  Download,
  FileCheck,
  Inbox,
  LogOut,
  Mail,
  Pencil,
  Plus,
  Search,
  Send,
  Trash2,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import type { Application, Enquiry, Job, JobInput } from "@/lib/db";
import { logoutAction } from "@/app/admin/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const blankJob: JobInput = {
  title: "",
  slug: "",
  department: "",
  employmentType: "Full-time",
  location: "",
  shortDescription: "",
  fullDescription: "",
  responsibilities: [],
  requirements: [],
  benefits: [],
  salaryOrCompensation: "",
  applicationEmailOrLink: "",
  status: "draft",
  featured: false,
};

const statusClass: Record<string, string> = {
  published: "bg-emerald-50 text-emerald-700 border-emerald-200",
  draft: "bg-amber-50 text-amber-700 border-amber-200",
  closed: "bg-slate-100 text-slate-600 border-slate-200",
  new: "bg-orange-50 text-orange-700 border-orange-200",
  read: "bg-blue-50 text-blue-700 border-blue-200",
  replied: "bg-emerald-50 text-emerald-700 border-emerald-200",
  archived: "bg-slate-100 text-slate-600 border-slate-200",
  reviewed: "bg-blue-50 text-blue-700 border-blue-200",
  shortlisted: "bg-purple-50 text-purple-700 border-purple-200",
  rejected: "bg-rose-50 text-rose-700 border-rose-200",
  hired: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const toSlug = (v: string) =>
  v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const lines = (v: string) =>
  v
    .split("\n")
    .map((x) => x.trim())
    .filter(Boolean);

export function AdminDashboard({
  initialJobs,
  initialEnquiries,
  initialApplications,
  email,
}: {
  initialJobs: Job[];
  initialEnquiries: Enquiry[];
  initialApplications: Application[];
  email: string;
}) {
  const [tab, setTab] = useState<"overview" | "jobs" | "applications" | "enquiries" | "settings">("overview");
  const [jobs, setJobs] = useState(initialJobs);
  const [enquiries, setEnquiries] = useState(initialEnquiries);
  const [applications, setApplications] = useState(initialApplications);

  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [query, setQuery] = useState("");
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);

  // Email reply modal state
  const [replyTarget, setReplyTarget] = useState<{
    recipientEmail: string;
    recipientName: string;
    defaultSubject: string;
    relatedType: "enquiry" | "application";
    relatedId: string;
  } | null>(null);

  const stats = useMemo(() => {
    return {
      totalJobs: jobs.length,
      publishedJobs: jobs.filter((j) => j.status === "published").length,
      draftJobs: jobs.filter((j) => j.status === "draft").length,
      closedJobs: jobs.filter((j) => j.status === "closed").length,
      totalApplications: applications.length,
      newApplications: applications.filter((a) => a.status === "new").length,
      totalEnquiries: enquiries.length,
      newEnquiries: enquiries.filter((e) => e.status === "new").length,
    };
  }, [jobs, applications, enquiries]);

  // Job operations
  async function saveJobAction(job: JobInput, id?: string) {
    const res = await fetch(id ? `/api/admin/jobs/${id}` : "/api/admin/jobs", {
      method: id ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(job),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Failed to save job");
    setJobs((prev) => (id ? prev.map((x) => (x.id === id ? data : x)) : [data, ...prev]));
    setEditingJob(null);
    toast.success(id ? "Job updated successfully" : "Job created and saved");
  }

  async function removeJob(id: string) {
    if (!confirm("Are you sure you want to delete this job permanently? This action cannot be undone.")) return;
    const res = await fetch(`/api/admin/jobs/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Could not delete job");
      return;
    }
    setJobs((prev) => prev.filter((j) => j.id !== id));
    toast.success("Job removed permanently");
  }

  // Enquiry operations
  async function updateEnquiry(id: string, status: Enquiry["status"], adminNotes?: string) {
    const res = await fetch(`/api/admin/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNotes }),
    });
    if (!res.ok) {
      toast.error("Could not update enquiry");
      return;
    }
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status, adminNotes: adminNotes ?? e.adminNotes } : e)),
    );
    setSelectedEnquiry((prev) =>
      prev?.id === id ? { ...prev, status, adminNotes: adminNotes ?? prev.adminNotes } : prev,
    );
    toast.success("Enquiry updated");
  }

  async function removeEnquiry(id: string) {
    if (!confirm("Delete this contact enquiry permanently?")) return;
    const res = await fetch(`/api/admin/enquiries/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Could not delete enquiry");
      return;
    }
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
    setSelectedEnquiry(null);
    toast.success("Enquiry deleted");
  }

  // Application operations
  async function updateApplication(
    id: string,
    status: Application["status"],
    adminNotes?: string,
  ) {
    const res = await fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, adminNotes }),
    });
    if (!res.ok) {
      toast.error("Could not update application status");
      return;
    }
    setApplications((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status, adminNotes: adminNotes ?? a.adminNotes } : a)),
    );
    setSelectedApplication((prev) =>
      prev?.id === id ? { ...prev, status, adminNotes: adminNotes ?? prev.adminNotes } : prev,
    );
    toast.success("Applicant status updated");
  }

  async function removeApplication(id: string) {
    if (!confirm("Delete this job application permanently? The uploaded résumé will also be deleted."))
      return;
    const res = await fetch(`/api/admin/applications/${id}`, { method: "DELETE" });
    if (!res.ok) {
      toast.error("Could not delete application");
      return;
    }
    setApplications((prev) => prev.filter((a) => a.id !== id));
    setSelectedApplication(null);
    toast.success("Application deleted");
  }

  const nav = [
    ["overview", "Overview"],
    ["jobs", "Jobs"],
    ["applications", "Applications"],
    ["enquiries", "Enquiries"],
    ["settings", "Settings"],
  ] as const;

  return (
    <div className="min-h-screen bg-surface-alt">
      <div className="mx-auto flex max-w-[1440px]">
        {/* Sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 bg-navy-950 p-6 text-white lg:flex lg:flex-col justify-between">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">
              wess<span className="text-orange-400">maa</span>
            </p>
            <p className="mt-1 text-xs text-white/55">Management console</p>

            <nav className="mt-10 grid gap-1.5">
              {nav.map(([key, label]) => {
                const badge =
                  key === "applications"
                    ? stats.newApplications
                    : key === "enquiries"
                      ? stats.newEnquiries
                      : 0;
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setTab(key);
                      setQuery("");
                    }}
                    className={`flex items-center justify-between rounded-xl px-4 py-3 text-left text-sm font-medium transition-colors ${
                      tab === key
                        ? "bg-orange-500 text-white font-semibold shadow-sm"
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <span>{label}</span>
                    {badge > 0 && (
                      <span className="rounded-full bg-white/20 px-2 py-0.5 text-xs font-bold text-white">
                        {badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="border-t border-white/10 pt-4">
            <p className="truncate text-xs text-white/50 mb-3">{email}</p>
            <form action={logoutAction}>
              <button className="flex w-full items-center gap-2 text-sm text-white/65 hover:text-white transition-colors">
                <LogOut className="size-4" /> Sign out
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-8">
          <header className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow">Wessmaa Portal</p>
              <h1 className="mt-2 text-3xl font-bold text-navy-950 capitalize">{tab}</h1>
            </div>

            <div className="flex items-center gap-3">
              <span className="hidden text-sm text-muted-ink sm:block">{email}</span>
              {tab === "jobs" && (
                <Button
                  variant="accent"
                  onClick={() => setEditingJob({ ...blankJob, id: "", createdAt: "", updatedAt: "" })}
                >
                  <Plus className="size-4" /> New job
                </Button>
              )}
            </div>
          </header>

          {/* Mobile navigation pills */}
          <div className="mb-5 flex gap-1 overflow-auto rounded-xl bg-white p-1.5 shadow-sm lg:hidden">
            {nav.map(([key, label]) => (
              <button
                key={key}
                onClick={() => setTab(key)}
                className={`whitespace-nowrap rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  tab === key ? "bg-navy-950 text-white font-semibold" : "text-body hover:bg-surface-alt"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Tab Views */}
          {tab === "overview" && (
            <Overview
              stats={stats}
              jobs={jobs}
              enquiries={enquiries}
              applications={applications}
              onJobs={() => setTab("jobs")}
              onEnquiries={() => setTab("enquiries")}
              onApplications={() => setTab("applications")}
            />
          )}

          {tab === "jobs" && (
            <JobsSection
              jobs={jobs}
              query={query}
              setQuery={setQuery}
              onEdit={setEditingJob}
              onDelete={removeJob}
              onNew={() => setEditingJob({ ...blankJob, id: "", createdAt: "", updatedAt: "" })}
            />
          )}

          {tab === "applications" && (
            <ApplicationsSection
              applications={applications}
              jobs={jobs}
              query={query}
              setQuery={setQuery}
              onSelect={setSelectedApplication}
            />
          )}

          {tab === "enquiries" && (
            <EnquiriesSection
              enquiries={enquiries}
              query={query}
              setQuery={setQuery}
              onSelect={setSelectedEnquiry}
            />
          )}

          {tab === "settings" && (
            <section className="max-w-2xl rounded-3xl border border-line bg-white p-7 shadow-sm">
              <h2 className="text-xl font-bold text-navy-950">System & Administrator Details</h2>
              <dl className="mt-6 grid gap-5 text-sm">
                <div>
                  <dt className="text-muted-ink">Logged in administrator</dt>
                  <dd className="mt-1 font-semibold text-ink">{email}</dd>
                </div>
                <div>
                  <dt className="text-muted-ink">Official Sending Email</dt>
                  <dd className="mt-1 text-body">
                    {process.env.NEXT_PUBLIC_EMAIL_FROM || "Wessmaa <info@wessmaa.com>"}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-ink">Session Security</dt>
                  <dd className="mt-1 text-body">
                    Authenticated sessions use HMAC-SHA256 signatures over HTTP-only, secure cookies with scrypt password verification.
                  </dd>
                </div>
              </dl>
              <form action={logoutAction} className="mt-8">
                <Button variant="outline">
                  <LogOut className="size-4" /> End current session
                </Button>
              </form>
            </section>
          )}
        </main>
      </div>

      {/* Modals & Panels */}
      {editingJob && (
        <JobEditor job={editingJob} onClose={() => setEditingJob(null)} onSave={saveJobAction} />
      )}

      {selectedEnquiry && (
        <EnquiryPanel
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiry(null)}
          onStatus={updateEnquiry}
          onDelete={removeEnquiry}
          onReply={(enquiry) => {
            setReplyTarget({
              recipientEmail: enquiry.email,
              recipientName: enquiry.name,
              defaultSubject: `Re: ${enquiry.serviceProjectType || "Your enquiry with Wessmaa"}`,
              relatedType: "enquiry",
              relatedId: enquiry.id,
            });
          }}
        />
      )}

      {selectedApplication && (
        <ApplicationPanel
          application={selectedApplication}
          onClose={() => setSelectedApplication(null)}
          onStatus={updateApplication}
          onDelete={removeApplication}
          onReply={(app) => {
            setReplyTarget({
              recipientEmail: app.email,
              recipientName: app.fullName,
              defaultSubject: `Re: Application for ${app.jobTitle} at Wessmaa`,
              relatedType: "application",
              relatedId: app.id,
            });
          }}
        />
      )}

      {replyTarget && (
        <ReplyModal
          target={replyTarget}
          onClose={() => setReplyTarget(null)}
          onSent={() => {
            // refresh data
            if (replyTarget.relatedType === "enquiry") {
              setEnquiries((prev) =>
                prev.map((e) => (e.id === replyTarget.relatedId ? { ...e, status: "replied" } : e)),
              );
              setSelectedEnquiry((prev) =>
                prev?.id === replyTarget.relatedId ? { ...prev, status: "replied" } : prev,
              );
            } else {
              setApplications((prev) =>
                prev.map((a) => (a.id === replyTarget.relatedId ? { ...a, status: "reviewed" } : a)),
              );
              setSelectedApplication((prev) =>
                prev?.id === replyTarget.relatedId ? { ...prev, status: "reviewed" } : prev,
              );
            }
            setReplyTarget(null);
          }}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Overview Tab
// ---------------------------------------------------------------------------

function Overview({
  stats,
  jobs,
  enquiries,
  applications,
  onJobs,
  onEnquiries,
  onApplications,
}: {
  stats: {
    totalJobs: number;
    publishedJobs: number;
    draftJobs: number;
    closedJobs: number;
    totalApplications: number;
    newApplications: number;
    totalEnquiries: number;
    newEnquiries: number;
  };
  jobs: Job[];
  enquiries: Enquiry[];
  applications: Application[];
  onJobs: () => void;
  onEnquiries: () => void;
  onApplications: () => void;
}) {
  const cards: [string, number, LucideIcon, string][] = [
    ["Published jobs", stats.publishedJobs, CheckCircle2, "text-emerald-600"],
    ["New applications", stats.newApplications, Users, "text-orange-600"],
    ["New enquiries", stats.newEnquiries, Inbox, "text-blue-600"],
    ["Total postings", stats.totalJobs, BriefcaseBusiness, "text-navy-800"],
  ];

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([label, value, Icon, colorClass]) => (
          <div key={label} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <Icon className={`size-5 ${colorClass}`} />
            <p className="mt-4 text-3xl font-bold text-navy-950">{value}</p>
            <p className="mt-1 text-sm text-muted-ink">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-6 xl:grid-cols-3">
        {/* Recent Applications */}
        <section className="rounded-3xl border border-line bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-navy-950">Recent Applications</h2>
            <button onClick={onApplications} className="text-sm font-semibold text-orange-700 hover:underline">
              View all
            </button>
          </div>
          <div className="mt-5 grid gap-3">
            {applications.slice(0, 5).map((a) => (
              <div key={a.id} className="flex items-center justify-between rounded-xl bg-surface-alt p-3.5">
                <div className="min-w-0 pr-2">
                  <p className="font-medium text-ink truncate">{a.fullName}</p>
                  <p className="text-xs text-muted-ink truncate">{a.jobTitle}</p>
                </div>
                <Badge value={a.status} />
              </div>
            ))}
            {!applications.length && <Empty text="No applications received yet." />}
          </div>
        </section>

        {/* Recent Enquiries */}
        <section className="rounded-3xl border border-line bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-navy-950">Recent Enquiries</h2>
            <button onClick={onEnquiries} className="text-sm font-semibold text-orange-700 hover:underline">
              View all
            </button>
          </div>
          <div className="mt-5 grid gap-3">
            {enquiries.slice(0, 5).map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl bg-surface-alt p-3.5">
                <div className="min-w-0 pr-2">
                  <p className="font-medium text-ink truncate">{e.name}</p>
                  <p className="text-xs text-muted-ink truncate">{e.serviceProjectType || e.email}</p>
                </div>
                <Badge value={e.status} />
              </div>
            ))}
            {!enquiries.length && <Empty text="No client enquiries yet." />}
          </div>
        </section>

        {/* Recent Jobs */}
        <section className="rounded-3xl border border-line bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-navy-950">Current Roles</h2>
            <button onClick={onJobs} className="text-sm font-semibold text-orange-700 hover:underline">
              Manage
            </button>
          </div>
          <div className="mt-5 grid gap-3">
            {jobs.slice(0, 5).map((j) => (
              <div key={j.id} className="flex items-center justify-between rounded-xl bg-surface-alt p-3.5">
                <div className="min-w-0 pr-2">
                  <p className="font-medium text-ink truncate">{j.title}</p>
                  <p className="text-xs text-muted-ink">{j.department}</p>
                </div>
                <Badge value={j.status} />
              </div>
            ))}
            {!jobs.length && <Empty text="No jobs created yet." />}
          </div>
        </section>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Jobs Section
// ---------------------------------------------------------------------------

function JobsSection({
  jobs,
  query,
  setQuery,
  onEdit,
  onDelete,
  onNew,
}: {
  jobs: Job[];
  query: string;
  setQuery: (v: string) => void;
  onEdit: (j: Job) => void;
  onDelete: (id: string) => void;
  onNew: () => void;
}) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      const matchText = `${j.title} ${j.department} ${j.location}`.toLowerCase().includes(query.toLowerCase());
      const matchStatus = statusFilter === "all" || j.status === statusFilter;
      return matchText && matchStatus;
    });
  }, [jobs, query, statusFilter]);

  return (
    <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
      <div className="border-b border-line p-4 sm:flex sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-3 left-3 size-4 text-muted-ink" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search roles, department, location..."
            className="pl-9"
          />
        </div>

        <div className="mt-3 sm:mt-0 flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-line bg-white px-3 text-xs font-medium text-ink"
          >
            <option value="all">All statuses</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="closed">Closed</option>
          </select>
          <Button variant="accent" size="sm" onClick={onNew}>
            <Plus className="size-4" /> Add role
          </Button>
        </div>
      </div>

      {/* Mobile Stacked Card View */}
      <div className="grid divide-y divide-line sm:hidden">
        {filtered.map((j) => (
          <div key={j.id} className="p-4 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="font-semibold text-ink text-base">{j.title}</p>
                <p className="text-xs text-muted-ink font-mono">{j.slug}</p>
              </div>
              <Badge value={j.status} />
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-ink">
              <span>{j.department}</span>
              <span>•</span>
              <span>{j.location}</span>
              <span>•</span>
              <span>{j.employmentType}</span>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-line/60 pt-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(j)} className="h-8 text-xs">
                <Pencil className="size-3.5" /> Edit
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDelete(j.id)}
                className="h-8 text-xs text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 className="size-3.5" /> Delete
              </Button>
            </div>
          </div>
        ))}
        {!filtered.length && <Empty text="No jobs match your search or filter criteria." />}
      </div>

      {/* Desktop & Tablet Table View */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-surface-alt text-muted-ink">
            <tr>
              <th className="p-4 font-medium">Role</th>
              <th className="p-4 font-medium">Department</th>
              <th className="p-4 font-medium">Location</th>
              <th className="p-4 font-medium">Type</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((j) => (
              <tr key={j.id} className="border-t border-line hover:bg-surface-alt/50 transition-colors">
                <td className="p-4">
                  <p className="font-semibold text-ink">{j.title}</p>
                  <p className="text-xs text-muted-ink font-mono mt-0.5">/{j.slug}</p>
                </td>
                <td className="p-4 text-body">{j.department}</td>
                <td className="p-4 text-body">{j.location}</td>
                <td className="p-4 text-body">{j.employmentType}</td>
                <td className="p-4">
                  <Badge value={j.status} />
                </td>
                <td className="p-4 text-right">
                  <div className="flex justify-end gap-1">
                    <button
                      onClick={() => onEdit(j)}
                      title="Edit job"
                      className="rounded-lg p-2 text-navy-800 hover:bg-orange-50 transition-colors"
                    >
                      <Pencil className="size-4" />
                    </button>
                    <button
                      onClick={() => onDelete(j.id)}
                      title="Delete job"
                      className="rounded-lg p-2 text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {!filtered.length && <Empty text="No jobs match your search or filter criteria." />}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Applications Inbox Section
// ---------------------------------------------------------------------------

function ApplicationsSection({
  applications,
  jobs,
  query,
  setQuery,
  onSelect,
}: {
  applications: Application[];
  jobs: Job[];
  query: string;
  setQuery: (v: string) => void;
  onSelect: (a: Application) => void;
}) {
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [jobFilter, setJobFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const matchText = `${a.fullName} ${a.email} ${a.jobTitle} ${a.location}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchStatus = statusFilter === "all" || a.status === statusFilter;
      const matchJob = jobFilter === "all" || a.jobTitle === jobFilter || a.jobId === jobFilter;
      return matchText && matchStatus && matchJob;
    });
  }, [applications, query, statusFilter, jobFilter]);

  return (
    <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
      <div className="border-b border-line p-4 sm:flex sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-3 left-3 size-4 text-muted-ink" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search applicant name, email, role..."
            className="pl-9"
          />
        </div>

        <div className="mt-3 sm:mt-0 flex flex-wrap items-center gap-2">
          <select
            value={jobFilter}
            onChange={(e) => setJobFilter(e.target.value)}
            className="h-10 rounded-xl border border-line bg-white px-3 text-xs font-medium text-ink"
          >
            <option value="all">All roles</option>
            {jobs.map((j) => (
              <option key={j.id} value={j.title}>
                {j.title}
              </option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-line bg-white px-3 text-xs font-medium text-ink"
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="reviewed">Reviewed</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
            <option value="hired">Hired</option>
          </select>
        </div>
      </div>

      <div className="grid divide-y divide-line">
        {filtered.map((a) => (
          <button
            key={a.id}
            onClick={() => onSelect(a)}
            className="flex items-center justify-between gap-4 p-5 text-left hover:bg-surface-alt transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-ink text-base">{a.fullName}</p>
                <Badge value={a.status} />
              </div>
              <p className="text-sm font-medium text-orange-700 mt-0.5">{a.jobTitle}</p>
              <p className="text-xs text-muted-ink mt-1 truncate">
                {a.email} · {a.phone} · {a.location}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <span className="hidden text-xs text-muted-ink md:block">
                {new Date(a.createdAt).toLocaleDateString()}
              </span>
              <span className="text-xs font-semibold text-navy-800 underline">View profile</span>
            </div>
          </button>
        ))}

        {!filtered.length && <Empty text="No applications match your search or filter." />}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Enquiries Section
// ---------------------------------------------------------------------------

function EnquiriesSection({
  enquiries,
  query,
  setQuery,
  onSelect,
}: {
  enquiries: Enquiry[];
  query: string;
  setQuery: (v: string) => void;
  onSelect: (e: Enquiry) => void;
}) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filtered = useMemo(() => {
    return enquiries.filter((e) => {
      const matchText = `${e.name} ${e.email} ${e.company ?? ""} ${e.serviceProjectType ?? ""}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchStatus = statusFilter === "all" || e.status === statusFilter;
      return matchText && matchStatus;
    });
  }, [enquiries, query, statusFilter]);

  return (
    <section className="overflow-hidden rounded-3xl border border-line bg-white shadow-sm">
      <div className="border-b border-line p-4 sm:flex sm:items-center sm:justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute top-3 left-3 size-4 text-muted-ink" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search enquiries by client or topic..."
            className="pl-9"
          />
        </div>

        <div className="mt-3 sm:mt-0 flex items-center gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-xl border border-line bg-white px-3 text-xs font-medium text-ink"
          >
            <option value="all">All statuses</option>
            <option value="new">New</option>
            <option value="read">Read</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="grid divide-y divide-line">
        {filtered.map((e) => (
          <button
            key={e.id}
            onClick={() => onSelect(e)}
            className="flex items-center justify-between gap-4 p-5 text-left hover:bg-surface-alt transition-colors"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-ink text-base">{e.name}</p>
                <Badge value={e.status} />
              </div>
              <p className="truncate text-sm text-muted-ink mt-0.5">
                {e.serviceProjectType || "General Inquiry"}
                {e.company ? ` · ${e.company}` : ""}
              </p>
              <p className="truncate text-xs text-muted-ink mt-0.5">{e.email}</p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <span className="hidden text-xs text-muted-ink md:block">
                {new Date(e.createdAt).toLocaleDateString()}
              </span>
              <span className="text-xs font-semibold text-navy-800 underline">Open details</span>
            </div>
          </button>
        ))}

        {!filtered.length && <Empty text="No enquiries match your search or filter." />}
      </div>
    </section>
  );
}

// ---------------------------------------------------------------------------
// Modals & Panels
// ---------------------------------------------------------------------------

function Badge({ value }: { value: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold capitalize ${
        statusClass[value] ?? "bg-slate-100 text-slate-600 border-slate-200"
      }`}
    >
      {value}
    </span>
  );
}

function Empty({ text }: { text: string }) {
  return <p className="p-12 text-center text-sm text-muted-ink">{text}</p>;
}

function JobEditor({
  job,
  onClose,
  onSave,
}: {
  job: Job;
  onClose: () => void;
  onSave: (v: JobInput, id?: string) => Promise<void>;
}) {
  const [v, setV] = useState<JobInput>(job);
  const [saving, setSaving] = useState(false);

  const set = (key: keyof JobInput, value: JobInput[keyof JobInput]) =>
    setV((x) => ({ ...x, [key]: value }));

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(v, job.id || undefined);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Unable to save job");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] overflow-y-auto bg-navy-950/50 backdrop-blur-xs p-3 sm:p-8">
      <form
        onSubmit={submit}
        className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <p className="eyebrow">Job management</p>
            <h2 className="mt-1 text-2xl font-bold text-navy-950">
              {job.id ? "Edit Position" : "Create New Position"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-surface-alt transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Label label="Job title">
            <Input
              value={v.title}
              onChange={(e) => {
                set("title", e.target.value);
                if (!job.id) set("slug", toSlug(e.target.value));
              }}
              required
            />
          </Label>

          <Label label="Slug (URL identifier)">
            <Input
              value={v.slug}
              onChange={(e) => set("slug", toSlug(e.target.value))}
              required
            />
          </Label>

          <Label label="Department / Category">
            <Input
              value={v.department}
              onChange={(e) => set("department", e.target.value)}
              placeholder="Engineering, Design, Growth..."
              required
            />
          </Label>

          <Label label="Location">
            <Input
              value={v.location}
              onChange={(e) => set("location", e.target.value)}
              placeholder="Islamabad / Remote"
              required
            />
          </Label>

          <Label label="Employment type">
            <select
              value={v.employmentType}
              onChange={(e) => set("employmentType", e.target.value as JobInput["employmentType"])}
              className="h-12 w-full rounded-xl border border-line bg-white px-3 text-sm"
            >
              <option>Full-time</option>
              <option>Part-time</option>
              <option>Contract</option>
              <option>Internship</option>
              <option>Remote</option>
            </select>
          </Label>

          <Label label="Status">
            <select
              value={v.status}
              onChange={(e) => set("status", e.target.value as JobInput["status"])}
              className="h-12 w-full rounded-xl border border-line bg-white px-3 text-sm"
            >
              <option value="draft">Draft (hidden from public)</option>
              <option value="published">Published (live on /careers)</option>
              <option value="closed">Closed (not accepting applications)</option>
            </select>
          </Label>

          <Label label="Short description (Summary on cards)" className="sm:col-span-2">
            <Textarea
              rows={2}
              value={v.shortDescription}
              onChange={(e) => set("shortDescription", e.target.value)}
              required
            />
          </Label>

          <Label label="Full role description" className="sm:col-span-2">
            <Textarea
              rows={5}
              value={v.fullDescription}
              onChange={(e) => set("fullDescription", e.target.value)}
              required
            />
          </Label>

          <Label label="Responsibilities (one per line)">
            <Textarea
              rows={4}
              value={v.responsibilities.join("\n")}
              onChange={(e) => set("responsibilities", lines(e.target.value))}
            />
          </Label>

          <Label label="Requirements (one per line)">
            <Textarea
              rows={4}
              value={v.requirements.join("\n")}
              onChange={(e) => set("requirements", lines(e.target.value))}
            />
          </Label>

          <Label label="Benefits & perks (one per line)">
            <Textarea
              rows={3}
              value={v.benefits.join("\n")}
              onChange={(e) => set("benefits", lines(e.target.value))}
            />
          </Label>

          <Label label="Salary or Compensation range (optional)">
            <Input
              value={v.salaryOrCompensation}
              onChange={(e) => set("salaryOrCompensation", e.target.value)}
              placeholder="e.g. Competitive PKR / Market competitive"
            />
          </Label>
        </div>

        <div className="mt-5 flex items-center gap-3">
          <label className="flex items-center gap-2.5 text-sm font-medium text-ink cursor-pointer">
            <input
              type="checkbox"
              checked={v.featured}
              onChange={(e) => set("featured", e.target.checked)}
              className="size-4 rounded text-orange-600 focus:ring-orange-500"
            />
            Feature this position at the top of Careers
          </label>
        </div>

        <div className="mt-8 flex justify-end gap-3 border-t border-line pt-4">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" variant="accent" disabled={saving}>
            {saving ? "Saving…" : v.status === "draft" ? "Save as draft" : "Save and publish"}
          </Button>
        </div>
      </form>
    </div>
  );
}

function ApplicationPanel({
  application,
  onClose,
  onStatus,
  onDelete,
  onReply,
}: {
  application: Application;
  onClose: () => void;
  onStatus: (id: string, s: Application["status"], notes?: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReply: (a: Application) => void;
}) {
  const [notes, setNotes] = useState(application.adminNotes || "");
  const [savingNotes, setSavingNotes] = useState(false);

  async function handleNotesSave() {
    setSavingNotes(true);
    try {
      await onStatus(application.id, application.status, notes);
      toast.success("Internal notes saved");
    } finally {
      setSavingNotes(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] bg-navy-950/50 backdrop-blur-xs p-3 sm:p-8">
      <section className="ml-auto h-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <p className="eyebrow">Job Application</p>
              <h2 className="mt-1 text-2xl font-bold text-navy-950">{application.fullName}</h2>
              <p className="text-sm font-medium text-orange-700">{application.jobTitle}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-surface-alt transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mt-6 grid gap-5 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <Info label="Email" value={application.email} />
              <Info label="Phone" value={application.phone} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Info label="Location" value={application.location} />
              <Info
                label="Submitted On"
                value={new Date(application.createdAt).toLocaleString()}
              />
            </div>

            {application.linkedinUrl && (
              <div>
                <p className="text-muted-ink text-xs">LinkedIn</p>
                <a
                  href={application.linkedinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 text-orange-700 hover:underline font-medium block truncate"
                >
                  {application.linkedinUrl}
                </a>
              </div>
            )}

            {application.portfolioUrl && (
              <div>
                <p className="text-muted-ink text-xs">Portfolio / GitHub</p>
                <a
                  href={application.portfolioUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-1 text-orange-700 hover:underline font-medium block truncate"
                >
                  {application.portfolioUrl}
                </a>
              </div>
            )}

            {/* Resume Download Box */}
            <div className="rounded-2xl border border-line bg-surface-alt p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCheck className="size-6 text-orange-600" />
                <div>
                  <p className="font-semibold text-ink text-sm">{application.resumeFileName}</p>
                  <p className="text-xs text-muted-ink">
                    {(application.resumeFileSize / 1024).toFixed(0)} KB · {application.resumeFileType}
                  </p>
                </div>
              </div>
              <a
                href={`/api/admin/applications/${application.id}/resume`}
                target="_blank"
                rel="noreferrer"
                download={application.resumeFileName}
                className="inline-flex items-center gap-1.5 rounded-xl bg-navy-950 px-3.5 py-2 text-xs font-semibold text-white hover:bg-orange-600 transition-colors"
              >
                <Download className="size-3.5" /> Download CV
              </a>
            </div>

            <Info label="Cover Letter / Message" value={application.coverLetter} />

            {/* Status change dropdown */}
            <div className="rounded-2xl border border-line p-4 bg-white">
              <label className="block text-xs font-semibold text-muted-ink uppercase tracking-wider mb-2">
                Application Status
              </label>
              <select
                value={application.status}
                onChange={(e) =>
                  onStatus(application.id, e.target.value as Application["status"], notes)
                }
                className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm font-medium"
              >
                <option value="new">New</option>
                <option value="reviewed">Reviewed</option>
                <option value="shortlisted">Shortlisted</option>
                <option value="rejected">Rejected</option>
                <option value="hired">Hired</option>
              </select>
            </div>

            {/* Internal Admin Notes */}
            <div className="rounded-2xl border border-line p-4 bg-white">
              <label className="block text-xs font-semibold text-muted-ink uppercase tracking-wider mb-2">
                Internal Hiring Notes
              </label>
              <Textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Interview notes, salary expectations, screening impression..."
              />
              <div className="mt-2 flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleNotesSave}
                  disabled={savingNotes}
                >
                  {savingNotes ? "Saving..." : "Save Notes"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-line pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onDelete(application.id)}
            className="text-red-600 hover:bg-red-50 w-full sm:w-auto"
          >
            <Trash2 className="size-4" /> Delete
          </Button>

          <Button
            type="button"
            variant="accent"
            onClick={() => onReply(application)}
            className="w-full sm:w-auto"
          >
            <Mail className="size-4" /> Reply via Official Email
          </Button>
        </div>
      </section>
    </div>
  );
}

function EnquiryPanel({
  enquiry,
  onClose,
  onStatus,
  onDelete,
  onReply,
}: {
  enquiry: Enquiry;
  onClose: () => void;
  onStatus: (id: string, s: Enquiry["status"], notes?: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onReply: (e: Enquiry) => void;
}) {
  const [notes, setNotes] = useState(enquiry.adminNotes || "");
  const [savingNotes, setSavingNotes] = useState(false);

  async function handleNotesSave() {
    setSavingNotes(true);
    try {
      await onStatus(enquiry.id, enquiry.status, notes);
      toast.success("Internal notes saved");
    } finally {
      setSavingNotes(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[80] bg-navy-950/50 backdrop-blur-xs p-3 sm:p-8">
      <section className="ml-auto h-full max-w-xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between border-b border-line pb-4">
            <div>
              <p className="eyebrow">Client Enquiry</p>
              <h2 className="mt-1 text-2xl font-bold text-navy-950">{enquiry.name}</h2>
              <p className="text-sm font-medium text-orange-700">
                {enquiry.serviceProjectType || "General Inquiry"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 hover:bg-surface-alt transition-colors"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="mt-6 grid gap-5 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <Info label="Email" value={enquiry.email} />
              <Info label="Phone" value={enquiry.phone} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Info label="Company" value={enquiry.company} />
              <Info label="Budget" value={enquiry.budget} />
            </div>

            <Info label="Message / Project Scope" value={enquiry.message} />
            <Info label="Received Date" value={new Date(enquiry.createdAt).toLocaleString()} />

            {/* Status */}
            <div className="rounded-2xl border border-line p-4 bg-white">
              <label className="block text-xs font-semibold text-muted-ink uppercase tracking-wider mb-2">
                Enquiry Status
              </label>
              <select
                value={enquiry.status}
                onChange={(e) =>
                  onStatus(enquiry.id, e.target.value as Enquiry["status"], notes)
                }
                className="h-11 w-full rounded-xl border border-line bg-white px-3 text-sm font-medium"
              >
                <option value="new">New</option>
                <option value="read">Read</option>
                <option value="replied">Replied</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            {/* Internal Notes */}
            <div className="rounded-2xl border border-line p-4 bg-white">
              <label className="block text-xs font-semibold text-muted-ink uppercase tracking-wider mb-2">
                Internal Sales / Follow-up Notes
              </label>
              <Textarea
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Call logs, proposal stage, budget discussions..."
              />
              <div className="mt-2 flex justify-end">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleNotesSave}
                  disabled={savingNotes}
                >
                  {savingNotes ? "Saving..." : "Save Notes"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between border-t border-line pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => onDelete(enquiry.id)}
            className="text-red-600 hover:bg-red-50 w-full sm:w-auto"
          >
            <Trash2 className="size-4" /> Delete
          </Button>

          <Button
            type="button"
            variant="accent"
            onClick={() => onReply(enquiry)}
            className="w-full sm:w-auto"
          >
            <Mail className="size-4" /> Reply via Official Email
          </Button>
        </div>
      </section>
    </div>
  );
}

function ReplyModal({
  target,
  onClose,
  onSent,
}: {
  target: {
    recipientEmail: string;
    recipientName: string;
    defaultSubject: string;
    relatedType: "enquiry" | "application";
    relatedId: string;
  };
  onClose: () => void;
  onSent: () => void;
}) {
  const [subject, setSubject] = useState(target.defaultSubject);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a reply message.");
      return;
    }

    setSending(true);
    try {
      const res = await fetch("/api/admin/reply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          recipientEmail: target.recipientEmail,
          recipientName: target.recipientName,
          subject,
          message,
          relatedType: target.relatedType,
          relatedId: target.relatedId,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Email delivery failed.");
      }

      toast.success(`Reply sent to ${target.recipientEmail}`);
      onSent();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to dispatch email.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[90] bg-navy-950/60 backdrop-blur-xs p-3 sm:p-8 flex items-center justify-center">
      <form
        onSubmit={handleSend}
        className="w-full max-w-2xl rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
      >
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <p className="eyebrow">Official Communication</p>
            <h2 className="mt-1 text-2xl font-bold text-navy-950">
              Send Email Reply to {target.recipientName}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-surface-alt transition-colors"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-4 text-sm">
          <div>
            <p className="text-muted-ink text-xs font-semibold uppercase">Recipient</p>
            <p className="font-semibold text-ink mt-0.5">
              {target.recipientName} &lt;{target.recipientEmail}&gt;
            </p>
          </div>

          <Label label="Email Subject">
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </Label>

          <Label label="Message Body">
            <Textarea
              rows={8}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your official response here. It will be sent directly from your company address..."
              required
            />
          </Label>
        </div>

        <div className="mt-8 flex items-center justify-between border-t border-line pt-4">
          <p className="text-xs text-muted-ink">
            Dispatches from official sender via configured SMTP or Resend credentials.
          </p>

          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="accent" disabled={sending}>
              <Send className="size-4" />
              {sending ? "Sending..." : "Send Reply"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

function Label({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`grid gap-2 text-sm font-medium text-ink ${className}`}>
      <span>{label}</span>
      {children}
    </label>
  );
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-muted-ink text-xs font-medium uppercase tracking-wider">{label}</p>
      <p className="mt-1 whitespace-pre-wrap leading-relaxed text-ink font-medium">
        {value || "—"}
      </p>
    </div>
  );
}
