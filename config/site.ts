/**
 * Wessmaa — central site configuration.
 * All global copy, navigation and links live here. Page-level content
 * (services, case studies, blog, team …) lives in /content.
 *
 * WESSMAA = Website · Editing · Social · SEO · Marketing · Automation · Ads
 */

export const siteConfig = {
  name: "Wessmaa",
  legalName: "Wessmaa Technologies",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://wessmaa.com",
  tagline: "We engineer software that moves businesses forward.",
  description:
    "Wessmaa is a software and growth studio. We design and build websites, SaaS products, mobile apps and AI automations — then grow them with SEO, social, content and paid ads.",
  keywords: [
    "software development company",
    "web development agency",
    "SaaS development",
    "mobile app development",
    "UI/UX design",
    "SEO agency",
    "social media marketing",
    "AI automation",
    "paid ads agency",
  ],
  ogImage: "/og.png",
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL ?? "https://cal.com/wessmaa/discovery-call",
  contact: {
    email: "hello@wessmaa.com",
    careersEmail: "careers@wessmaa.com",
    phone: "+92 300 000 0000",
    phoneHref: "tel:+923000000000",
    whatsapp: "https://wa.me/923000000000",
    address: {
      street: "Mansehra Road",
      city: "Abbottabad",
      region: "Khyber Pakhtunkhwa",
      country: "Pakistan",
      postalCode: "22010",
    },
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=73.18%2C34.13%2C73.25%2C34.19&layer=mapnik&marker=34.1688%2C73.2215",
    hours: "Mon – Fri, 9:00 – 18:00 PKT",
    responseTime: "We reply to every enquiry within 1 business day.",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/wessmaa", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/wessmaa", icon: "instagram" },
    { label: "X (Twitter)", href: "https://x.com/wessmaa", icon: "x" },
    { label: "Dribbble", href: "https://dribbble.com/wessmaa", icon: "dribbble" },
    { label: "GitHub", href: "https://github.com/wessmaa", icon: "github" },
  ],
  rating: { score: "4.9", source: "Clutch", reviews: 86 },
} as const;

export type SiteConfig = typeof siteConfig;

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const announcement = {
  id: "ai-automation-2026",
  label: "New",
  text: "AI Automation Services — ship agents and workflows in 30 days",
  href: "/services/ai-automation",
};

