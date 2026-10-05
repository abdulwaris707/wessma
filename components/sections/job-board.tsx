"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Briefcase, MapPin, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { Job } from "@/lib/db";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Database-backed, filterable public list of published opportunities. */
export function JobBoard({ jobs }: { jobs: Job[] }) {
  const departments = ["All", ...Array.from(new Set(jobs.map((j) => j.department)))];
  const [dept, setDept] = useState("All");
  const [query, setQuery] = useState("");
  const list = useMemo(() => jobs.filter((j) => (dept === "All" || j.department === dept) && `${j.title} ${j.location} ${j.employmentType}`.toLowerCase().includes(query.toLowerCase())), [dept, jobs, query]);
  return <div>
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"><div role="group" aria-label="Filter by department" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto px-1">{departments.map((d) => { const count = d === "All" ? jobs.length : jobs.filter((j) => j.department === d).length; return <button key={d} type="button" aria-pressed={dept === d} onClick={() => setDept(d)} className="relative inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-medium">{dept === d ? <motion.span layoutId="dept-pill" className="bg-navy-950 absolute inset-0 rounded-full" transition={{ duration: 0.4, ease: EASE }} /> : <span className="border-line absolute inset-0 rounded-full border bg-white" />}<span className={cn("relative", dept === d ? "text-white" : "text-body")}>{d}</span><span className={cn("relative rounded-full px-1.5 text-xs", dept === d ? "bg-white/15 text-white" : "bg-surface-subtle text-muted-ink")}>{count}</span></button>; })}</div><label className="relative block shrink-0"><span className="sr-only">Search opportunities</span><Search className="absolute top-3 left-3 size-4 text-muted-ink"/><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search roles" className="border-line h-11 rounded-xl border bg-white py-2 pr-3 pl-9 text-sm outline-none focus:border-orange-500"/></label></div>
    <motion.ul layout className="mt-8 grid gap-3"><AnimatePresence mode="popLayout" initial={false}>{list.map((j) => <motion.li key={j.slug} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: EASE }}><Link href={`/careers/${j.slug}`} className="group border-line hover:border-navy-800/20 flex flex-col gap-4 rounded-3xl border bg-white p-6 transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] sm:flex-row sm:items-center sm:justify-between sm:p-7"><div><p className="text-xs font-semibold tracking-[0.12em] text-orange-700 uppercase">{j.department}</p><h3 className="font-display text-navy-950 mt-2 text-xl font-bold">{j.title}</h3><p className="text-body mt-2 max-w-2xl text-sm">{j.shortDescription}</p><div className="text-muted-ink mt-3 flex flex-wrap gap-x-5 gap-y-1.5 text-sm"><span className="inline-flex items-center gap-1.5"><MapPin className="size-4" aria-hidden />{j.location}</span><span className="inline-flex items-center gap-1.5"><Briefcase className="size-4" aria-hidden />{j.employmentType}</span></div></div><span className="bg-surface-alt text-navy-800 group-hover:text-navy-950 inline-flex items-center gap-2 self-start rounded-full px-4 py-2.5 text-sm font-semibold transition-colors group-hover:bg-orange-500 sm:self-center">View details <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden /></span></Link></motion.li>)}</AnimatePresence>{!list.length && <li className="border-line rounded-3xl border border-dashed bg-white p-10 text-center"><p className="font-semibold text-ink">No open opportunities right now</p><p className="text-body mt-2 text-sm">Please check back soon or send us an open application below.</p></li>}</motion.ul>
  </div>;
}
