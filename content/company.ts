/**
 * Company content: team, testimonials, clients, values, timeline, awards,
 * solutions, pricing, FAQs and careers.
 */

/* ------------------------------ Clients ------------------------------ */
export const clients = [
  "Northwind",
  "Medora",
  "Luma",
  "BrightPath",
  "Freightly",
  "Havenly",
  "Crestline",
  "Orbitly",
  "Nimbus",
  "Keystone",
  "Vantage",
  "Solace",
];

/* ---------------------------- Testimonials --------------------------- */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "Wessmaa rebuilt the core of our business without a single hour of downtime. Month-end close went from four days to a morning.",
    name: "Sara Malik",
    role: "COO",
    company: "Northwind Pay",
    avatar: "/images/team/team-2.webp",
    rating: 5,
  },
  {
    quote:
      "One team rebuilt our store, produced our content and ran our ads. Revenue tripled and I got my weekends back.",
    name: "Ayesha Rahman",
    role: "Founder",
    company: "Luma Living",
    avatar: "/images/team/team-4.webp",
    rating: 5,
  },
  {
    quote:
      "They understood that in healthcare, trust is the product. Our clinicians finally have one tool instead of three.",
    name: "Dr. James Whitfield",
    role: "Founder",
    company: "Medora Health",
    avatar: "/images/team/team-3.webp",
    rating: 5,
  },
  {
    quote:
      "We went from spreadsheets to a live control tower in four months. The AI dispatch alone paid for the project.",
    name: "Omar Siddiqui",
    role: "Head of Operations",
    company: "Freightly",
    avatar: "/images/team/team-1.webp",
    rating: 5,
  },
  {
    quote:
      "Completion rates went from embarrassing to industry-leading. They think about learners, not just features.",
    name: "Michael Chen",
    role: "CEO",
    company: "BrightPath Academy",
    avatar: "/images/team/team-5.webp",
    rating: 5,
  },
  {
    quote:
      "Our agents spend their day on viewings instead of chasing emails. Qualified leads have more than doubled.",
    name: "Layla Haddad",
    role: "Managing Director",
    company: "Havenly Estates",
    avatar: "/images/team/team-6.webp",
    rating: 5,
  },
];

export const featuredQuote = {
  quote:
    "Most agencies build what you ask for. Wessmaa asked why, rebuilt our roadmap around revenue, then shipped it faster than our internal team could have scoped it.",
  name: "Sara Malik",
  role: "COO, Northwind Pay",
  avatar: "/images/team/team-2.webp",
  metric: { value: "2×", label: "more clarity for the operations team" },
};

/* -------------------------------- Team ------------------------------- */
export type TeamDepartment =
  | "founders"
  | "business"
  | "development"
  | "creative"
  | "marketing";

export type TeamMember = {
  name: string;
  role: string;
  linkedin?: string;
  department: TeamDepartment;
  image?: string;
};