export const mainNav = [
  { label: "Services", href: "/services", mega: true },
  { label: "Solutions", href: "/solutions" },
  { label: "Work", href: "/work" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

export const megaMenuFeature = {
  eyebrow: "Featured",
  title: "The WESSMAA growth stack",
  text: "Website, Editing, Social, SEO, Marketing, Automation and Ads — one team, one roadmap, one number to move.",
  href: "/solutions",
  cta: "Explore solutions",
};

export const ctas = {
  primary: { label: "Start Your Project", href: "/quote" },
  secondary: { label: "View Our Work", href: "/work" },
  book: { label: "Book a Call", href: "/book" },
  quote: { label: "Get a Quote", href: "/quote" },
};

/* ------------------------------------------------------------------ */
/* Home page copy                                                      */
/* ------------------------------------------------------------------ */

export const hero = {
  badge: "Software + growth, under one roof",
  titleStart: "We build",
  rotatingWords: ["SaaS platforms", "web apps", "mobile apps", "AI tools", "growth engines"],
  titleEnd: "that",
  titleAccent: "actually",
  titleLast: "scale.",
  subtitle:
    "Wessmaa is the product and growth studio for ambitious teams. We design, engineer and launch software — then grow it with SEO, content, social and performance ads.",
  trust: "Trusted by 120+ companies",
};

export const stats = [
  {
    value: 340,
    suffix: "+",
    label: "Projects delivered",
    detail: "Across web, mobile, SaaS and growth",
  },
  { value: 120, suffix: "+", label: "Happy clients", detail: "From seed-stage to enterprise" },
  { value: 18, suffix: "", label: "Countries", detail: "Serving four continents" },
  { value: 8, suffix: "+", label: "Years of experience", detail: "Shipping since 2018" },
];

/** The brand acronym — used in the signature "What WESSMAA means" section. */
export const acronym = [
  {
    letter: "W",
    word: "Website",
    text: "Conversion-first websites and web apps engineered on modern stacks.",
    href: "/services/website-development",
  },
  {
    letter: "E",
    word: "Editing",
    text: "Video, motion and content editing that makes your brand impossible to scroll past.",
    href: "/services/content-editing",
  },
  {
    letter: "S",
    word: "Social",
    text: "Always-on social strategy, content calendars and community management.",
    href: "/services/social-media",
  },
  {
    letter: "S",
    word: "SEO",
    text: "Technical SEO, content and authority building that compounds every month.",
    href: "/services/seo",
  },
  {
    letter: "M",
    word: "Marketing",
    text: "Full-funnel strategy, analytics and CRO tied to revenue — not vanity metrics.",
    href: "/services/digital-marketing",
  },
  {
    letter: "A",
    word: "Automation",
    text: "AI agents, integrations and workflows that give your team hours back.",
    href: "/services/ai-automation",
  },
  {
    letter: "A",
    word: "Ads",
    text: "Performance campaigns across Google, Meta, LinkedIn and TikTok.",
    href: "/services/paid-ads",
  },
];

export const whyWessmaa = {
  eyebrow: "Why Wessmaa",
  title: "A senior team that owns outcomes, not just tickets.",
  subtitle:
    "Most agencies hand you a deliverable. We hand you a working business asset — and stay accountable for how it performs after launch.",
  benefits: [
    {
      title: "Senior-only squads",
      text: "Every project is led by engineers and designers with 6+ years of experience. No bait-and-switch.",
    },
    {
      title: "Build and growth in one team",
      text: "The people who build your product also rank it, market it and automate it.",
    },
    {
      title: "Weekly demos, zero surprises",
      text: "You see working software every Friday, with a live roadmap and transparent budget burn.",
    },
    {
      title: "Fixed timelines you can plan around",
      text: "92% of our projects ship on or before the agreed date since 2021.",
    },
    {
      title: "You own everything",
      text: "Code, designs, accounts and data are yours from day one. No lock-in, ever.",
    },
  ],
  quote: {
    text: "They felt like an in-house team from week one.",
    author: "Sara Malik, COO at Northwind Pay",
  },
};

export const processSteps = [
  {
    step: "01",
    title: "Discover",
    duration: "Week 1",
    text: "Workshops, stakeholder interviews and a technical audit. We define success metrics, scope and risks before a line of code is written.",
    outputs: ["Product brief", "Success metrics", "Technical audit"],
  },
  {
    step: "02",
    title: "Design",
    duration: "Weeks 2–3",
    text: "Information architecture, wireframes and a high-fidelity design system, validated with real users through clickable prototypes.",
    outputs: ["UX flows", "Design system", "Clickable prototype"],
  },
  {
    step: "03",
    title: "Develop",
    duration: "Weeks 3–10",
    text: "Two-week sprints with weekly demos. Typed, tested, reviewed code deployed to a staging environment you can use every day.",
    outputs: ["Sprint demos", "Staging environment", "Code reviews"],
  },
  {
    step: "04",
    title: "Test",
    duration: "Continuous",
    text: "Automated test suites, manual QA across devices, accessibility audits and load testing before anything reaches production.",
    outputs: ["Automated tests", "QA reports", "Performance budget"],
  },
  {
    step: "05",
    title: "Launch",
    duration: "Launch week",
    text: "Zero-downtime deployment, analytics, SEO foundations and a launch campaign — so day one has real traffic, not crickets.",
    outputs: ["Production release", "Analytics", "Launch campaign"],
  },
  {
    step: "06",
    title: "Scale",
    duration: "Ongoing",
    text: "Growth sprints across SEO, ads, social and automation, plus SLAs for maintenance, monitoring and new features.",
    outputs: ["Growth roadmap", "SLA support", "Monthly reporting"],
  },
];

export const techStack = {
  eyebrow: "Technology",
  title: "Modern, proven technology — chosen for your roadmap.",
  subtitle:
    "We are stack-pragmatic. We pick what makes your product fast, maintainable and easy to hire for, then wire it into the tools your team already uses.",
  groups: [
    { label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
    { label: "Backend", items: ["Node.js", "Python", "Laravel", "PostgreSQL", "MongoDB"] },
    { label: "Mobile", items: ["Flutter", "React Native", "Swift", "Kotlin"] },
    { label: "Cloud & DevOps", items: ["AWS", "Google Cloud", "Vercel", "Docker", "Kubernetes"] },
    { label: "Growth & Automation", items: ["Google Ads", "Meta Ads", "HubSpot", "n8n", "Zapier"] },
  ],
};

export const industries = [
  {
    id: "fintech",
    label: "Fintech",
    icon: "landmark",
    title: "Secure, compliant financial products that users trust.",
    text: "Payments, lending, wealth and banking platforms built with bank-grade security, audit trails and PCI-aware architecture.",
    points: [
      "KYC / AML onboarding flows",
      "Real-time ledgers and dashboards",
      "PCI-DSS aware infrastructure",
    ],
    metric: { value: "$1.2B+", label: "processed through platforms we built" },
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: "heart-pulse",
    title: "Patient-first digital health, built for compliance.",
    text: "Telehealth, patient portals and clinical tools designed around HIPAA and GDPR requirements from the first sprint.",
    points: ["HIPAA-ready architecture", "Telehealth and scheduling", "EHR / FHIR integrations"],
    metric: { value: "600K+", label: "patient sessions supported" },
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: "shopping-bag",
    title: "Storefronts that load fast and sell harder.",
    text: "Headless commerce, Shopify builds, subscription models and the performance marketing engine that feeds them.",
    points: ["Headless Shopify and Next.js", "CRO and A/B testing", "Meta and Google shopping ads"],
    metric: { value: "3.4×", label: "average ROAS across retail clients" },
  },
  {
    id: "edtech",
    label: "EdTech",
    icon: "graduation-cap",
    title: "Learning experiences that students finish.",
    text: "LMS platforms, cohort-based courses and assessment tools with engagement loops that keep learners coming back.",
    points: [
      "Course and cohort platforms",
      "Live classes and assessments",
      "Gamified progress tracking",
    ],
    metric: { value: "78%", label: "average course completion rate" },
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: "truck",
    title: "Operational software that moves real things.",
    text: "Fleet tracking, dispatch, warehouse and last-mile tools that replace spreadsheets with real-time visibility.",
    points: ["Live GPS tracking", "Route optimisation", "Driver and warehouse apps"],
    metric: { value: "31%", label: "average reduction in delivery cost" },
  },
  {
    id: "real-estate",
    label: "Real Estate",
    icon: "building-2",
    title: "Property platforms that turn browsers into buyers.",
    text: "Listing portals, CRM automations and virtual tour experiences for agencies, developers and proptech startups.",
    points: ["Listings and map search", "Lead routing automations", "Virtual tours and 3D media"],
    metric: { value: "2.6×", label: "more qualified leads per listing" },
  },
];

export const engagementModels = [
  {
    name: "Fixed Price",
    icon: "target",
    bestFor: "Well-defined scopes and MVPs",
    text: "A clear scope, a fixed budget and a fixed timeline. Ideal for MVPs, websites and campaign launches.",
    points: ["Detailed scope and milestones", "Budget certainty", "Milestone-based payments"],
    from: "From $4,900",
  },
  {
    name: "Dedicated Team",
    icon: "users",
    bestFor: "Scaling products and long-term roadmaps",
    text: "A cross-functional squad that works as an extension of your company, managed by a Wessmaa delivery lead.",
    points: [
      "Engineers, designers and marketers",
      "Monthly rolling contract",
      "Scale up or down with 2 weeks notice",
    ],
    from: "From $7,500 / month",
    featured: true,
  },
  {
    name: "Time & Material",
    icon: "clock",
    bestFor: "Evolving scopes and R&D",
    text: "Maximum flexibility for products where requirements evolve. Pay for the hours used, tracked transparently.",
    points: ["Weekly timesheets", "Re-prioritise any sprint", "No minimum commitment"],
    from: "From $38 / hour",
  },
];

export const finalCta = {
  eyebrow: "Let's talk",
  title: "Let's build something extraordinary.",
  text: "Tell us where you want to be in 12 months. We'll show you the product, the plan and the team to get you there.",
};

/* ------------------------------------------------------------------ */
/* Footer                                                              */
/* ------------------------------------------------------------------ */

export const footer = {
  mission:
    "A software and growth studio helping startups, SMEs and enterprises build products people love — and grow them.",
  columns: [
    {
      title: "Services",
      links: [
        { label: "Website Development", href: "/services/website-development" },
        { label: "Custom Software & SaaS", href: "/services/software-development" },
        { label: "Mobile Apps", href: "/services/mobile-app-development" },
        { label: "SEO", href: "/services/seo" },
        { label: "AI & Automation", href: "/services/ai-automation" },
        { label: "Paid Ads", href: "/services/paid-ads" },
      ],
    },
    {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Work", href: "/work" },
        { label: "Solutions", href: "/solutions" },
        { label: "Careers", href: "/careers" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Blog", href: "/blog" },
        { label: "Pricing", href: "/pricing" },
        { label: "FAQ", href: "/faq" },
        { label: "Get a Quote", href: "/quote" },
        { label: "Book a Call", href: "/book" },
      ],
    },
    {
      title: "Legal",
      links: [
        { label: "Privacy Policy", href: "/privacy-policy" },
        { label: "Terms of Service", href: "/terms" },
        { label: "Cookie Policy", href: "/cookie-policy" },
      ],
    },
  ],
};
