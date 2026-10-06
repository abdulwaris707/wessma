"use client";

import { useState } from "react";
import { ArrowUpRight, BarChart3, Bot, Search, Sparkles, TrendingUp } from "lucide-react";



type TimeRange = "7D" | "30D" | "3M" | "12M";

interface MetricData {
  traffic: string;
  trafficTrend: string;
  leads: string;
  leadsTrend: string;
  conversion: string;
  conversionTrend: string;
  pipeline: string;
  pipelineTrend: string;
  chartPath: string;
  chartArea: string;
  peakPoint: { cx: number; cy: number };
}

const analyticsData: Record<TimeRange, MetricData> = {
  "7D": {
    traffic: "284K",
    trafficTrend: "+12.1% vs last week",
    leads: "1,420",
    leadsTrend: "+9.4%",
    conversion: "4.1%",
    conversionTrend: "+0.3%",
    pipeline: "$184K",
    pipelineTrend: "+14.2%",
    chartPath: "M0,90 C40,82 80,88 120,68 C160,55 200,62 240,48 C280,35 320,42 360,28 C380,20 395,24 400,18",
    chartArea: "M0,90 C40,82 80,88 120,68 C160,55 200,62 240,48 C280,35 320,42 360,28 C380,20 395,24 400,18 L400,120 L0,120 Z",
    peakPoint: { cx: 360, cy: 28 },
  },
  "30D": {
    traffic: "642K",
    trafficTrend: "+15.8% vs last month",
    leads: "3,890",
    leadsTrend: "+21.2%",
    conversion: "4.3%",
    conversionTrend: "+0.5%",
    pipeline: "$412K",
    pipelineTrend: "+24.8%",
    chartPath: "M0,95 C35,88 70,80 110,65 C150,50 190,56 230,42 C270,30 310,36 345,22 C375,12 390,16 400,10",
    chartArea: "M0,95 C35,88 70,80 110,65 C150,50 190,56 230,42 C270,30 310,36 345,22 C375,12 390,16 400,10 L400,120 L0,120 Z",
    peakPoint: { cx: 345, cy: 22 },
  },
  "3M": {
    traffic: "1.28M",
    trafficTrend: "+18.4% this quarter",
    leads: "8,940",
    leadsTrend: "+32.6%",
    conversion: "4.6%",
    conversionTrend: "+0.8%",
    pipeline: "$890K",
    pipelineTrend: "+38.4%",
    chartPath: "M0,98 C30,92 50,95 80,84 C110,73 130,80 160,66 C190,52 210,60 240,46 C270,32 300,40 330,24 C355,12 380,16 400,8",
    chartArea: "M0,98 C30,92 50,95 80,84 C110,73 130,80 160,66 C190,52 210,60 240,46 C270,32 300,40 330,24 C355,12 380,16 400,8 L400,120 L0,120 Z",
    peakPoint: { cx: 330, cy: 24 },
  },
  "12M": {
    traffic: "4.85M",
    trafficTrend: "+68.2% YoY",
    leads: "34.2K",
    leadsTrend: "+54.0%",
    conversion: "4.9%",
    conversionTrend: "+1.2%",
    pipeline: "$3.4M",
    pipelineTrend: "+72.5%",
    chartPath: "M0,102 C40,96 70,88 110,74 C150,60 180,64 220,44 C260,28 300,32 340,16 C370,8 390,12 400,6",
    chartArea: "M0,102 C40,96 70,88 110,74 C150,60 180,64 220,44 C260,28 300,32 340,16 C370,8 390,12 400,6 L400,120 L0,120 Z",
    peakPoint: { cx: 340, cy: 16 },
  },
};

/**
 * Hero product mockup — interactive analytics card showing realistic multi-channel growth.
 * Labeled transparently as an illustrative growth snapshot.
 */