/** Team portraits use consistent, white-studio close crops where source photos are available. */
export const team: TeamMember[] = [
  {
    name: "Ahmad Raza",
    role: "Founder & CEO",
    linkedin: "https://www.linkedin.com/in/ahmadraza-web",
    department: "founders",
    image: "/images/team/ahmad-raza-portrait.png",
  },
  {
    name: "Muhammad Fahad",
    role: "Founder & CMO",
    linkedin: "https://www.linkedin.com/in/muhammad-fahadkhan",
    department: "founders",
    image: "/images/team/muhammad-fahad-portrait.png",
  },
  {
    name: "Ahsan Mir",
    role: "Senior Development Manager",
    linkedin: "https://www.linkedin.com/in/ashan-mir",
    department: "development",
    image: "/images/team/ahsan-mir-portrait.png",
  },
  {
    name: "Aleena Ahmad",
    role: "Senior Business Administrator",
    linkedin: "https://www.linkedin.com/in/aleena-ahmad-aabba025b",
    department: "business",
    image: "/images/team/aleena-ahmad-portrait.png",
  },
  {
    name: "Areeba Zaib Sati",
    role: "Senior Graphics Designer",
    linkedin: "https://www.linkedin.com/in/areeba-zeb-satti-3a9785382/",
    department: "creative",
    image: "/images/team/areeba-zaib-sati-portrait.png",
  },
  {
    name: "Mohsin Amjad",
    role: "Senior Graphics Designer",
    linkedin: "https://www.linkedin.com/in/mohsinajmad",
    department: "creative",
    image: "/images/team/mohsin-amjad-portrait.png",
  },
  {
    name: "Afnan Abbasi",
    role: "Senior Video Editor",
    linkedin: "https://www.linkedin.com/in/afnan-abbasi-931a99440",
    department: "creative",
    image: "/images/team/afnan-abbasi-portrait.png",
  },
  {
    name: "Rabbiya Laeeque",
    role: "Assistant Business Administrator",
    linkedin: "https://www.linkedin.com/in/rabbiya-laeeque-005bb33b5",
    department: "business",
    image: "/images/team/rabbiya-laeeque-portrait.png",
  },
  {
    name: "Ahla Sajjad",
    role: "Social Media Manager",
    linkedin: "https://www.linkedin.com/in/ahla-sajjad-a60309a5",
    department: "marketing",
    image: "/images/team/ahla-sajjad-portrait.png",
  },
  {
    name: "Waqar Hussain",
    role: "Junior Video Editor",
    department: "creative",
    image: "/images/team/waqar-hussain-portrait.png",
  },
  {
    name: "Abdul Waris",
    role: "Junior Developer",
    linkedin: "https://www.linkedin.com/in/abdulwaris7",
    department: "development",
    image: "/images/team/abdul-waris-portrait.png",
  },
];

/* ------------------------------- About ------------------------------- */
export const values = [
  {
    icon: "target",
    title: "Outcomes over output",
    text: "We measure success in revenue, retention and hours saved — not tickets closed.",
  },
  {
    icon: "eye",
    title: "Radical transparency",
    text: "Live roadmaps, open budgets and honest updates, especially when the news is hard.",
  },
  {
    icon: "gem",
    title: "Craft in the details",
    text: "The last 10% is where products become premium. We never skip it.",
  },
  {
    icon: "handshake",
    title: "Partners, not vendors",
    text: "We earn long relationships by acting like owners of your product.",
  },
  {
    icon: "zap",
    title: "Speed with safety",
    text: "Ship weekly, test everything, and never gamble with production.",
  },
  {
    icon: "heart",
    title: "Human first",
    text: "Kind, direct and respectful — with clients, users and each other.",
  },
];

export const timeline = [
  {
    year: "2024",
    title: "Started at NUML Islamabad",
    text: "Wessmaa begins as a small studio building websites for local businesses.",
  },
  {
    year: "2025",
    title: "Expanded our services",
    text: "Design, development and growth support come together in one focused team.",
  },
  {
    year: "2026",
    title: "Growing with purpose",
    text: "We continue building practical digital products for early-stage businesses.",
  },
];

export const awards = [
  { title: "Top Software Developer", org: "Clutch", year: "2025" },
  { title: "Top Web Design Agency", org: "GoodFirms", year: "2025" },
  { title: "Google Partner", org: "Google Ads", year: "2024" },
  { title: "Meta Business Partner", org: "Meta", year: "2024" },
  { title: "AWS Select Tier", org: "Amazon Web Services", year: "2024" },
  { title: "ISO 27001 aligned", org: "Information Security", year: "2025" },
];

