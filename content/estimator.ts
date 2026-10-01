/** Data model for the /quote project estimator. Prices in USD. */
export const estimator = {
  projectTypes: [
    {
      id: "website",
      label: "Marketing website",
      text: "5–15 pages, CMS, SEO-ready",
      base: 4000,
      icon: "globe",
    },
    {
      id: "ecommerce",
      label: "E-commerce store",
      text: "Catalogue, checkout, payments",
      base: 9000,
      icon: "shopping-bag",
    },
    {
      id: "webapp",
      label: "Web app / SaaS",
      text: "Auth, dashboards, APIs",
      base: 18000,
      icon: "layout-dashboard",
    },
    {
      id: "mobile",
      label: "Mobile app",
      text: "iOS + Android (Flutter / RN)",
      base: 16000,
      icon: "smartphone",
    },
    {
      id: "automation",
      label: "AI & automation",
      text: "Agents, chatbots, workflows",
      base: 6000,
      icon: "bot",
    },
    {
      id: "growth",
      label: "Growth only",
      text: "SEO, social, ads for an existing product",
      base: 0,
      icon: "trending-up",
    },
  ],
  features: [
    { id: "auth", label: "User accounts & login", price: 1500 },
    { id: "payments", label: "Payments & subscriptions", price: 2500 },
    { id: "admin", label: "Admin dashboard", price: 3000 },
    { id: "cms", label: "Content management (CMS)", price: 1200 },
    { id: "integrations", label: "Third-party integrations", price: 2000 },
    { id: "ai", label: "AI features (chat, search, generation)", price: 4000 },
    { id: "multilang", label: "Multi-language", price: 1500 },
    { id: "analytics", label: "Analytics & reporting", price: 1800 },
  ],
  design: [
    {
      id: "template",
      label: "Refined template",
      text: "Fastest route, customised to your brand",
      multiplier: 0.85,
    },
    { id: "custom", label: "Custom design", text: "Bespoke UI designed in Figma", multiplier: 1 },
    {
      id: "premium",
      label: "Premium brand experience",
      text: "Custom UI, motion, illustrations",
      multiplier: 1.3,
    },
  ],
  growth: [
    { id: "seo", label: "SEO", monthly: 1200 },
    { id: "social", label: "Social media management", monthly: 1000 },
    { id: "ads", label: "Paid ads management", monthly: 1100 },
    { id: "content", label: "Content & video editing", monthly: 900 },
    { id: "automation", label: "Marketing automation", monthly: 700 },
  ],
  timelines: [
    { id: "flexible", label: "Flexible", text: "Best value", multiplier: 0.95 },
    { id: "standard", label: "Standard", text: "8–14 weeks", multiplier: 1 },
    { id: "rush", label: "Rush", text: "Dedicated fast-track squad", multiplier: 1.25 },
  ],
};
