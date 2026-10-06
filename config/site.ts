/**
 * Wessmaa — central site configuration.
 * All global copy, navigation and links live here. Page-level content
 * (services, case studies, team …) lives in /content.
 *
 * WESSMAA = Website · Editing · Social · SEO · Marketing · Automation · Ads
 */

export const siteConfig = {
  name: "WESSMAA",
  legalName: "WESSMAA Digital Growth Company",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.wessmaa.com",
  tagline: "Drive Traffic → Build Trust → Increase Conversions",
  description:
    "WESSMAA is a digital growth company that helps businesses build a stronger, more credible and more effective presence online. We combine technology, creative content, social media, SEO, marketing, advertising and automation to create a connected digital journey for a business.",
  keywords: [
    "digital growth company",
    "web development agency",
    "creative content editing",
    "social media management",
    "SEO agency",
    "digital marketing strategy",
    "business automation",
    "paid advertising agency",
    "conversion rate optimization",
  ],
  ogImage: "/og.png",
  contact: {
    email: "info@wessmaa.com",
    careersEmail: "info@wessmaa.com",
    phone: "+1(645) 250-7849",
    phoneHref: "tel:+16452507849",
    whatsapp: "https://wa.me/16452507849",
    address: {
      street: "National University of Modern Languages (NUML), H-9/4",
      city: "Islamabad",
      region: "Islamabad Capital Territory",
      country: "Pakistan",
      postalCode: "44000",
    },
    mapUrl:
      "https://www.openstreetmap.org/?mlat=33.666389&mlon=73.047842#map=16/33.666389/73.047842",
    mapEmbed:
      "https://www.openstreetmap.org/export/embed.html?bbox=73.037842%2C33.661389%2C73.057842%2C33.671389&layer=mapnik&marker=33.666389%2C73.047842",
    hours: "Mon – Fri, 9:00 – 18:00 PKT",
    responseTime: "We reply to every enquiry within 1 business day.",
  },
  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/company/wessmaa_official/", icon: "linkedin" },
    { label: "Instagram", href: "https://www.instagram.com/wessmaa_official", icon: "instagram" },
    { label: "TikTok", href: "https://www.tiktok.com/@wessmaa2", icon: "tiktok" },
  ],
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
  { label: "About", href: "/about" },
  { label: "Careers & Opportunities", href: "/careers" },
  { label: "FAQ", href: "/faq" },
] as const;

export const megaMenuFeature = {
  eyebrow: "Featured",
  title: "The WESSMAA growth stack",
  text: "Website, Editing, Social, SEO, Marketing, Automation and Ads — one team, one roadmap, one number to move.",
  href: "/solutions",
  cta: "Explore solutions",
};

export const ctas = {
  primary: { label: "Start a Project", href: "/quote" },
  secondary: { label: "Explore Our Services", href: "/services" },
  talk: { label: "Let's Talk", href: "/contact" },
  quote: { label: "Start a Project", href: "/quote" },
};

/* ------------------------------------------------------------------ */
/* Home page copy & Mission Pillars                                    */
/* ------------------------------------------------------------------ */

export const hero = {
  badge: "Drive Traffic → Build Trust → Increase Conversions",
  titleStart: "Drive Traffic.",
  rotatingWords: ["Build Trust.", "Increase Conversions.", "Accelerate Growth.", "Deliver Results."],
  titleEnd: "Grow",
  titleAccent: "exponentially",
  titleLast: "with WESSMAA.",
  subtitle:
    "WESSMAA builds digital experiences and growth systems that help businesses become more visible, more credible and more effective online.",
  trust: "Digital Growth Company",
};

export const stats = [
  {
    value: 12,
    suffix: "+",
    label: "Projects delivered",
    detail: "Across web, brand and growth",
  },
  { value: 8, suffix: "+", label: "Happy clients", detail: "Founders and growing teams" },
  { value: 2, suffix: "", label: "Countries", detail: "Pakistan and beyond" },
  { value: 2, suffix: "+", label: "Years of experience", detail: "Building since 2024" },
];