/* ------------------------------ Solutions ---------------------------- */
export const solutions = [
  {
    slug: "mvp-launch",
    name: "MVP Launch",
    icon: "rocket",
    tagline: "From idea to paying users in 10 weeks.",
    text: "A fixed-scope package for founders: product strategy, UX, a production-grade MVP, landing page, analytics and a launch campaign.",
    includes: [
      "Product discovery sprint",
      "UX and UI design",
      "Web or mobile MVP",
      "Landing page and SEO setup",
      "Launch ads campaign",
    ],
    timeline: "10 weeks",
    from: "$1,200",
    accent: "orange",
  },
  {
    slug: "growth-engine",
    name: "WESSMAA Growth Engine",
    icon: "trending-up",
    tagline: "Website, content, social, SEO and ads — as one retainer.",
    text: "Our signature package. A single team runs your website, content editing, social, SEO, marketing automation and paid ads against one shared growth target.",
    includes: [
      "Website optimisation and CRO",
      "12+ edited videos / month",
      "Social management on 2 platforms",
      "SEO content and technical fixes",
      "Google and Meta ads management",
    ],
    timeline: "Monthly",
    from: "$350 / month",
    accent: "blue",
    featured: true,
  },
  {
    slug: "ai-integration",
    name: "AI Integration",
    icon: "sparkles",
    tagline: "Practical AI in production in 30 days.",
    text: "We find the three highest-ROI automation opportunities in your business, then build, evaluate and deploy them with guardrails.",
    includes: [
      "Automation opportunity audit",
      "Up to 3 AI agents or workflows",
      "Integrations with your stack",
      "Evaluation and guardrails",
      "Team training",
    ],
    timeline: "30 days",
    from: "$600",
    accent: "orange",
  },
  {
    slug: "enterprise-modernization",
    name: "Enterprise Modernization",
    icon: "building-2",
    tagline: "Legacy systems, rebuilt without the risk.",
    text: "Incremental migration of legacy platforms to modern cloud architecture, with zero downtime and a clear business case at every stage.",
    includes: [
      "Architecture and risk audit",
      "Strangler-pattern migration",
      "Cloud and DevOps setup",
      "Security and compliance",
      "Dedicated squad",
    ],
    timeline: "3–9 months",
    from: "Custom",
    accent: "blue",
  },
];

/* ------------------------------- Pricing ----------------------------- */
export const pricingTiers = [
  {
    name: "Starter",
    description: "For founders and small businesses launching their first product or website.",
    monthly: 5000,
    project: 12000,
    features: [
      "Marketing website up to 8 pages",
      "Custom UI design",
      "CMS and SEO foundations",
      "Analytics setup",
      "30 days of support",
    ],
    cta: "Start with Starter",
  },
  {
    name: "Growth",
    description: "For scaling teams who need product and growth moving together.",
    monthly: 12000,
    project: 35000,
    features: [
      "Web app or mobile MVP",
      "Design system",
      "SEO and content engine",
      "Paid ads management",
      "AI automation workflow",
      "Weekly demos and reporting",
    ],
    cta: "Choose Growth",
    popular: true,
  },
  {
    name: "Custom",
    description: "For larger or evolving project requirements.",
    monthly: 20000,
    project: 60000,
    features: [
      "Dedicated cross-functional squad",
      "Architecture and security reviews",
      "SSO, audit logs and compliance",
      "Reliable support and monitoring",
      "Named delivery lead",
    ],
    cta: "Request a quote",
  },
];

export const pricingComparison = {
  columns: ["Starter", "Growth", "Enterprise"],
  groups: [
    {
      label: "Build",
      rows: [
        { label: "Custom UI/UX design", values: [true, true, true] },
        { label: "Marketing website", values: [true, true, true] },
        { label: "Web app or SaaS platform", values: [false, true, true] },
        { label: "Mobile apps (iOS + Android)", values: [false, "Add-on", true] },
        { label: "AI agents & automation", values: [false, "1 workflow", "Unlimited"] },
      ],
    },
    {
      label: "Grow",
      rows: [
        { label: "SEO foundations", values: [true, true, true] },
        { label: "Ongoing SEO content", values: [false, true, true] },
        { label: "Social media management", values: [false, "2 platforms", "All platforms"] },
        { label: "Video & content editing", values: [false, "12 / month", "Custom"] },
        { label: "Paid ads management", values: [false, true, true] },
      ],
    },
    {
      label: "Support",
      rows: [
        { label: "Post-launch support", values: ["30 days", "90 days", "Ongoing SLA"] },
        { label: "Response time", values: ["48h", "24h", "4h"] },
        { label: "Dedicated delivery lead", values: [false, true, true] },
        { label: "Security & compliance reviews", values: [false, false, true] },
      ],
    },
  ],
};

