/** Legal copy. Review with counsel before launch. */
export type LegalDoc = {
  title: string;
  updated: string;
  intro: string;
  sections: { id: string; heading: string; body: string[] }[];
};

const company = "Wessmaa Technologies (\u201cWessmaa\u201d, \u201cwe\u201d, \u201cus\u201d)";

export const privacyPolicy: LegalDoc = {
  title: "Privacy Policy",
  updated: "2026-09-01",
  intro: `This policy explains how ${company} collects, uses and protects personal data when you visit wessmaa.com or work with us. We follow the principles of the EU GDPR, the UK GDPR, the CCPA and Pakistan's data-protection requirements.`,
  sections: [
    {
      id: "data-we-collect",
      heading: "Data we collect",
      body: [
        "Information you give us: your name, email, phone, company, project details and any files you upload (for example a CV or brief).",
        "Information collected automatically: device and browser type, pages visited, referring URL and approximate location, collected through cookies and privacy-friendly analytics — only after you consent where required.",
      ],
    },
    {
      id: "how-we-use",
      heading: "How we use your data",
      body: [
        "To reply to enquiries, prepare proposals and deliver services.",
        "To process job applications.",
        "To send our newsletter if you subscribe — you can unsubscribe at any time.",
        "To improve our website and measure marketing performance, based on your consent.",
      ],
    },
    {
      id: "legal-bases",
      heading: "Legal bases",
      body: [
        "We rely on consent (analytics and marketing cookies, newsletter), contract (delivering services), legitimate interests (responding to enquiries, securing our systems) and legal obligation (accounting and tax records).",
      ],
    },
    {
      id: "sharing",
      heading: "Sharing and processors",
      body: [
        "We never sell personal data. We share it only with trusted processors that help us run our business — such as hosting, email, scheduling and CRM providers — under written data-processing agreements.",
        "Where data is transferred outside your country, we use appropriate safeguards such as Standard Contractual Clauses.",
      ],
    },
    {
      id: "retention",
      heading: "Retention",
      body: [
        "Enquiries are kept for up to 24 months, job applications for 12 months, and client records for as long as required by law (typically 6 years).",
      ],
    },
    {
      id: "your-rights",
      heading: "Your rights",
      body: [
        "You can request access, correction, deletion, restriction or portability of your data, and object to processing. California residents may also request to know and opt out of the sale or sharing of personal information — we do not sell or share it.",
        "Email privacy@wessmaa.com and we will respond within 30 days. You may also complain to your local data-protection authority.",
      ],
    },
    {
      id: "security",
      heading: "Security",
      body: [
        "We use encryption in transit, access controls, least-privilege principles and regular reviews to protect your data.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      body: [
        "Wessmaa Technologies, National University of Modern Languages (NUML), H-9/4, Islamabad 44000, Pakistan · privacy@wessmaa.com",
      ],
    },
  ],
};

export const terms: LegalDoc = {
  title: "Terms of Service",
  updated: "2026-09-01",
  intro: `These terms govern your use of wessmaa.com and any services provided by ${company}. Project work is also governed by the statement of work (SOW) or master services agreement signed with each client, which takes precedence where they differ.`,
  sections: [
    {
      id: "use-of-site",
      heading: "Use of this website",
      body: [
        "You may browse and share content from this website for personal and business research. You must not misuse the site, attempt unauthorised access or copy it for commercial purposes.",
      ],
    },
    {
      id: "services",
      heading: "Services and proposals",
      body: [
        "Estimates generated on this website are indicative only. A binding price, scope and timeline are set out in a signed proposal or SOW.",
      ],
    },
    {
      id: "payments",
      heading: "Fees and payment",
      body: [
        "Fixed-price projects are invoiced in milestones. Retainers and dedicated teams are invoiced monthly in advance. Invoices are payable within 14 days unless agreed otherwise.",
      ],
    },
    {
      id: "ip",
      heading: "Intellectual property",
      body: [
        "On full payment, you own the custom code, designs and content we create for you. We retain ownership of our pre-existing tools and libraries and grant you a perpetual licence to use them within your project.",
        "We may reference your project in our portfolio unless you ask us not to or an NDA applies.",
      ],
    },
    {
      id: "confidentiality",
      heading: "Confidentiality",
      body: [
        "Both parties keep each other's confidential information private and use it only to perform the engagement. We are happy to sign a mutual NDA before discovery.",
      ],
    },
    {
      id: "warranties",
      heading: "Warranties and liability",
      body: [
        "We warrant that services will be performed with reasonable skill and care. Delivered work includes a 30-day warranty for defects. Our total liability is limited to the fees paid in the three months preceding a claim, except where the law does not allow such limits.",
      ],
    },
    {
      id: "termination",
      heading: "Termination",
      body: [
        "Either party may end an engagement with 30 days' written notice. You pay for work completed up to the termination date and receive all work product paid for.",
      ],
    },
    {
      id: "law",
      heading: "Governing law",
      body: [
        "These terms are governed by the laws of Pakistan, and disputes are subject to the courts of Islamabad, unless your agreement specifies otherwise.",
      ],
    },
  ],
};

export const cookiePolicy: LegalDoc = {
  title: "Cookie Policy",
  updated: "2026-09-01",
  intro:
    "This policy explains which cookies and similar technologies wessmaa.com uses and how you can control them. Non-essential cookies are only set after you give consent in our cookie banner.",
  sections: [
    {
      id: "what-are-cookies",
      heading: "What are cookies?",
      body: [
        "Cookies are small text files stored on your device. They help websites work, remember your preferences and understand how visitors use them.",
      ],
    },
    {
      id: "essential",
      heading: "Strictly necessary",
      body: [
        "Required for the site to function — for example remembering your cookie choice (stored locally as wessmaa:cookie-consent until you change it). These cannot be switched off.",
      ],
    },
    {
      id: "analytics",
      heading: "Analytics",
      body: [
        "Help us understand which pages are useful so we can improve them — for example privacy-friendly analytics with anonymised IPs (up to 13 months). Only set with your consent.",
      ],
    },
    {
      id: "marketing",
      heading: "Marketing",
      body: [
        "Used to measure the performance of our advertising on platforms such as Google, Meta and LinkedIn. Only set with your consent.",
      ],
    },
    {
      id: "manage",
      heading: "Managing your choices",
      body: [
        "You can change your choice at any time with the “Cookie settings” link in the footer, or delete cookies in your browser settings. Blocking some cookies may affect how the site works.",
      ],
    },
    {
      id: "contact",
      heading: "Contact",
      body: ["Questions about cookies? Email privacy@wessmaa.com."],
    },
  ],
};
