import { ArrowUpRight, Bot, Search, Sparkles, TrendingUp } from "lucide-react";

/**
 * Hero product mockup — a Wessmaa "Growth OS" dashboard rendered in HTML/SVG
 * (crisp at any DPI, no image weight).
 */
export function HeroDashboard() {
  return (
    <div className="border-line relative overflow-hidden rounded-[20px] border bg-white text-left shadow-[var(--shadow-float)]">
      {/* window chrome */}
      <div className="border-line bg-surface-alt flex h-10 items-center gap-2 border-b px-4">
        <span className="size-2.5 rounded-full bg-[#FF5F57]" />
        <span className="size-2.5 rounded-full bg-[#FEBC2E]" />
        <span className="size-2.5 rounded-full bg-[#28C840]" />
        <div className="border-line text-muted-ink mx-auto hidden h-6 w-72 items-center justify-center rounded-md border bg-white text-[11px] sm:flex">
          app.wessmaa.com/growth
        </div>
      </div>
      <div className="grid grid-cols-12">
        {/* sidebar */}
        <aside className="border-line bg-surface-alt/60 col-span-3 hidden border-r p-4 md:block">
          <div className="bg-navy-950/80 mb-5 h-2.5 w-20 rounded-full" />
          {["Overview", "Website", "SEO", "Social", "Ads", "Automations"].map((l, i) => (
            <div
              key={l}
              className={`mb-1 flex items-center gap-2 rounded-lg px-2.5 py-2 text-[11px] font-medium ${i === 0 ? "text-navy-950 bg-white shadow-[var(--shadow-soft)]" : "text-muted-ink"}`}
            >
              <span className={`size-1.5 rounded-full ${i === 0 ? "bg-orange-500" : "bg-line"}`} />
              {l}
            </div>
          ))}
        </aside>
        {/* main */}
        <div className="col-span-12 p-4 sm:p-5 md:col-span-9">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-ink text-[11px]">Growth overview · Last 90 days</p>
              <p className="font-display text-navy-950 text-base font-bold tracking-tight sm:text-lg">
                Revenue pipeline
              </p>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-semibold text-emerald-700">
              <TrendingUp className="size-3" /> +38.4%
            </span>
          </div>
          {/* KPIs */}
          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { k: "Organic traffic", v: "182K", d: "+64%" },
              { k: "Qualified leads", v: "2,941", d: "+41%" },
              { k: "Blended ROAS", v: "4.2×", d: "+0.8" },
            ].map((m) => (
              <div key={m.k} className="border-line rounded-xl border bg-white p-2.5 sm:p-3">
                <p className="text-muted-ink truncate text-[10px] sm:text-[11px]">{m.k}</p>
                <p className="font-display text-navy-950 mt-1 text-sm font-bold tracking-tight sm:text-xl">
                  {m.v}
                </p>
                <p className="text-[10px] font-semibold text-emerald-600">{m.d}</p>
              </div>
            ))}
          </div>
          {/* chart */}
          <div className="border-line mt-3 rounded-xl border bg-white p-3">
            <svg
              viewBox="0 0 400 120"
              className="h-24 w-full sm:h-32"
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
                <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#eef2f7" strokeWidth="1" />
              ))}
              <path
                d="M0,98 C30,92 50,95 80,84 C110,73 130,80 160,66 C190,52 210,60 240,46 C270,32 300,40 330,24 C355,12 380,16 400,8 L400,120 L0,120 Z"
                fill="url(#hero-area)"
              />
              <path
                d="M0,98 C30,92 50,95 80,84 C110,73 130,80 160,66 C190,52 210,60 240,46 C270,32 300,40 330,24 C355,12 380,16 400,8"
                fill="none"
                stroke="url(#hero-line)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <path
                d="M0,104 C40,102 70,100 100,98 C140,95 170,94 200,90 C240,86 270,84 300,80 C340,76 370,74 400,70"
                fill="none"
                stroke="#cbd5e1"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              <circle cx="330" cy="24" r="4.5" fill="#fff" stroke="#f97316" strokeWidth="2.5" />
            </svg>
          </div>
          {/* rows */}
          <div className="mt-3 hidden gap-2 sm:grid">
            {[
              {
                icon: Search,
                t: "SEO · 'custom software company'",
                s: "Rank #2",
                c: "text-navy-800 bg-navy-800/[0.06]",
              },
              {
                icon: Sparkles,
                t: "Meta Ads · Creative test #48",
                s: "ROAS 5.1×",
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
        “Booked a discovery call for Thursday 3pm with Northwind.”
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