/* --------------------------------- FAQ ------------------------------- */
export type FaqItem = { q: string; a: string };

export const homeFaqs: FaqItem[] = [
  {
    q: "What does WESSMAA stand for?",
    a: "Website, Editing, Social, SEO, Marketing, Automation and Ads — the seven disciplines we bring together so your product and your growth are built by one accountable team.",
  },
  {
    q: "How much does a project cost?",
    a: "Marketing websites start at $500, MVPs at $1,200 and growth retainers at $350/month. After a free discovery call, you get a fixed proposal with a clear scope — no surprises.",
  },
  {
    q: "How long does it take to build an MVP?",
    a: "Most MVPs ship in 8–12 weeks. We scope around the one workflow that proves your business, launch it, then iterate with real users.",
  },
  {
    q: "Do I own the code and designs?",
    a: "Yes, 100%. Code lives in your repositories, designs in your Figma, and all intellectual property is assigned to you from the first commit.",
  },
  {
    q: "Can you work with our existing team?",
    a: "Absolutely. We often embed alongside in-house engineers or marketers, adopting your tools, rituals and code standards.",
  },
  {
    q: "Which time zones do you work in?",
    a: "Our core team is in Pakistan (PKT) with overlap hours for the UK, Europe, the Gulf and North America. Every client gets a guaranteed daily overlap window.",
  },
  {
    q: "What happens after launch?",
    a: "Most clients continue on a maintenance or growth retainer. We monitor, patch, improve and grow the product with SLAs you can rely on.",
  },
  {
    q: "How do you keep projects on time?",
    a: "Short sprints, weekly demos, a live roadmap and a delivery lead who flags risks early keep every project moving.",
  },
];

export const faqCategories: { id: string; label: string; items: FaqItem[] }[] = [
  {
    id: "general",
    label: "General",
    items: [
      homeFaqs[0],
      {
        q: "Who do you typically work with?",
        a: "Startups from pre-seed to Series C, SMEs modernising their operations, and enterprise teams who need extra senior capacity.",
      },
      {
        q: "Where is Wessmaa based?",
        a: "We are based at the National University of Modern Languages (NUML) in H-9/4, Islamabad, Pakistan, and work with clients in Pakistan and abroad.",
      },
      homeFaqs[5],
    ],
  },
  {
    id: "pricing",
    label: "Pricing & contracts",
    items: [
      homeFaqs[1],
      {
        q: "Which engagement models do you offer?",
        a: "Fixed Price for well-defined scopes, Dedicated Team for long-term roadmaps, and Time & Material for evolving R&D work.",
      },
      {
        q: "How do payments work?",
        a: "Fixed-price projects are paid in milestones. Retainers and dedicated teams are billed monthly in advance. We accept bank transfer, card and Wise.",
      },
      { q: "Do you sign NDAs?", a: "Yes — happily, before the first detailed conversation." },
    ],
  },
  {
    id: "process",
    label: "Process & delivery",
    items: [
      homeFaqs[2],
      homeFaqs[7],
      homeFaqs[4],
      {
        q: "How will we communicate?",
        a: "A shared Slack channel, weekly demos, a live roadmap in Linear or Jira and a monthly steering review.",
      },
    ],
  },
  {
    id: "technical",
    label: "Technical",
    items: [
      homeFaqs[3],
      {
        q: "Which technologies do you use?",
        a: "React, Next.js, Node.js, Python, Laravel, Flutter, React Native, PostgreSQL, AWS, Google Cloud and Vercel — chosen per project.",
      },
      {
        q: "How do you handle security?",
        a: "Secure SDLC, code reviews, dependency scanning, encryption at rest and in transit, and ISO 27001-aligned internal policies.",
      },
      homeFaqs[6],
    ],
  },
  {
    id: "growth",
    label: "Marketing & growth",
    items: [
      {
        q: "How soon will SEO show results?",
        a: "Technical fixes can show impact in weeks. Content-led growth typically compounds from month three onwards.",
      },
      {
        q: "What is the minimum ad budget?",
        a: "We recommend at least $1,500/month in ad spend per platform so campaigns have enough data to optimise.",
      },
      {
        q: "Do you create content and ad creative?",
        a: "Yes. Our in-house editing and design team produces videos, reels, carousels and static ads every week.",
      },
      {
        q: "Can you automate our marketing?",
        a: "Yes — lead capture, CRM routing, nurture emails, WhatsApp follow-ups and reporting can all be automated.",
      },
    ],
  },
];