export function HeroDashboard() {
  const [range, setRange] = useState<TimeRange>("3M");
  const [activeTab, setActiveTab] = useState<"traffic" | "leads" | "conversion" | "pipeline">("traffic");

  const current = analyticsData[range];

  return (
    <div className="border-line relative overflow-hidden rounded-[24px] border bg-white text-left shadow-[var(--shadow-float)]">
      {/* window chrome */}
      <div className="border-line bg-surface-alt flex flex-wrap items-center justify-between gap-2 border-b px-4 py-2.5 sm:h-11">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-[#FF5F57]" />
          <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
          <span className="size-2.5 rounded-full bg-[#28C840]" />
          <span className="text-muted-ink ml-2 hidden text-[11px] font-medium sm:inline">
            Growth Snapshot · Illustrative Analytics
          </span>
        </div>
        <div className="flex items-center gap-1 rounded-lg bg-white p-0.5 border border-line">
          {(["7D", "30D", "3M", "12M"] as TimeRange[]).map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRange(r)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-all ${
                range === r
                  ? "bg-navy-950 text-white shadow-xs"
                  : "text-muted-ink hover:text-navy-950 hover:bg-surface-subtle"
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-12">
        {/* sidebar */}
        <aside className="border-line bg-surface-alt/60 col-span-3 hidden border-r p-4 md:block">
          <div className="bg-navy-950/80 mb-5 h-2.5 w-20 rounded-full" />
          {["Overview", "Web Experience", "SEO & Organic", "Paid Ads", "Social Channels", "Automations"].map((l, i) => (
            <div
              key={l}
              className={`mb-1 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-medium transition-colors ${
                i === 0 ? "text-navy-950 bg-white shadow-[var(--shadow-soft)] font-semibold" : "text-muted-ink"
              }`}
            >
              <span className={`size-1.5 rounded-full ${i === 0 ? "bg-orange-500" : "bg-line"}`} />
              {l}
            </div>
          ))}
          <div className="mt-8 rounded-xl border border-line/80 bg-white p-3 text-[10px] text-muted-ink leading-relaxed">
            <span className="font-semibold text-navy-950 block mb-0.5">Verified Setup</span>
            Multi-touch attribution connected with GA4, Meta CAPI & Looker.
          </div>
        </aside>

        {/* main */}
        <div className="col-span-12 p-4 sm:p-6 md:col-span-9">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-orange-50 text-orange-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Campaign Performance Example
                </span>
                <p className="text-muted-ink text-[11px]">Range: {range}</p>
              </div>
              <p className="font-display text-navy-950 mt-1 text-lg font-bold tracking-tight sm:text-xl">
                Revenue Pipeline & Acquisition
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
              <TrendingUp className="size-3.5" /> {current.pipelineTrend}
            </span>
          </div>

          {/* Interactive Metric Tabs / KPIs */}
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-2.5">
            <button
              type="button"
              onClick={() => setActiveTab("traffic")}
              className={`rounded-xl border p-2.5 sm:p-3 text-left transition-all ${
                activeTab === "traffic"
                  ? "border-orange-500/50 bg-orange-50/40 shadow-xs ring-1 ring-orange-500/30"
                  : "border-line bg-white hover:border-slate-300"
              }`}
            >
              <p className="text-muted-ink truncate text-[10px] sm:text-[11px]">Organic Traffic</p>
              <p className="font-display text-navy-950 mt-1 text-base font-bold tracking-tight sm:text-xl">
                {current.traffic}
              </p>
              <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">{current.trafficTrend}</p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("leads")}
              className={`rounded-xl border p-2.5 sm:p-3 text-left transition-all ${
                activeTab === "leads"
                  ? "border-orange-500/50 bg-orange-50/40 shadow-xs ring-1 ring-orange-500/30"
                  : "border-line bg-white hover:border-slate-300"
              }`}
            >
              <p className="text-muted-ink truncate text-[10px] sm:text-[11px]">Qualified Leads</p>
              <p className="font-display text-navy-950 mt-1 text-base font-bold tracking-tight sm:text-xl">
                {current.leads}
              </p>
              <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">{current.leadsTrend}</p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("conversion")}
              className={`rounded-xl border p-2.5 sm:p-3 text-left transition-all ${
                activeTab === "conversion"
                  ? "border-orange-500/50 bg-orange-50/40 shadow-xs ring-1 ring-orange-500/30"
                  : "border-line bg-white hover:border-slate-300"
              }`}
            >
              <p className="text-muted-ink truncate text-[10px] sm:text-[11px]">Conversion Rate</p>
              <p className="font-display text-navy-950 mt-1 text-base font-bold tracking-tight sm:text-xl">
                {current.conversion}
              </p>
              <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">{current.conversionTrend}</p>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("pipeline")}
              className={`rounded-xl border p-2.5 sm:p-3 text-left transition-all ${
                activeTab === "pipeline"
                  ? "border-orange-500/50 bg-orange-50/40 shadow-xs ring-1 ring-orange-500/30"
                  : "border-line bg-white hover:border-slate-300"
              }`}
            >
              <p className="text-muted-ink truncate text-[10px] sm:text-[11px]">Pipeline Value</p>
              <p className="font-display text-navy-950 mt-1 text-base font-bold tracking-tight sm:text-xl">
                {current.pipeline}
              </p>
              <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">{current.pipelineTrend}</p>
            </button>
          </div>

          {/* Interactive Chart */}
          <div className="border-line mt-3 rounded-xl border bg-white p-3.5">
            <div className="flex items-center justify-between text-[11px] text-muted-ink mb-2">
              <span className="flex items-center gap-1.5 font-medium">
                <BarChart3 className="size-3.5 text-orange-600" />
                {activeTab === "traffic" && "Organic Traffic Trend"}
                {activeTab === "leads" && "Lead Generation Velocity"}
                {activeTab === "conversion" && "Conversion Rate Optimization"}
                {activeTab === "pipeline" && "Revenue Pipeline Growth"}
              </span>
              <span>Baseline vs. Optimized</span>
            </div>

            <svg
              viewBox="0 0 400 120"
              className="h-24 w-full sm:h-32 transition-all duration-500"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="hero-area" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="hero-line" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
              </defs>
              {[30, 60, 90].map((y) => (
                <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#f1f5f9" strokeWidth="1" />
              ))}
              <path
                d={current.chartArea}
                fill="url(#hero-area)"
                className="transition-all duration-500 ease-out"
              />
              <path
                d={current.chartPath}
                fill="none"
                stroke="url(#hero-line)"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
              <path
                d="M0,104 C40,102 70,100 100,98 C140,95 170,94 200,90 C240,86 270,84 300,80 C340,76 370,74 400,70"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <circle
                cx={current.peakPoint.cx}
                cy={current.peakPoint.cy}
                r="4.5"
                fill="#fff"
                stroke="#f97316"
                strokeWidth="2.5"
                className="transition-all duration-500 ease-out"
              />
            </svg>
          </div>

          {/* rows */}
          <div className="mt-3 hidden gap-2 sm:grid">
            {[
              {
                icon: Search,
                t: "SEO Growth · Category Rank #1 Keyword Clusters",
                s: `${current.traffic} visits`,
                c: "text-navy-800 bg-navy-800/[0.06]",
              },
              {
                icon: Sparkles,
                t: "Performance Marketing · Creative Testing Suite",
                s: "ROAS 4.8×",
                c: "text-orange-700 bg-orange-50",
              },
            ].map((r) => (
              <div
                key={r.t}
                className="border-line flex items-center justify-between rounded-lg border px-3 py-2 text-[11px]"
              >
                <span className="text-body flex items-center gap-2">
                  <span className={`grid size-6 place-items-center rounded-md ${r.c}`}>
                    <r.icon className="size-3" />
                  </span>
                  {r.t}
                </span>
                <span className="text-navy-950 inline-flex items-center gap-1 font-semibold">
                  {r.s} <ArrowUpRight className="size-3 text-emerald-600" />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/** Small floating glass cards around the dashboard. */
export function FloatingAgentCard() {
  return (
    <div className="glass w-56 rounded-2xl border border-white/80 p-3.5 shadow-[var(--shadow-float)]">
      <div className="flex items-center gap-2.5">
        <span className="bg-navy-950 grid size-8 place-items-center rounded-lg text-white">
          <Bot className="size-4" />
        </span>
        <div>
          <p className="text-navy-950 text-xs font-semibold">AI Sales Agent</p>
          <p className="text-muted-ink text-[11px]">Replied in 11 seconds</p>
        </div>
      </div>
      <div className="bg-surface-alt text-body mt-3 rounded-lg p-2 text-[11px] leading-snug">
        “New discovery request from Northwind.”
      </div>
    </div>
  );
}

export function FloatingMetricCard() {
  return (
    <div className="glass w-48 rounded-2xl border border-white/80 p-3.5 shadow-[var(--shadow-float)]">
      <p className="text-muted-ink text-[11px] font-medium">Lighthouse score</p>
      <div className="mt-2 flex items-end gap-2">
        <p className="font-display text-navy-950 text-3xl leading-none font-bold tracking-tight">
          98
        </p>
        <p className="pb-0.5 text-[11px] font-semibold text-emerald-600">Performance</p>
      </div>
      <div className="mt-3 flex gap-1">
        {[98, 100, 100, 100].map((v, i) => (
          <span
            key={i}
            className="bg-gradient-brand h-1.5 flex-1 rounded-full"
            style={{ opacity: v / 100 }}
          />
        ))}
      </div>
    </div>
  );
}
