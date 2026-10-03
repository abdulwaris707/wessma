/**
 * Services catalogue. Drives the mega menu, /services and /services/[slug].
 * `group` separates "Build" (engineering) from "Grow" (the marketing side of WESSMAA).
 */

export type ServiceIcon =
  | "globe"
  | "code"
  | "smartphone"
  | "pen-tool"
  | "clapperboard"
  | "share"
  | "search"
  | "trending-up"
  | "sparkles"
  | "target"
  | "cloud"
  | "life-buoy";

export type Service = {
  slug: string;
  title: string;
  short: string;
  icon: ServiceIcon;
  group: "Build" | "Grow";
  letter?: string;
  heroTitle: string;
  heroText: string;
  problem: { title: string; points: string[] };
  solution: { title: string; points: string[] };
  features: { title: string; text: string }[];
  deliverables: string[];
  tech: string[];
  caseStudies: string[];
  pricingHint: { from: string; note: string };
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "website-development",
    title: "Website Development",
    short: "High-performance marketing sites and web apps built on Next.js, engineered to convert.",
    icon: "globe",
    group: "Build",
    letter: "W",
    heroTitle: "Websites that load in a blink and sell while you sleep.",
    heroText:
      "From launch sites to 500-page content platforms, we design and build websites that score 95+ on Lighthouse, rank on Google and turn visitors into pipeline.",
    problem: {
      title: "Your website should be your best salesperson.",
      points: [
        "Slow, template-based sites that leak visitors before the hero loads",
        "Marketing waits weeks on developers for simple page changes",
        "Beautiful designs that never translate into qualified leads",
      ],
    },
    solution: {
      title: "A conversion engine your team can actually run.",
      points: [
        "Next.js builds with sub-second loads and Core Web Vitals in the green",
        "Headless CMS so marketing can launch pages in minutes, not sprints",
        "Conversion-led UX, analytics and A/B testing from day one",
      ],
    },
    features: [
      {
        title: "Conversion-first UX",
        text: "Messaging hierarchy, social proof and CTAs designed around how buyers actually decide.",
      },
      {
        title: "Headless CMS",
        text: "Sanity, Contentful or Payload — your team edits content visually without touching code.",
      },
      {
        title: "Performance budget",
        text: "Every page ships under a strict performance budget: 95+ Lighthouse, zero layout shift.",
      },
      {
        title: "SEO foundations",
        text: "Semantic markup, schema, sitemaps and redirects handled before launch — not after.",
      },
      {
        title: "Analytics & tracking",
        text: "GA4, GTM, server-side events and conversion tracking wired to your ad platforms.",
      },
      {
        title: "Accessibility",
        text: "WCAG 2.2 AA compliance, keyboard navigation and screen-reader testing as standard.",
      },
    ],
    deliverables: [
      "Sitemap and content strategy",
      "Design system in Figma",
      "Next.js codebase",
      "CMS setup and training",
      "Analytics and SEO setup",
      "30 days of post-launch support",
    ],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Vercel", "WordPress"],
    caseStudies: ["luma-commerce", "havenly-estates"],
    pricingHint: { from: "Starting from PKR 45,000", note: "Final scope and quote are tailored to your project requirements." },
    faqs: [
      {
        q: "Can we edit the website ourselves after launch?",
        a: "Yes. Every site ships with a headless CMS and a recorded training session. Most clients publish new pages on their own within the first week.",
      },
      {
        q: "Do you work with WordPress or Webflow?",
        a: "We do. For content-heavy teams on a tight budget, WordPress or Webflow can be the right call. We recommend the stack after discovery, not before.",
      },
      {
        q: "Will my site rank on Google?",
        a: "We handle technical SEO, schema and on-page optimisation as part of every build. For ongoing rankings, pair the build with our SEO retainer.",
      },
    ],
  },
  {
    slug: "software-development",
    title: "Custom Software & SaaS",
    short:
      "Multi-tenant SaaS platforms, internal tools and APIs built to scale from MVP to millions.",
    icon: "code",
    group: "Build",
    heroTitle: "SaaS products engineered for your first user and your millionth.",
    heroText:
      "We take products from napkin sketch to paying customers — multi-tenant architecture, billing, admin, analytics and the boring-but-critical parts done right the first time.",
    problem: {
      title: "Most MVPs become the thing you have to rewrite.",
      points: [
        "Rushed codebases that collapse under the first 1,000 users",
        "Billing, roles and permissions bolted on as an afterthought",
        "No tests, no docs, and a bus factor of one",
      ],
    },
    solution: {
      title: "Production-grade from sprint one.",
      points: [
        "Modular, typed architecture that scales with your team and traffic",
        "Stripe billing, RBAC, audit logs and SSO built into the foundation",
        "CI/CD, automated tests and documentation your next hire will thank you for",
      ],
    },
    features: [
      {
        title: "Multi-tenant architecture",
        text: "Workspace isolation, per-tenant config and data partitioning designed for B2B from day one.",
      },
      {
        title: "Billing & subscriptions",
        text: "Stripe-powered plans, usage-based pricing, trials, invoices and dunning out of the box.",
      },
      {
        title: "Admin & analytics",
        text: "Internal dashboards for support, finance and product with the metrics that matter.",
      },
      {
        title: "APIs & integrations",
        text: "REST and GraphQL APIs, webhooks and integrations with the tools your customers use.",
      },
      {
        title: "Security & compliance",
        text: "SSO, RBAC, encryption at rest and SOC 2-ready practices baked into the codebase.",
      },
      {
        title: "Observability",
        text: "Logging, tracing and alerting so issues are caught before customers notice them.",
      },
    ],
    deliverables: [
      "Technical architecture document",
      "Production codebase with tests",
      "CI/CD pipelines",
      "Admin dashboard",
      "API documentation",
      "Handover and knowledge transfer",
    ],
    tech: ["Next.js", "Node.js", "Python", "PostgreSQL", "AWS", "Docker"],
    caseStudies: ["northwind-pay", "freightly"],
    pricingHint: { from: "Starting from PKR 90,000", note: "Final scope and quote are tailored to your project requirements." },
    faqs: [
      {
        q: "How fast can you ship an MVP?",
        a: "Most SaaS MVPs ship in 8–12 weeks. We scope ruthlessly around the one workflow that proves your business, then iterate with real users.",
      },
      {
        q: "Can you take over an existing codebase?",
        a: "Yes. We start with a two-week technical audit, stabilise what is there and give you an honest roadmap — refactor, rebuild or extend.",
      },
      {
        q: "Who owns the IP?",
        a: "You do, from the first commit. Code lives in your repositories and all IP is assigned to you in our contract.",
      },
    ],
  },
  {
    slug: "mobile-app-development",
    title: "Mobile App Development",
    short:
      "Native-quality iOS and Android apps with Flutter and React Native, shipped to both stores.",
    icon: "smartphone",
    group: "Build",
    heroTitle: "Mobile apps people keep on their home screen.",
    heroText:
      "Cross-platform apps with native feel, offline support and buttery 60fps interactions — from first prototype to App Store and Google Play launch.",
    problem: {
      title: "Two platforms, one budget, zero room for a mediocre app.",
      points: [
        "Separate iOS and Android teams double cost and timeline",
        "Janky hybrid apps that feel cheap and get one-star reviews",
        "App store rejections that delay launch by weeks",
      ],
    },
    solution: {
      title: "One codebase, native quality, both stores.",
      points: [
        "Flutter or React Native with native modules where performance matters",
        "Offline-first data, push notifications and deep linking built in",
        "Store submission, review guidelines and ASO handled end to end",
      ],
    },
    features: [
      {
        title: "Cross-platform",
        text: "One codebase for iOS and Android with platform-specific polish where it counts.",
      },
      {
        title: "Offline-first",
        text: "Local storage and background sync so your app works on the subway and in the field.",
      },
      {
        title: "Push & engagement",
        text: "Segmented push, in-app messaging and deep links that bring users back.",
      },
      {
        title: "Payments",
        text: "In-app purchases, subscriptions and Stripe or local gateways like JazzCash and Easypaisa.",
      },
      {
        title: "Analytics",
        text: "Funnels, retention cohorts and crash reporting from launch day.",
      },
      {
        title: "Store launch",
        text: "Screenshots, metadata, ASO and submission handled — including the rejections.",
      },
    ],
    deliverables: [
      "Interactive prototype",
      "iOS and Android apps",
      "Admin panel",
      "Backend and APIs",
      "Store listings and ASO",
      "Release pipeline (Fastlane)",
    ],
    tech: ["Flutter", "React Native", "Swift", "Kotlin", "Firebase", "Supabase"],
    caseStudies: ["medora-health", "brightpath-academy"],
    pricingHint: { from: "Starting from PKR 120,000", note: "Final scope and quote are tailored to your project requirements." },
    faqs: [
      {
        q: "Flutter or React Native?",
        a: "Both are excellent. We choose based on your team, existing code and performance needs. If you have a React web team, React Native usually wins; for pixel-perfect custom UI, Flutter.",
      },
      {
        q: "Do you handle App Store submission?",
        a: "Yes — developer accounts, screenshots, privacy labels, submission and responding to reviewer feedback.",
      },
      {
        q: "Can you add features after launch?",
        a: "Absolutely. Most mobile clients move onto a monthly retainer for new features, OS updates and monitoring.",
      },
    ],
  },
  {
    slug: "ui-ux-design",
    title: "UI/UX Design",
    short: "Research-led product design and design systems that make complex software feel simple.",
    icon: "pen-tool",
    group: "Build",
    heroTitle: "Interfaces that feel obvious — because we did the hard thinking.",
    heroText:
      "User research, UX strategy, interface design and scalable design systems for SaaS, mobile and marketing sites.",
    problem: {
      title: "Great features die in confusing interfaces.",
      points: [
        "Users churn because onboarding is a maze",
        "Every new screen looks slightly different",
        "Design and engineering speak different languages",
      ],
    },
    solution: {
      title: "Design grounded in evidence and built to scale.",
      points: [
        "Research and usability testing before pixels",
        "A tokenised design system shared with engineering",
        "Prototypes validated with real users every sprint",
      ],
    },
    features: [
      {
        title: "User research",
        text: "Interviews, surveys and analytics reviews that uncover what users actually need.",
      },
      {
        title: "UX architecture",
        text: "Flows, information architecture and wireframes that simplify complex products.",
      },
      {
        title: "Visual design",
        text: "Distinct, premium interfaces that reflect your brand and build trust.",
      },
      {
        title: "Design systems",
        text: "Tokens, components and documentation in Figma mapped 1:1 to code.",
      },
      {
        title: "Prototyping",
        text: "High-fidelity interactive prototypes for testing, fundraising and sales demos.",
      },
      {
        title: "Usability testing",
        text: "Moderated and unmoderated tests with clear, prioritised findings.",
      },
    ],
    deliverables: [
      "Research report",
      "User flows and wireframes",
      "High-fidelity UI",
      "Figma design system",
      "Interactive prototype",
      "Developer handoff",
    ],
    tech: ["Figma", "React", "Tailwind CSS"],
    caseStudies: ["medora-health", "northwind-pay"],
    pricingHint: { from: "Starting from PKR 20,000", note: "Final scope and quote are tailored to your project requirements." },
    faqs: [
      {
        q: "Do you only design, or also build?",
        a: "Both. Many clients start with a design sprint and move into development with the same team — no handoff gap.",
      },
      {
        q: "Can you redesign an existing product?",
        a: "Yes. We start with a UX audit and analytics review, then redesign in stages so you never have a risky big-bang release.",
      },
    ],
  },
  {
    slug: "content-editing",
    title: "Video & Content Editing",
    short: "Short-form video, motion graphics and content production that stops the scroll.",
    icon: "clapperboard",
    group: "Grow",
    letter: "E",
    heroTitle: "Content your audience actually watches to the end.",
    heroText:
      "Reels, shorts, YouTube, product videos and motion graphics — edited for retention, captioned for silent autoplay and cut for every platform.",
    problem: {
      title: "Attention is the most expensive thing on the internet.",
      points: [
        "Raw footage sitting in folders, never published",
        "Videos that lose viewers in the first two seconds",
        "Inconsistent brand look across channels",
      ],
    },
    solution: {
      title: "A content engine with a retention-first edit.",
      points: [
        "Hook-first editing structured around watch-time data",
        "Brand templates for captions, lower-thirds and motion",
        "Weekly delivery cut for Reels, Shorts, TikTok and LinkedIn",
      ],
    },
    features: [
      {
        title: "Short-form video",
        text: "Reels, Shorts and TikToks with punchy hooks, captions and sound design.",
      },
      {
        title: "YouTube editing",
        text: "Long-form edits, thumbnails and chapters optimised for retention and search.",
      },
      {
        title: "Motion graphics",
        text: "Animated explainers, product demos and branded motion systems.",
      },
      {
        title: "Product videos",
        text: "Launch films and feature walkthroughs for your website and ads.",
      },
      {
        title: "Podcast repurposing",
        text: "One episode turned into platform-ready clips, quote cards and social posts.",
      },
      {
        title: "Brand kits",
        text: "Reusable templates so every piece of content looks unmistakably yours.",
      },
    ],
    deliverables: [
      "Monthly content calendar",
      "Edited videos per platform",
      "Thumbnails and covers",
      "Caption files",
      "Brand motion templates",
      "Performance review",
    ],
    tech: ["Figma", "YouTube", "TikTok", "Instagram"],
    caseStudies: ["luma-commerce"],
    pricingHint: { from: "Starting from PKR 15,000 / month", note: "Final scope and quote are tailored to your project requirements." },
    faqs: [
      {
        q: "Do you shoot the footage too?",
        a: "We primarily edit, but coordinate shoots through our production partners in Pakistan, the UAE and the UK when needed.",
      },
      {
        q: "What is the turnaround time?",
        a: "Short-form edits are delivered within 48 hours; long-form within 5 business days.",
      },
    ],
  },
  {
    slug: "social-media",
    title: "Social Media Management",
    short:
      "Strategy, content calendars and community management across every platform that matters.",
    icon: "share",
    group: "Grow",
    letter: "S",
    heroTitle: "Social that builds a brand, not just a posting schedule.",
    heroText:
      "Platform strategy, content creation, community management and reporting for Instagram, LinkedIn, TikTok, X and Facebook.",
    problem: {
      title: "Posting consistently is hard. Posting well is harder.",
      points: [
        "Random posts with no strategy or voice",
        "Comments and DMs left unanswered",
        "No idea which content drives revenue",
      ],
    },
    solution: {
      title: "A strategy-led, always-on social presence.",
      points: [
        "Content pillars and a monthly calendar approved in advance",
        "Daily community management and social listening",
        "Monthly reports tied to reach, leads and sales",
      ],
    },
    features: [
      {
        title: "Platform strategy",
        text: "Audience research and content pillars tailored to each channel.",
      },
      {
        title: "Content creation",
        text: "Carousels, reels, stories and copy produced by our in-house team.",
      },
      {
        title: "Community management",
        text: "We reply to comments and DMs in your brand voice, every day.",
      },
      {
        title: "Influencer partnerships",
        text: "Creator sourcing, briefs and campaign management.",
      },
      {
        title: "Social listening",
        text: "Track brand mentions, competitors and trends worth jumping on.",
      },
      { title: "Reporting", text: "Clear monthly reports focused on what moved the business." },
    ],
    deliverables: [
      "Social strategy",
      "Monthly content calendar",
      "Designed posts and reels",
      "Community management",
      "Monthly analytics report",
    ],
    tech: ["Instagram", "LinkedIn", "TikTok", "Meta"],
    caseStudies: ["luma-commerce", "brightpath-academy"],
    pricingHint: { from: "Starting from PKR 15,000 / month", note: "Final scope and quote are tailored to your project requirements." },
    faqs: [
      {
        q: "Which platforms do you manage?",
        a: "Instagram, Facebook, LinkedIn, TikTok, X, YouTube and Pinterest. We recommend focusing on two or three where your buyers actually are.",
      },
      {
        q: "Do we approve content before it goes live?",
        a: "Always. You approve the full month in a shared calendar before anything is published.",
      },
    ],
  },
  {
    slug: "seo",
    title: "SEO",
    short:
      "Technical SEO, content and authority building that compounds into your cheapest channel.",
    icon: "search",
    group: "Grow",
    letter: "S",
    heroTitle: "Rank for the searches that turn into revenue.",
    heroText:
      "Technical SEO, content strategy, on-page optimisation and digital PR — built to grow organic traffic that converts, month after month.",
    problem: {
      title: "Invisible on Google means invisible to buyers.",
      points: [
        "Competitors outrank you for your own category",
        "Content published without keyword or intent research",
        "Technical issues silently killing crawl and indexation",
      ],
    },
    solution: {
      title: "A compounding organic growth engine.",
      points: [
        "Full technical audit and fixes shipped by our engineers",
        "Topic clusters mapped to buyer intent and pipeline",
        "Authority building through digital PR and partnerships",
      ],
    },
    features: [
      {
        title: "Technical SEO",
        text: "Core Web Vitals, crawl budget, indexation, schema and site architecture.",
      },
      {
        title: "Keyword strategy",
        text: "Intent-mapped keyword research prioritised by revenue potential.",
      },
      {
        title: "Content production",
        text: "Expert-written articles, landing pages and programmatic SEO.",
      },
      { title: "Local SEO", text: "Google Business Profile, citations and local landing pages." },
      {
        title: "Link building",
        text: "White-hat digital PR and editorial links from relevant publications.",
      },
      {
        title: "AI search visibility",
        text: "Optimisation for AI overviews, answer engines and LLM citations.",
      },
    ],
    deliverables: [
      "Technical SEO audit",
      "Keyword and content roadmap",
      "Monthly content",
      "On-page optimisation",
      "Link building",
      "Monthly ranking and traffic report",
    ],
    tech: ["Google Analytics", "Next.js", "WordPress"],
    caseStudies: ["havenly-estates", "brightpath-academy"],
    pricingHint: {
      from: "Starting from PKR 20,000 / month",
      note: "Most clients see meaningful movement in 3–4 months.",
    },
    faqs: [
      {
        q: "How long does SEO take to work?",
        a: "Technical fixes can show impact within weeks. Content-driven growth typically compounds from month three to month six onwards.",
      },
      {
        q: "Do you guarantee #1 rankings?",
        a: "No honest agency can. We commit to a transparent plan, shipped work every month and reporting tied to traffic, leads and revenue.",
      },
    ],
  },
  {
    slug: "digital-marketing",
    title: "Digital Marketing & CRO",
    short: "Full-funnel strategy, analytics and conversion optimisation tied to revenue.",
    icon: "trending-up",
    group: "Grow",
    letter: "M",
    heroTitle: "Marketing that answers to revenue, not vanity metrics.",
    heroText:
      "Go-to-market strategy, funnel design, email and lifecycle marketing, analytics and conversion-rate optimisation for growth-stage companies.",
    problem: {
      title: "Spending on marketing without knowing what works.",
      points: [
        "Channels run in silos with no shared strategy",
        "Attribution is a guess, so budget decisions are too",
        "Traffic arrives, but it does not convert",
      ],
    },
    solution: {
      title: "One strategy, one dashboard, one number to move.",
      points: [
        "A growth plan across channels built around your unit economics",
        "Clean tracking and attribution you can actually trust",
        "Continuous CRO experiments on your highest-value pages",
      ],
    },
    features: [
      {
        title: "Growth strategy",
        text: "Positioning, messaging and channel mix grounded in your numbers.",
      },
      {
        title: "Funnel design",
        text: "Landing pages, lead magnets and nurture flows that convert.",
      },
      {
        title: "Email & lifecycle",
        text: "Onboarding, nurture and win-back automation in HubSpot or Klaviyo.",
      },
      { title: "CRO", text: "Research-backed A/B tests on pages, pricing and checkout." },
      { title: "Analytics", text: "GA4, server-side tracking and dashboards in Looker Studio." },
      { title: "Fractional CMO", text: "Senior marketing leadership without the full-time hire." },
    ],
    deliverables: [
      "Growth strategy",
      "Tracking and attribution setup",
      "Funnel and landing pages",
      "Lifecycle automations",
      "Monthly experiments",
      "Executive dashboard",
    ],
    tech: ["HubSpot", "Google Analytics", "Meta", "Google Ads"],
    caseStudies: ["luma-commerce", "havenly-estates"],
    pricingHint: { from: "Starting from PKR 25,000 / month", note: "Final scope and quote are tailored to your project requirements." },
    faqs: [
      {
        q: "We already have a marketer. Can you work alongside them?",
        a: "Yes — many clients use us as an extension of an in-house marketer, adding execution capacity and specialist skills.",
      },
      {
        q: "What tools do you use for reporting?",
        a: "Usually GA4, Looker Studio and your CRM. You get a live dashboard, not a monthly PDF.",
      },
    ],
  },
  {
    slug: "ai-automation",
    title: "AI & Automation",
    short: "AI agents, chatbots and workflow automation that give your team hours back every week.",
    icon: "sparkles",
    group: "Build",
    letter: "A",
    heroTitle: "Put your busywork on autopilot with AI that actually ships.",
    heroText:
      "Custom AI agents, RAG knowledge assistants, lead-qualification bots and end-to-end workflow automations — deployed in weeks, measured in hours saved.",
    problem: {
      title: "Your team is drowning in repetitive work.",
      points: [
        "Hours lost copying data between tools",
        "Leads waiting hours for a first response",
        "AI pilots that never make it past a demo",
      ],
    },
    solution: {
      title: "Practical AI, integrated where the work happens.",
      points: [
        "Workflow audit to find the highest-ROI automations first",
        "Agents grounded in your data with guardrails and human review",
        "Production deployment with monitoring and cost controls",
      ],
    },
    features: [
      {
        title: "AI agents",
        text: "Task-completing agents for support, sales ops, research and back-office work.",
      },
      {
        title: "Knowledge assistants",
        text: "RAG chatbots trained on your docs, tickets and product data.",
      },
      {
        title: "Workflow automation",
        text: "n8n, Zapier and custom pipelines connecting your CRM, email and ops tools.",
      },
      {
        title: "Lead qualification",
        text: "Instant AI replies on web, WhatsApp and email that book meetings 24/7.",
      },
      {
        title: "Document processing",
        text: "Extract, classify and route invoices, contracts and forms automatically.",
      },
      {
        title: "Evaluation & guardrails",
        text: "Accuracy testing, PII protection and human-in-the-loop controls.",
      },
    ],
    deliverables: [
      "Automation opportunity audit",
      "Agent or workflow build",
      "Integrations with your stack",
      "Evaluation suite",
      "Monitoring dashboard",
      "Team training",
    ],
    tech: ["Python", "Node.js", "n8n", "Zapier", "PostgreSQL", "AWS"],
    caseStudies: ["freightly", "northwind-pay"],
    pricingHint: { from: "Starting from PKR 50,000", note: "Final scope and quote are tailored to your project requirements." },
    faqs: [
      {
        q: "Is our data safe with AI tools?",
        a: "Yes. We use enterprise APIs with zero data retention, deploy in your cloud where required and never train public models on your data.",
      },
      {
        q: "Which AI models do you use?",
        a: "We are model-agnostic and pick the best model for each task on quality, latency and cost — and design so you can switch later.",
      },
      {
        q: "How do you measure ROI?",
        a: "Every automation is scoped with a baseline — hours, response time or cost — and we report against it after launch.",
      },
    ],
  },
  {
    slug: "paid-ads",
    title: "Paid Ads",
    short: "Performance campaigns across Google, Meta, LinkedIn and TikTok, optimised for ROAS.",
    icon: "target",
    group: "Grow",
    letter: "A",
    heroTitle: "Ads that pay for themselves — and then some.",
    heroText:
      "Search, social, shopping and video campaigns managed by performance specialists, with creative testing and tracking built for profitable scale.",
    problem: {
      title: "Ad budgets disappear. Results do not show up.",
      points: [
        "Rising CPMs with the same tired creative",
        "Broken tracking feeding bad data to the algorithm",
        "No clear line between spend and revenue",
      ],
    },
    solution: {
      title: "Profitable scale through creative, data and discipline.",
      points: [
        "Server-side tracking and clean conversion signals",
        "Weekly creative testing produced by our editing team",
        "Budget allocation driven by blended ROAS and CAC",
      ],
    },
    features: [
      { title: "Google Ads", text: "Search, Performance Max, Shopping and YouTube campaigns." },
      {
        title: "Meta Ads",
        text: "Facebook and Instagram prospecting, retargeting and catalog ads.",
      },
      { title: "LinkedIn Ads", text: "B2B account-based campaigns targeting decision makers." },
      { title: "TikTok Ads", text: "Native-feeling creative and Spark Ads for younger audiences." },
      {
        title: "Creative testing",
        text: "New ad concepts every week, produced in-house and tested systematically.",
      },
      {
        title: "Tracking & attribution",
        text: "Conversions API, server-side GTM and offline conversion imports.",
      },
    ],
    deliverables: [
      "Account audit",
      "Campaign strategy",
      "Ad creative",
      "Tracking setup",
      "Weekly optimisation",
      "Live performance dashboard",
    ],
    tech: ["Google Ads", "Meta", "LinkedIn", "TikTok", "Google Analytics"],
    caseStudies: ["luma-commerce", "havenly-estates"],
    pricingHint: { from: "Starting from PKR 15,000 / month", note: "Final scope and quote are tailored to your project requirements." },
    faqs: [
      {
        q: "What is the minimum ad budget?",
        a: "We recommend at least $1,500/month in ad spend per platform to give algorithms enough data to optimise.",
      },
      {
        q: "Do you create the ad creative?",
        a: "Yes. Our editing and design team produces static, carousel and video creative every week as part of management.",
      },
    ],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & DevOps",
    short:
      "Cloud architecture, CI/CD and infrastructure-as-code for reliable, cost-efficient systems.",
    icon: "cloud",
    group: "Build",
    heroTitle: "Infrastructure that scales quietly and costs less.",
    heroText:
      "Cloud architecture, migrations, CI/CD pipelines, Kubernetes and cost optimisation on AWS, Google Cloud and Vercel.",
    problem: {
      title: "Deployments are scary and cloud bills keep climbing.",
      points: [
        "Manual deploys that break production",
        "No monitoring until customers complain",
        "Cloud costs growing faster than revenue",
      ],
    },
    solution: {
      title: "Automated, observable, right-sized infrastructure.",
      points: [
        "Infrastructure-as-code and one-click deployments",
        "Monitoring, alerting and on-call runbooks",
        "FinOps reviews that typically cut cloud spend by 20–40%",
      ],
    },
    features: [
      { title: "Cloud architecture", text: "Well-architected designs on AWS, GCP and Azure." },
      {
        title: "CI/CD",
        text: "Automated testing and zero-downtime deployments with GitHub Actions.",
      },
      { title: "Containers", text: "Docker and Kubernetes for portable, scalable workloads." },
      {
        title: "Infrastructure as code",
        text: "Terraform and Pulumi so environments are reproducible.",
      },
      { title: "Monitoring", text: "Metrics, logs and traces with actionable alerts." },
      {
        title: "Cost optimisation",
        text: "Right-sizing, reserved capacity and architecture changes that cut bills.",
      },
    ],
    deliverables: [
      "Infrastructure audit",
      "Terraform codebase",
      "CI/CD pipelines",
      "Monitoring dashboards",
      "Runbooks",
      "Cost report",
    ],
    tech: ["AWS", "Google Cloud", "Docker", "Kubernetes", "Vercel"],
    caseStudies: ["freightly"],
    pricingHint: { from: "Starting from PKR 25,000", note: "Final scope and quote are tailored to your project requirements." },
    faqs: [
      {
        q: "Can you migrate us without downtime?",
        a: "In most cases, yes. We plan migrations with blue-green or canary strategies and rehearse them on staging first.",
      },
    ],
  },
  {
    slug: "maintenance-support",
    title: "Maintenance & Support",
    short: "SLA-backed monitoring, updates and continuous improvement after launch.",
    icon: "life-buoy",
    group: "Build",
    heroTitle: "Launch is day one. We are here for day one thousand.",
    heroText:
      "Proactive monitoring, security patches, dependency updates, bug fixes and a monthly block of improvement hours — backed by clear SLAs.",
    problem: {
      title: "Software rots when nobody is watching.",
      points: [
        "Outdated dependencies and security vulnerabilities",
        "Bugs pile up with no one to fix them",
        "Original developers long gone",
      ],
    },
    solution: {
      title: "A dedicated team keeping your product healthy.",
      points: [
        "24/7 uptime monitoring and incident response",
        "Monthly updates, patches and performance reviews",
        "Improvement hours for new features and fixes",
      ],
    },
    features: [
      { title: "Uptime monitoring", text: "24/7 checks with alerts routed to our on-call team." },
      {
        title: "Security patches",
        text: "Dependency updates and vulnerability scanning every month.",
      },
      { title: "Bug fixes", text: "Prioritised fixes with response times guaranteed by SLA." },
      { title: "Backups", text: "Automated, tested backups and disaster-recovery plans." },
      { title: "Performance", text: "Regular audits to keep your product fast as it grows." },
      {
        title: "Monthly reports",
        text: "A clear summary of what we fixed, improved and recommend next.",
      },
    ],
    deliverables: [
      "Onboarding audit",
      "Monitoring setup",
      "Monthly maintenance",
      "SLA-backed support",
      "Monthly report",
    ],
    tech: ["GitHub", "AWS", "Vercel", "Docker"],
    caseStudies: ["brightpath-academy"],
    pricingHint: { from: "Starting from PKR 10,000 / month", note: "Final scope and quote are tailored to your project requirements." },
    faqs: [
      {
        q: "Can you maintain software another team built?",
        a: "Yes. We start with a paid onboarding audit so we fully understand the codebase before taking responsibility for it.",
      },
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** The eight services highlighted on the home bento grid. */
export const featuredServiceSlugs = [
  "software-development",
  "website-development",
  "ai-automation",
  "mobile-app-development",
  "seo",
  "paid-ads",
  "ui-ux-design",
  "social-media",
];