/** The three core mission pillars: What WESSMAA does and expected outcome. */
export const missionPillars = [
  {
    pillar: "Drive Traffic",
    whatWessmaaDoes:
      "Use websites, SEO, social content, campaigns and ads to bring the right audience to the business.",
    expectedOutcome: "More relevant visitors and discovery.",
    badge: "Discovery & Reach",
    icon: "trending-up",
    capabilities: ["Websites", "SEO", "Social Content", "Campaigns & Ads"],
  },
  {
    pillar: "Build Trust",
    whatWessmaaDoes:
      "Create professional digital experiences, consistent branding, useful content and genuine proof of capability.",
    expectedOutcome: "More credibility and less customer hesitation.",
    badge: "Credibility & Authority",
    icon: "shield-check",
    capabilities: ["UX/UI Design", "Consistent Branding", "Visual Storytelling", "Proof of Capability"],
  },
  {
    pillar: "Increase Conversions",
    whatWessmaaDoes:
      "Use research-based design, clear messaging, strong CTAs and reduced friction to guide visitors toward action.",
    expectedOutcome: "More enquiries, leads, bookings or sales.",
    badge: "Results & Revenue",
    icon: "target",
    capabilities: ["Research-Based Design", "Clear Messaging", "Strong CTAs", "Frictionless UX"],
  },
] as const;

/** The brand acronym — representing connected capabilities that work together as one growth system. */
export const acronym = [
  {
    letter: "W",
    word: "Website",
    tagline: "Modern websites. Stronger brands.",
    purpose:
      "The website is the digital home of the business. It gives visitors a place to understand the brand, build confidence and take action.",
    text: "Responsive development, UX/UI, landing pages, business websites, conversion-focused layouts, technical SEO foundations and performance.",
    href: "/services/website-development",
  },
  {
    letter: "E",
    word: "Editing",
    tagline: "Turn ideas into visual stories.",
    purpose:
      "Creative editing helps the brand communicate quickly and consistently across digital platforms.",
    text: "Reels, short-form videos, promotional edits, social creatives, campaign videos and visual storytelling.",
    href: "/services/content-editing",
  },
  {
    letter: "S",
    word: "Social",
    tagline: "Build communities. Boost engagement.",
    purpose:
      "Social media keeps the brand active, visible and connected with its audience.",
    text: "Content strategy, posts, reels, stories, community content, platform management and reporting.",
    href: "/services/social-media",
  },
  {
    letter: "S",
    word: "SEO",
    tagline: "Higher visibility. More growth.",
    purpose:
      "SEO helps people discover the business when they are actively searching for relevant products, services or information.",
    text: "Technical SEO, on-page SEO, content strategy, keyword research, internal linking, local SEO and measurement.",
    href: "/services/seo",
  },
  {
    letter: "M",
    word: "Marketing",
    tagline: "Smart strategies. Bigger impact.",
    purpose:
      "Marketing connects business objectives with audience needs, messaging, content and campaigns.",
    text: "Strategy, positioning, campaigns, customer journeys, content planning, audience targeting and measurement.",
    href: "/services/digital-marketing",
  },
  {
    letter: "A",
    word: "Automation",
    tagline: "Work smarter. Not harder.",
    purpose:
      "Automation reduces repetitive tasks and helps businesses respond faster and operate more consistently.",
    text: "Lead workflows, notifications, CRM processes, email sequences, reporting and repetitive business-process automation.",
    href: "/services/ai-automation",
  },
  {
    letter: "A",
    word: "Ads",
    tagline: "Reach the right people. Get real results.",
    purpose:
      "Paid advertising can accelerate reach when targeting, creative, landing pages and measurement work together.",
    text: "Campaign setup, audience targeting, creative testing, landing-page alignment, conversion tracking and optimization.",
    href: "/services/paid-ads",
  },
];

export const whyWessmaa = {
  eyebrow: "Why WESSMAA is different",
  title: "We don't just create digital activity. We build connected growth systems.",
  subtitle:
    "WESSMAA is not only just a marketing agency. We connect technology, creative content, social media, SEO, marketing, advertising and automation so they work together as one growth system that helps a business get found, get trusted and get chosen.",
  benefits: [
    {
      title: "Not only just a marketing agency",
      text: "We connect every capability into one growth system so your digital foundation and campaigns work together seamlessly.",
    },
    {
      title: "Drive Traffic",
      text: "Use websites, SEO, social content, campaigns and ads to bring the right audience to your business for discovery.",
    },
    {
      title: "Build Trust",
      text: "Create professional digital experiences, consistent branding, useful content and genuine proof of capability that eliminate hesitation.",
    },
    {
      title: "Increase Conversions",
      text: "Use research-based design, clear messaging, strong CTAs and reduced friction to guide visitors toward enquiries, leads and sales.",
    },
    {
      title: "A connected digital journey",
      text: "Every service has a purpose within the bigger business journey: getting discovered, earning trust and converting attention into real business results.",
    },
  ],
  quote: {
    text: "We don't just create digital activity. We build the digital foundation and growth system that helps a business get found, get trusted and get chosen.",
    author: "How WESSMAA Thinks",
  },
};

