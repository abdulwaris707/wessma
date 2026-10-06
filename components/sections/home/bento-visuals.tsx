"use client";

import { useRef } from "react";
import { Bot, Database, Mail, MessageCircle, Search, Sheet, Users } from "lucide-react";
import { AnimatedBeam } from "@/components/magicui/animated-beam";
import { BrandIcon } from "@/components/shared/brand-icon";
import { cn } from "@/lib/utils";

/* Micro-visuals for each bento cell. Each reacts to hover on the parent `group`. */

export function CodeVisual() {
  const lines = [
    { w: "w-24", c: "bg-navy-800/70" },
    { w: "w-40", c: "bg-orange-500/70" },
    { w: "w-32", c: "bg-slate-300" },
    { w: "w-48", c: "bg-navy-600/50" },
    { w: "w-28", c: "bg-slate-300" },
    { w: "w-36", c: "bg-orange-500/50" },
  ];
  return (
    <div className="relative grid grid-cols-5 gap-3">
      <div className="border-line col-span-3 rounded-xl border bg-white p-4 shadow-[var(--shadow-soft)]">
        <div className="mb-3 flex gap-1.5">
          <span className="size-2 rounded-full bg-slate-200" />
          <span className="size-2 rounded-full bg-slate-200" />
          <span className="size-2 rounded-full bg-slate-200" />
        </div>
        <div className="grid gap-2">
          {lines.map((l, i) => (
            <div
              key={i}
              className="flex items-center gap-2"
              style={{ paddingLeft: `${(i % 3) * 12}px` }}
            >
              <span className="w-3 text-right font-mono text-[9px] text-slate-300">{i + 1}</span>
              <span
                className={cn(
                  "h-1.5 origin-left rounded-full transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-110",
                  l.w,
                  l.c,
                )}
                style={{ transitionDelay: `${i * 40}ms` }}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-2">
        {[
          { l: "Build", s: "Passed", c: "bg-emerald-500" },
          { l: "Tests · 412", s: "Passed", c: "bg-emerald-500" },
          { l: "Deploy", s: "Live", c: "bg-orange-500" },
        ].map((p, i) => (
          <div
            key={p.l}
            className="border-line flex items-center justify-between rounded-lg border bg-white px-3 py-2 text-[11px] shadow-[var(--shadow-soft)] transition-transform duration-500 group-hover:-translate-x-1"
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            <span className="text-navy-950 font-medium">{p.l}</span>
            <span className="text-muted-ink inline-flex items-center gap-1">
              <span className={cn("size-1.5 rounded-full", p.c)} />
              {p.s}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function BeamNode({
  children,
  className,
  innerRef,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  innerRef: React.RefObject<HTMLDivElement | null>;
  label: string;
}) {
  return (
    <div
      ref={innerRef}
      title={label}
      className={cn(
        "border-line text-navy-800 z-10 grid size-11 place-items-center rounded-full border bg-white shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function AutomationVisual() {
  const container = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLDivElement>(null),
    b = useRef<HTMLDivElement>(null),
    c = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const d = useRef<HTMLDivElement>(null),
    e = useRef<HTMLDivElement>(null),
    f = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={container}
      className="relative flex h-60 w-full items-center justify-between px-2 sm:px-6"
    >
      <div className="flex flex-col gap-6">
        <BeamNode innerRef={a} label="Email">
          <Mail className="size-4" />
        </BeamNode>
        <BeamNode innerRef={b} label="WhatsApp">
          <MessageCircle className="size-4" />
        </BeamNode>
        <BeamNode innerRef={c} label="Forms">
          <Sheet className="size-4" />
        </BeamNode>
      </div>
      <div
        ref={hub}
        className="bg-navy-950 z-10 grid size-16 place-items-center rounded-2xl text-white shadow-[0_12px_32px_-8px_rgb(10_31_68/0.5)] transition-transform duration-500 group-hover:scale-110"
      >
        <Bot className="size-7 text-orange-400" />
      </div>
      <div className="flex flex-col gap-6">
        <BeamNode innerRef={d} label="HubSpot">
          <BrandIcon name="HubSpot" className="size-4" />
        </BeamNode>
        <BeamNode innerRef={e} label="CRM">
          <Users className="size-4" />
        </BeamNode>
        <BeamNode innerRef={f} label="Database">
          <Database className="size-4" />
        </BeamNode>
      </div>
      <AnimatedBeam containerRef={container} fromRef={a} toRef={hub} curvature={-40} />
      <AnimatedBeam containerRef={container} fromRef={b} toRef={hub} delay={0.4} />
      <AnimatedBeam containerRef={container} fromRef={c} toRef={hub} curvature={40} delay={0.8} />
      <AnimatedBeam containerRef={container} fromRef={hub} toRef={d} curvature={-40} delay={1.2} />
      <AnimatedBeam containerRef={container} fromRef={hub} toRef={e} delay={1.6} />
      <AnimatedBeam containerRef={container} fromRef={hub} toRef={f} curvature={40} delay={2} />
    </div>
  );
}

export function LighthouseVisual() {
  return (
    <div className="flex items-center justify-center gap-3">
      {[
        { v: 98, l: "Perf" },
        { v: 100, l: "A11y" },
        { v: 100, l: "SEO" },
      ].map((r, i) => {
        const C = 2 * Math.PI * 20;
        return (
          <div key={r.l} className="flex flex-col items-center gap-1.5">
            <div className="relative size-16">
              <svg viewBox="0 0 48 48" className="size-16 -rotate-90">
                <circle cx="24" cy="24" r="20" fill="none" stroke="#eef2f7" strokeWidth="4" />
                <circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke={i === 0 ? "#f97316" : "#1e3a8a"}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  className="transition-[stroke-dashoffset] duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] [stroke-dashoffset:var(--o1)] group-hover:[stroke-dashoffset:var(--o2)]"
                  style={{
                    ["--o1" as string]: C * (1 - (r.v - 12) / 100),
                    ["--o2" as string]: C * (1 - r.v / 100),
                  }}
                />
              </svg>
              <span className="font-display text-navy-950 absolute inset-0 grid place-items-center text-sm font-bold">
                {r.v}
              </span>
            </div>
            <span className="text-muted-ink text-[11px] font-medium">{r.l}</span>
          </div>
        );
      })}
    </div>
  );
}

export function PhoneVisual() {
  return (
    <div className="flex items-end justify-center gap-3">
      {[0, 1].map((i) => (
        <div
          key={i}
          className={cn(
            "border-navy-950 w-24 rounded-[18px] border-[3px] bg-white p-1.5 shadow-[var(--shadow-lift)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
            i === 0
              ? "h-40 -rotate-6 group-hover:-translate-y-1 group-hover:-rotate-10"
              : "h-44 rotate-3 group-hover:-translate-y-2 group-hover:rotate-6",
          )}
        >
          <div className="bg-navy-950 mx-auto mb-1.5 h-1 w-8 rounded-full" />
          <div className={cn("h-10 rounded-lg", i === 0 ? "bg-gradient-brand" : "bg-orange-50")} />
          <div className="mt-1.5 grid gap-1">
            <div className="h-1.5 w-4/5 rounded-full bg-slate-200" />
            <div className="h-1.5 w-3/5 rounded-full bg-slate-200" />
          </div>
          <div className="mt-2 grid grid-cols-2 gap-1">
            <div className="bg-surface-subtle h-8 rounded-md" />
            <div className="bg-surface-subtle h-8 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function SeoVisual() {
  return (
    <div className="mx-auto w-full max-w-[260px]">
      <div className="border-line text-body flex h-10 items-center gap-2 rounded-full border bg-white px-3.5 text-[12px] shadow-[var(--shadow-soft)]">
        <Search className="text-muted-ink size-3.5" />
        <span className="truncate">best software agency</span>
      </div>
      <div className="mt-3 grid gap-1.5">
        {["competitor.io", "wessmaa.com", "another.co"].map((d, i) => (
          <div
            key={d}
            className={cn(
              "flex items-center gap-2 rounded-lg border px-3 py-2 text-[11px] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
              i === 1
                ? "text-navy-950 border-orange-500/40 bg-orange-50 font-semibold group-hover:-translate-y-[calc(100%+6px)]"
                : "border-line text-muted-ink bg-white",
              i === 0 && "group-hover:translate-y-[calc(100%+6px)]",
            )}
          >
            <span className="text-muted-ink w-4 font-mono text-[10px]">#{i + 1}</span>
            {d}
          </div>
        ))}
      </div>
    </div>
  );
}

export function AdsVisual() {
  const bars = [34, 48, 42, 60, 56, 78, 92];
  return (
    <div className="flex h-32 items-end justify-center gap-2">
      {bars.map((h, i) => (
        <span
          key={i}
          className={cn(
            "w-5 origin-bottom rounded-t-md transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-y-110",
            i === bars.length - 1 ? "bg-orange-500" : "bg-navy-800/15",
          )}
          style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
        />
      ))}
    </div>
  );
}

export function DesignVisual() {
  return (
    <div className="relative mx-auto h-32 w-full max-w-[240px]">
      <div className="border-navy-800/30 absolute inset-x-4 top-2 h-24 rounded-xl border border-dashed bg-white" />
      <div className="bg-navy-950 absolute top-6 left-8 h-8 w-24 rounded-md transition-transform duration-700 group-hover:translate-x-3" />
      <div className="absolute top-16 left-8 h-3 w-32 rounded-full bg-slate-200" />
      <div className="absolute top-[5.25rem] left-8 h-3 w-20 rounded-full bg-slate-200" />
      <div className="absolute right-6 bottom-2 flex gap-1.5">
        {["#0A1F44", "#1E3A8A", "#F97316", "#FFF1E6"].map((c) => (
          <span
            key={c}
            className="size-5 rounded-full border border-white shadow-[var(--shadow-soft)]"
            style={{ background: c }}
          />
        ))}
      </div>
      <svg
        viewBox="0 0 24 24"
        className="absolute top-6 right-10 size-5 text-orange-500 transition-transform duration-700 group-hover:-translate-x-10 group-hover:translate-y-4"
        fill="currentColor"
        aria-hidden
      >
        <path d="M4 2l16 9-7 1.5L10 20z" />
      </svg>
    </div>
  );
}

export function SocialVisual() {
  return (
    <div className="relative mx-auto flex h-32 w-full max-w-[240px] items-center justify-center">
      <div className="border-line w-40 rounded-2xl border bg-white p-3 shadow-[var(--shadow-lift)]">
        <div className="flex items-center gap-2">
          <span className="bg-gradient-brand size-6 rounded-full" />
          <span className="h-2 w-16 rounded-full bg-slate-200" />
        </div>
        <div className="mt-2 h-14 rounded-lg bg-[linear-gradient(135deg,#FFF1E6,#e0e7ff)]" />
      </div>
      {["♥", "♥", "♥"].map((h, i) => (
        <span
          key={i}
          aria-hidden
          className="absolute bottom-4 text-orange-500 opacity-0 transition-all duration-1000 ease-out group-hover:-translate-y-16 group-hover:opacity-100"
          style={{
            right: `${18 + i * 14}%`,
            transitionDelay: `${i * 150}ms`,
            fontSize: `${14 + i * 4}px`,
          }}
        >
          {h}
        </span>
      ))}
    </div>
  );
}

export function ContentVisual() {
  return (
    <div className="mx-auto flex h-32 w-full max-w-[240px] flex-col justify-center gap-2">
      <div className="border-line flex items-center justify-between rounded-lg border bg-white px-3 py-2 text-[11px] shadow-[var(--shadow-soft)] transition-transform duration-500 group-hover:translate-x-1">
        <span className="text-navy-950 font-semibold">Editorial Strategy</span>
        <span className="rounded bg-orange-100 px-1.5 py-0.5 text-[10px] font-bold text-orange-700">Q3 Active</span>
      </div>
      <div className="border-line flex items-center justify-between rounded-lg border bg-white px-3 py-2 text-[11px] shadow-[var(--shadow-soft)] transition-transform duration-500 group-hover:translate-x-2">
        <span className="text-navy-950 font-semibold">Organic Distribution</span>
        <span className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">+42% Reach</span>
      </div>
      <div className="border-line flex items-center justify-between rounded-lg border bg-white px-3 py-2 text-[11px] shadow-[var(--shadow-soft)] transition-transform duration-500 group-hover:translate-x-1">
        <span className="text-navy-950 font-semibold">Brand Narrative</span>
        <span className="text-muted-ink text-[10px]">Documented</span>
      </div>
    </div>
  );
}


