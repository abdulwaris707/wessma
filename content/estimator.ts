/** Data model for the /quote project estimator. Prices in USD. */
export const estimator = {
  projectTypes: [
    {
      id: "website",
      label: "Marketing website",
      text: "5–15 pages, CMS, SEO-ready",
      base: 300,
      icon: "globe",
    },
    {
      id: "ecommerce",
      label: "E-commerce store",
      text: "Catalogue, checkout, payments",
      base: 600,
      icon: "shopping-bag",
    },
    {
      id: "webapp",
      label: "Web app / SaaS",
      text: "Auth, dashboards, APIs",
      base: 1200,
      icon: "layout-dashboard",
    },
    {
      id: "mobile",
      label: "Mobile app",
      text: "iOS + Android (Flutter / RN)",
      base: 1000,
      icon: "smartphone",
    },
    {
      id: "automation",
      label: "AI & automation",
      text: "Agents, chatbots, workflows",
      base: 400,
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
    { id: "auth", label: "User accounts & login", price: 100 },
    { id: "payments", label: "Payments & subscriptions", price: 150 },
    { id: "admin", label: "Admin dashboard", price: 200 },
    { id: "cms", label: "Content management (CMS)", price: 100 },
    { id: "integrations", label: "Third-party integrations", price: 150 },
    { id: "ai", label: "AI features (chat, search, generation)", price: 250 },
    { id: "multilang", label: "Multi-language", price: 100 },
    { id: "analytics", label: "Analytics & reporting", price: 100 },
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
    { id: "seo", label: "SEO", monthly: 100 },
    { id: "social", label: "Social media management", monthly: 100 },
    { id: "ads", label: "Paid ads management", monthly: 100 },
    { id: "content", label: "Content & video editing", monthly: 80 },
    { id: "automation", label: "Marketing automation", monthly: 80 },
  ],
  timelines: [
    { id: "flexible", label: "Flexible", text: "Best value", multiplier: 0.95 },
    { id: "standard", label: "Standard", text: "8–14 weeks", multiplier: 1 },
    { id: "rush", label: "Rush", text: "Dedicated fast-track squad", multiplier: 1.25 },
  ],
};