/* ------------------------------- Careers ----------------------------- */
export const benefits = [
  {
    icon: "laptop",
    title: "Remote-friendly",
    text: "Work from our NUML Islamabad studio or remotely across Pakistan.",
  },
  {
    icon: "trending-up",
    title: "Market-leading pay",
    text: "Salaries benchmarked in USD and reviewed every six months.",
  },
  {
    icon: "heart-pulse",
    title: "Health cover",
    text: "Comprehensive medical insurance for you and your family.",
  },
  {
    icon: "graduation-cap",
    title: "Learning budget",
    text: "$1,000 a year for courses, books and conferences.",
  },
  {
    icon: "plane",
    title: "Team retreats",
    text: "Two company offsites a year — from Nathia Gali to Hunza.",
  },
  {
    icon: "clock",
    title: "Flexible hours",
    text: "Core overlap hours, then organise your day your way.",
  },
];

export type Job = {
  slug: string;
  title: string;
  department: "Engineering" | "Design" | "Marketing" | "Operations";
  location: string;
  type: "Full-time" | "Contract";
  experience: string;
  salary: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
};

export const jobs: Job[] = [
  {
    slug: "senior-full-stack-engineer",
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Islamabad / Remote (PK)",
    type: "Full-time",
    experience: "5+ years",
    salary: "PKR 450K – 650K / month",
    summary:
      "Lead the architecture and delivery of SaaS platforms for international clients using Next.js, Node.js and PostgreSQL.",
    responsibilities: [
      "Own features end-to-end from design review to production",
      "Design scalable APIs and data models",
      "Mentor mid-level engineers through code review",
      "Join client demos and technical discussions",
    ],
    requirements: [
      "5+ years with TypeScript, React and Node.js",
      "Strong PostgreSQL and system design skills",
      "Experience shipping multi-tenant SaaS",
      "Excellent written English",
    ],
    niceToHave: ["AWS or GCP certification", "Experience with AI/LLM integrations"],
  },
  {
    slug: "flutter-developer",
    title: "Flutter Developer",
    department: "Engineering",
    location: "Remote (PK)",
    type: "Full-time",
    experience: "3+ years",
    salary: "PKR 280K – 420K / month",
    summary:
      "Build beautiful, performant cross-platform apps for healthcare, logistics and consumer clients.",
    responsibilities: [
      "Build and ship Flutter apps to both stores",
      "Implement pixel-perfect UI from Figma",
      "Integrate REST and real-time APIs",
      "Write widget and integration tests",
    ],
    requirements: [
      "3+ years of Flutter in production",
      "Solid state management (Riverpod or Bloc)",
      "Published apps on App Store and Google Play",
    ],
    niceToHave: ["Native iOS or Android experience", "Offline-first architecture"],
  },
  {
    slug: "ai-automation-engineer",
    title: "AI & Automation Engineer",
    department: "Engineering",
    location: "Islamabad / Remote (PK)",
    type: "Full-time",
    experience: "3+ years",
    salary: "PKR 350K – 550K / month",
    summary:
      "Design and deploy AI agents, RAG systems and workflow automations that run real businesses.",
    responsibilities: [
      "Build agents and RAG pipelines in Python",
      "Create evaluation suites and guardrails",
      "Integrate with CRMs, ERPs and messaging tools",
      "Monitor cost, latency and accuracy in production",
    ],
    requirements: [
      "Strong Python and API design",
      "Hands-on LLM application experience",
      "Experience with vector databases",
      "Pragmatic, product-minded approach",
    ],
    niceToHave: ["n8n or Zapier expertise", "MLOps experience"],
  },
  {
    slug: "senior-product-designer",
    title: "Senior Product Designer",
    department: "Design",
    location: "Remote (PK)",
    type: "Full-time",
    experience: "5+ years",
    salary: "PKR 400K – 600K / month",
    summary:
      "Shape SaaS and mobile products from research to design system for clients around the world.",
    responsibilities: [
      "Run discovery workshops and user research",
      "Design flows, UI and prototypes in Figma",
      "Build and maintain design systems",
      "Partner closely with engineers through delivery",
    ],
    requirements: [
      "5+ years of product design",
      "A portfolio with shipped SaaS or mobile work",
      "Strong systems thinking and visual craft",
    ],
    niceToHave: ["Motion design skills", "Front-end fundamentals"],
  },
  {
    slug: "performance-marketing-manager",
    title: "Performance Marketing Manager",
    department: "Marketing",
    location: "Islamabad / Remote (PK)",
    type: "Full-time",
    experience: "4+ years",
    salary: "PKR 300K – 450K / month",
    summary:
      "Plan, launch and scale profitable campaigns across Google, Meta, LinkedIn and TikTok for international brands.",
    responsibilities: [
      "Own ad accounts and budgets for 6–8 clients",
      "Plan creative tests with our editing team",
      "Set up tracking and attribution",
      "Report results to clients every week",
    ],
    requirements: [
      "4+ years managing paid media",
      "Managed $50K+/month in ad spend",
      "Strong analytics and GA4 skills",
    ],
    niceToHave: ["E-commerce experience", "Server-side tracking experience"],
  },
  {
    slug: "video-editor",
    title: "Video Editor & Motion Designer",
    department: "Marketing",
    location: "Islamabad",
    type: "Full-time",
    experience: "2+ years",
    salary: "PKR 150K – 250K / month",
    summary:
      "Edit scroll-stopping short-form video, ads and motion graphics for our clients' social and paid channels.",
    responsibilities: [
      "Edit 30+ short-form videos a month",
      "Design motion templates and captions",
      "Collaborate with ads team on creative tests",
    ],
    requirements: [
      "Premiere Pro or DaVinci Resolve",
      "After Effects fundamentals",
      "A reel of short-form work",
    ],
    niceToHave: ["Sound design", "Thumbnail design"],
  },
  {
    slug: "seo-specialist",
    title: "SEO Specialist",
    department: "Marketing",
    location: "Remote (PK)",
    type: "Contract",
    experience: "3+ years",
    salary: "PKR 180K – 280K / month",
    summary: "Drive technical and content SEO for SaaS, e-commerce and local-business clients.",
    responsibilities: [
      "Run technical audits and prioritise fixes",
      "Build keyword and content roadmaps",
      "Brief writers and review content",
      "Report on rankings and organic revenue",
    ],
    requirements: [
      "3+ years of hands-on SEO",
      "Ahrefs or Semrush proficiency",
      "Comfort working with developers",
    ],
    niceToHave: ["Programmatic SEO experience", "AI search optimisation"],
  },
];

export const getJob = (slug: string) => jobs.find((j) => j.slug === slug);
