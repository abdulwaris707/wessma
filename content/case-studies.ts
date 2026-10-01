/**
 * Case studies. Drives the home showcase, /work and /work/[slug].
 * Client names are illustrative sample content — replace with real projects.
 */

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  summary: string;
  industry: "Fintech" | "Healthcare" | "E-commerce" | "EdTech" | "Logistics" | "Real Estate";
  services: string[];
  image: string;
  year: string;
  duration: string;
  location: string;
  headline: { value: string; label: string };
  results: { value: number; prefix?: string; suffix?: string; decimals?: number; label: string }[];
  challenge: string;
  challengePoints: string[];
  solution: string;
  solutionPoints: string[];
  process: { title: string; text: string }[];
  tech: string[];
  testimonial: { quote: string; name: string; role: string; avatar: string };
  accent: "blue" | "orange";
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "northwind-pay",
    client: "Northwind Pay",
    title: "A B2B payments platform rebuilt to process $400M a year.",
    summary:
      "We rebuilt Northwind's legacy invoicing tool into a multi-tenant payments SaaS with real-time ledgers and automated reconciliation.",
    industry: "Fintech",
    services: ["Custom Software & SaaS", "UI/UX Design", "AI & Automation"],
    image: "/images/work/northwind.webp",
    year: "2025",
    duration: "16 weeks",
    location: "Dubai, UAE",
    headline: { value: "+240%", label: "increase in monthly processed volume" },
    results: [
      { value: 240, prefix: "+", suffix: "%", label: "Processed volume" },
      { value: 68, prefix: "-", suffix: "%", label: "Reconciliation time" },
      { value: 99.99, suffix: "%", decimals: 2, label: "Platform uptime" },
    ],
    challenge:
      "Northwind's invoicing product had grown on a decade-old PHP monolith. Month-end reconciliation took finance teams four days, onboarding a new enterprise customer required engineering time, and the platform went down during peak billing runs.",
    challengePoints: [
      "Four-day manual reconciliation every month",
      "Single-tenant deployments for every enterprise client",
      "No audit trail for compliance reviews",
    ],
    solution:
      "We designed a multi-tenant architecture on Next.js, Node.js and PostgreSQL with an event-sourced ledger, then added an AI matching engine that reconciles bank statements to invoices automatically.",
    solutionPoints: [
      "Event-sourced double-entry ledger",
      "AI-assisted bank reconciliation with human review",
      "Self-serve onboarding with SSO and RBAC",
    ],
    process: [
      {
        title: "Audit & architecture",
        text: "A two-week technical audit mapped every data flow and defined a strangler-pattern migration plan.",
      },
      {
        title: "Design system",
        text: "We built a dense, accessible dashboard design system tuned for finance teams who live in tables.",
      },
      {
        title: "Incremental migration",
        text: "Modules were migrated one at a time behind feature flags, with zero downtime for existing customers.",
      },
      {
        title: "AI reconciliation",
        text: "A matching model trained on historical data now reconciles 91% of transactions without human input.",
      },
    ],
    tech: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "AWS", "Python"],
    testimonial: {
      quote:
        "Wessmaa rebuilt the core of our business without a single hour of downtime. Month-end close went from four days to a morning.",
      name: "Sara Malik",
      role: "COO, Northwind Pay",
      avatar: "/images/team/team-2.webp",
    },
    accent: "blue",
  },
  {
    slug: "medora-health",
    client: "Medora Health",
    title: "A telehealth app that made specialist care a tap away.",
    summary:
      "iOS and Android apps plus a clinician dashboard for video consultations, prescriptions and follow-ups across three countries.",
    industry: "Healthcare",
    services: ["Mobile App Development", "UI/UX Design", "Cloud & DevOps"],
    image: "/images/work/medora.webp",
    year: "2025",
    duration: "14 weeks",
    location: "London, UK",
    headline: { value: "4.8★", label: "average rating across both app stores" },
    results: [
      { value: 180, suffix: "K", label: "Patients onboarded" },
      { value: 4.8, decimals: 1, suffix: "★", label: "App store rating" },
      { value: 42, prefix: "-", suffix: "%", label: "No-show appointments" },
    ],
    challenge:
      "Medora was booking consultations over WhatsApp and phone calls. Patients waited days for appointments, clinicians juggled three tools, and nothing met the compliance bar required to expand into the UK.",
    challengePoints: [
      "Manual booking across phone and chat",
      "No compliant video or records storage",
      "High no-show rate with no reminders",
    ],
    solution:
      "A Flutter app for patients and a web dashboard for clinicians, backed by HIPAA- and GDPR-aligned infrastructure, encrypted video, e-prescriptions and automated reminders.",
    solutionPoints: [
      "Encrypted video consultations",
      "Smart scheduling with automated reminders",
      "E-prescriptions and secure medical records",
    ],
    process: [
      {
        title: "Patient research",
        text: "We interviewed 40 patients and 12 clinicians to design around real anxieties and workflows.",
      },
      {
        title: "Compliance-first architecture",
        text: "Data residency, encryption and audit logging were designed before the first screen.",
      },
      {
        title: "Cross-platform build",
        text: "One Flutter codebase shipped to iOS and Android with native video modules.",
      },
      {
        title: "Launch & growth",
        text: "A soft launch with 500 patients refined onboarding before a nationwide rollout.",
      },
    ],
    tech: ["Flutter", "Node.js", "PostgreSQL", "AWS", "Firebase"],
    testimonial: {
      quote:
        "They understood that in healthcare, trust is the product. The app feels calm, and our clinicians finally have one tool instead of three.",
      name: "Dr. James Whitfield",
      role: "Founder, Medora Health",
      avatar: "/images/team/team-3.webp",
    },
    accent: "orange",
  },
  {
    slug: "luma-commerce",
    client: "Luma Living",
    title: "Headless commerce and paid social that tripled online revenue.",
    summary:
      "A headless Shopify storefront, a weekly creative engine and a full-funnel ads strategy for a premium home-goods brand.",
    industry: "E-commerce",
    services: [
      "Website Development",
      "Paid Ads",
      "Video & Content Editing",
      "Social Media Management",
    ],
    image: "/images/work/luma.webp",
    year: "2024",
    duration: "10 weeks + ongoing",
    location: "Lahore, Pakistan",
    headline: { value: "3.1×", label: "online revenue within 9 months" },
    results: [
      { value: 3.1, decimals: 1, suffix: "×", label: "Online revenue" },
      { value: 4.2, decimals: 1, suffix: "×", label: "Blended ROAS" },
      { value: 0.9, decimals: 1, suffix: "s", label: "Largest contentful paint" },
    ],
    challenge:
      "Luma's Shopify theme took six seconds to load on mobile, ads were running on the same three product photos, and the brand had no consistent presence on social.",
    challengePoints: [
      "6s mobile load time",
      "Creative fatigue on paid social",
      "No content engine",
    ],
    solution:
      "We rebuilt the storefront on Next.js with Shopify's Storefront API and launched an in-house creative engine producing 20 new ad concepts every month across Meta, TikTok and Google Shopping.",
    solutionPoints: [
      "Headless storefront with sub-second loads",
      "Weekly creative testing across Meta and TikTok",
      "Always-on social content calendar",
    ],
    process: [
      {
        title: "Commerce audit",
        text: "We analysed 90 days of funnel data to find where mobile shoppers dropped off.",
      },
      {
        title: "Headless rebuild",
        text: "A Next.js storefront shipped with instant search, quick-add and one-page checkout.",
      },
      {
        title: "Creative engine",
        text: "Our editing team produced UGC-style reels, carousels and product films every week.",
      },
      {
        title: "Scale",
        text: "Budget moved to winning concepts weekly, scaling spend 5× while holding ROAS.",
      },
    ],
    tech: ["Next.js", "Shopify", "Meta", "Google Ads", "TikTok"],
    testimonial: {
      quote:
        "One team rebuilt our store, shot our content and ran our ads. Revenue tripled and I got my weekends back.",
      name: "Ayesha Rahman",
      role: "Founder, Luma Living",
      avatar: "/images/team/team-4.webp",
    },
    accent: "orange",
  },
  {
    slug: "brightpath-academy",
    client: "BrightPath Academy",
    title: "A cohort-based learning platform with 78% course completion.",
    summary:
      "A modern LMS with live classes, assessments and gamified progress — plus SEO that made it the category leader.",
    industry: "EdTech",
    services: ["Custom Software & SaaS", "SEO", "Maintenance & Support"],
    image: "/images/work/brightpath.webp",
    year: "2024",
    duration: "12 weeks",
    location: "Toronto, Canada",
    headline: { value: "78%", label: "average course completion rate" },
    results: [
      { value: 78, suffix: "%", label: "Course completion" },
      { value: 5.6, decimals: 1, suffix: "×", label: "Organic traffic" },
      { value: 52, suffix: "K", label: "Active learners" },
    ],
    challenge:
      "BrightPath ran courses on a patchwork of Zoom, Google Forms and a generic LMS. Only 19% of learners finished a course and organic search brought almost no new students.",
    challengePoints: [
      "19% course completion",
      "Disconnected tools for classes and assessments",
      "No organic acquisition",
    ],
    solution:
      "A unified learning platform with cohorts, live classes, quizzes, certificates and streaks — plus an SEO content engine targeting high-intent course searches.",
    solutionPoints: [
      "Cohorts, live classes and certificates",
      "Gamified streaks and progress",
      "Programmatic SEO for 400+ course pages",
    ],
    process: [
      {
        title: "Learner journey mapping",
        text: "We mapped every point where learners dropped out and designed a nudge for each.",
      },
      {
        title: "Platform build",
        text: "A Next.js and Laravel platform with live video, assessments and certificates.",
      },
      {
        title: "SEO engine",
        text: "Programmatic pages and expert content grew organic traffic 5.6× in a year.",
      },
      {
        title: "Ongoing support",
        text: "A monthly retainer ships new features and keeps the platform fast and secure.",
      },
    ],
    tech: ["Next.js", "Laravel", "PostgreSQL", "Vercel", "Google Analytics"],
    testimonial: {
      quote:
        "Completion rates went from embarrassing to industry-leading. Wessmaa thinks about learners, not just features.",
      name: "Michael Chen",
      role: "CEO, BrightPath Academy",
      avatar: "/images/team/team-5.webp",
    },
    accent: "blue",
  },
  {
    slug: "freightly",
    client: "Freightly",
    title: "A logistics control tower with AI-powered dispatch.",
    summary:
      "Real-time fleet tracking, route optimisation and AI dispatch automation for a regional freight operator.",
    industry: "Logistics",
    services: ["Custom Software & SaaS", "AI & Automation", "Cloud & DevOps"],
    image: "/images/work/freightly.webp",
    year: "2025",
    duration: "18 weeks",
    location: "Karachi, Pakistan",
    headline: { value: "-31%", label: "cost per delivery" },
    results: [
      { value: 31, prefix: "-", suffix: "%", label: "Cost per delivery" },
      { value: 22, suffix: "h", label: "Saved per dispatcher / week" },
      { value: 1200, suffix: "+", label: "Vehicles tracked live" },
    ],
    challenge:
      "Dispatchers were assigning 3,000 daily deliveries using spreadsheets and phone calls. There was no live view of the fleet and customers had no delivery ETAs.",
    challengePoints: [
      "Manual dispatch over spreadsheets",
      "No live fleet visibility",
      "No customer delivery tracking",
    ],
    solution:
      "A control-tower web app with live GPS, a driver app, route optimisation and an AI dispatch agent that proposes assignments for human approval.",
    solutionPoints: [
      "Live map of 1,200+ vehicles",
      "AI dispatch recommendations",
      "Customer tracking links via WhatsApp",
    ],
    process: [
      {
        title: "Ops shadowing",
        text: "We spent a week in the dispatch room to understand the real workflow.",
      },
      { title: "Driver app", text: "An offline-first Flutter driver app with proof of delivery." },
      { title: "Control tower", text: "A real-time dashboard streaming GPS data over WebSockets." },
      {
        title: "AI dispatch",
        text: "An optimisation agent that cut planning time from hours to minutes.",
      },
    ],
    tech: ["React", "Python", "Flutter", "PostgreSQL", "Kubernetes", "Google Cloud"],
    testimonial: {
      quote:
        "We went from spreadsheets to a live control tower in four months. The AI dispatch alone paid for the project.",
      name: "Omar Siddiqui",
      role: "Head of Operations, Freightly",
      avatar: "/images/team/team-1.webp",
    },
    accent: "blue",
  },
  {
    slug: "havenly-estates",
    client: "Havenly Estates",
    title: "A property portal and lead engine for a fast-growing agency.",
    summary:
      "A listings portal with map search, automated lead routing and SEO plus Google Ads that filled the pipeline.",
    industry: "Real Estate",
    services: ["Website Development", "SEO", "Paid Ads", "AI & Automation"],
    image: "/images/work/havenly.webp",
    year: "2025",
    duration: "8 weeks + ongoing",
    location: "Riyadh, Saudi Arabia",
    headline: { value: "2.6×", label: "qualified leads per listing" },
    results: [
      { value: 2.6, decimals: 1, suffix: "×", label: "Qualified leads" },
      { value: 4, suffix: " min", label: "Average lead response" },
      { value: 190, prefix: "+", suffix: "%", label: "Organic traffic" },
    ],
    challenge:
      "Havenly listed properties on third-party portals and paid per lead. Leads arrived by email and waited hours for a reply, by which time buyers had moved on.",
    challengePoints: [
      "Dependence on paid third-party portals",
      "Hours-long lead response time",
      "No owned organic traffic",
    ],
    solution:
      "An owned listings portal with map search, instant WhatsApp lead qualification and routing to the right agent, plus SEO and Google Ads to drive owned demand.",
    solutionPoints: [
      "Map-first listings search",
      "AI lead qualification on WhatsApp",
      "Local SEO for 60+ neighbourhoods",
    ],
    process: [
      {
        title: "Buyer research",
        text: "Interviews with recent buyers shaped search filters and listing layouts.",
      },
      {
        title: "Portal build",
        text: "A Next.js portal synced to the agency CRM with map search and saved alerts.",
      },
      {
        title: "Lead automation",
        text: "An AI assistant qualifies leads and books viewings in under four minutes.",
      },
      {
        title: "Demand generation",
        text: "Neighbourhood SEO pages and Google Ads built an owned pipeline.",
      },
    ],
    tech: ["Next.js", "Node.js", "HubSpot", "Google Ads", "n8n"],
    testimonial: {
      quote:
        "Our agents now spend their day on viewings instead of chasing emails. Leads have more than doubled.",
      name: "Layla Haddad",
      role: "Managing Director, Havenly Estates",
      avatar: "/images/team/team-6.webp",
    },
    accent: "orange",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
export const caseStudyIndustries = [
  "All",
  ...Array.from(new Set(caseStudies.map((c) => c.industry))),
];
export const caseStudyServices = [
  "All",
  ...Array.from(new Set(caseStudies.flatMap((c) => c.services))),
];