/** 3. THE WESSMAA DIGITAL GROWTH JOURNEY */
export const processSteps = [
  {
    step: "01",
    title: "Discover",
    duration: "Stage 01",
    text: "Understand the business, audience, market, competitors and existing digital footprint.",
    outputs: ["Audience research", "Competitor analysis", "Digital footprint audit"],
  },
  {
    step: "02",
    title: "Build",
    duration: "Stage 02",
    text: "Create or improve the website, content, brand assets and digital foundations.",
    outputs: ["High-impact website", "Brand assets", "Digital foundation"],
  },
  {
    step: "03",
    title: "Attract",
    duration: "Stage 03",
    text: "Use SEO, social, content and advertising to bring relevant people in.",
    outputs: ["Search visibility", "Targeted traffic", "Engaging content"],
  },
  {
    step: "04",
    title: "Trust",
    duration: "Stage 04",
    text: "Present the business consistently and provide useful information and genuine proof.",
    outputs: ["Consistent branding", "Social proof", "Trust signals"],
  },
  {
    step: "05",
    title: "Convert",
    duration: "Stage 05",
    text: "Make it easy for visitors to enquire, book, buy, call or take the intended action.",
    outputs: ["Frictionless UX", "Clear CTAs", "Conversion flows"],
  },
  {
    step: "06",
    title: "Improve",
    duration: "Stage 06",
    text: "Use analytics, feedback and ongoing optimization to improve performance.",
    outputs: ["Analytics tracking", "Continuous optimization", "Compounding ROI"],
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
    metric: { value: "PKR 5M+", label: "processed through platforms we supported" },
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: "heart-pulse",
    title: "Patient-first digital health, built for compliance.",
    text: "Telehealth, patient portals and clinical tools designed around HIPAA and GDPR requirements from the first sprint.",
    points: ["HIPAA-ready architecture", "Telehealth and scheduling", "EHR / FHIR integrations"],
    metric: { value: "Growing", label: "health products supported" },
  },
  {
    id: "ecommerce",
    label: "E-commerce",
    icon: "shopping-bag",
    title: "Storefronts that load fast and sell harder.",
    text: "Headless commerce, Shopify builds, subscription models and the performance marketing engine that feeds them.",
    points: ["Headless Shopify and Next.js", "CRO and A/B testing", "Meta and Google shopping ads"],
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
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: "truck",
    title: "Operational software that moves real things.",
    text: "Fleet tracking, dispatch, warehouse and last-mile tools that replace spreadsheets with real-time visibility.",
    points: ["Live GPS tracking", "Route optimisation", "Driver and warehouse apps"],
  },
  {
    id: "real-estate",
    label: "Real Estate",
    icon: "building-2",
    title: "Property platforms that turn browsers into buyers.",
    text: "Listing portals, CRM automations and virtual tour experiences for agencies, developers and proptech startups.",
    points: ["Listings and map search", "Lead routing automations", "Virtual tours and 3D media"],
  },
];

export const engagementModels = [
  {
    name: "Fixed Price",
    icon: "target",
    bestFor: "Well-defined scopes and MVPs",
    text: "A clear scope, a fixed budget and a fixed timeline. Ideal for MVPs, websites and campaign launches.",
    points: ["Detailed scope and milestones", "Budget certainty", "Milestone-based payments"],
    from: "From $500",
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
    from: "From $900 / month",
    featured: true,
  },
  {
    name: "Time & Material",
    icon: "clock",
    bestFor: "Evolving scopes and R&D",
    text: "Maximum flexibility for products where requirements evolve. Pay for the hours used, tracked transparently.",
    points: ["Weekly timesheets", "Re-prioritise any sprint", "No minimum commitment"],
    from: "From $15 / hour",
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
    "WESSMAA is a digital growth company that helps businesses build a stronger, more credible and more effective presence online through connected digital growth systems.",
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
        { label: "Let's Talk", href: "/contact" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Careers & Opportunities", href: "/careers" },
        { label: "FAQ", href: "/faq" },
        { label: "Get a Quote", href: "/quote" },
        { label: "Let's Talk", href: "/contact" },
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
