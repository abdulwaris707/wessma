import { brandIcons, type BrandIconName } from "@/lib/brand-icons";
import { cn } from "@/lib/utils";

/** Maps human-readable tech names used in content → simple-icons slugs. */
const aliases: Record<string, BrandIconName> = {
  React: "react",
  "React Native": "react",
  "Next.js": "nextdotjs",
  "Node.js": "nodedotjs",
  Python: "python",
  Flutter: "flutter",
  TypeScript: "typescript",
  PostgreSQL: "postgresql",
  Docker: "docker",
  Kubernetes: "kubernetes",
  Figma: "figma",
  "Google Ads": "googleads",
  Meta: "meta",
  "Meta Ads": "meta",
  Shopify: "shopify",
  WordPress: "wordpress",
  "Tailwind CSS": "tailwindcss",
  Vercel: "vercel",
  "Google Cloud": "googlecloud",
  Firebase: "firebase",
  Stripe: "stripe",
  X: "x",
  Instagram: "instagram",
  GitHub: "github",
  Dribbble: "dribbble",
  Facebook: "facebook",
  YouTube: "youtube",
  Kotlin: "kotlin",
  Swift: "swift",
  MongoDB: "mongodb",
  n8n: "n8n",
  Zapier: "zapier",
  HubSpot: "hubspot",
  TikTok: "tiktok",
  "Google Analytics": "googleanalytics",
  Supabase: "supabase",
  Laravel: "laravel",
  LinkedIn: "linkedin",
  linkedin: "linkedin",
  instagram: "instagram",
  x: "x",
  tiktok: "tiktok",
  dribbble: "dribbble",
  github: "github",
};

/** AWS is not in simple-icons; we ship a compact wordmark glyph instead. */
function AwsGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden fill="currentColor">
      <path d="M6.76 10.3c0 .3.03.53.09.7.06.17.14.36.25.56.04.06.05.12.05.17 0 .07-.04.15-.14.22l-.47.31a.36.36 0 0 1-.19.07c-.08 0-.15-.04-.22-.1a2.3 2.3 0 0 1-.27-.35 5.8 5.8 0 0 1-.23-.44c-.58.69-1.31 1.03-2.19 1.03-.63 0-1.13-.18-1.49-.54-.37-.36-.55-.84-.55-1.43 0-.64.22-1.15.68-1.54.46-.39 1.06-.58 1.83-.58.25 0 .51.02.78.06.27.04.55.1.85.16v-.54c0-.56-.12-.96-.35-1.19-.24-.23-.64-.34-1.21-.34-.26 0-.53.03-.8.1-.27.06-.54.15-.8.25l-.26.1a.46.46 0 0 1-.12.02c-.1 0-.16-.08-.16-.23v-.36c0-.12.02-.2.05-.26a.55.55 0 0 1 .22-.16c.26-.14.57-.25.94-.34a4.5 4.5 0 0 1 1.16-.14c.89 0 1.53.2 1.95.6.41.4.62 1.01.62 1.84v2.42Zm-3.02 1.13c.24 0 .49-.04.76-.13.27-.09.5-.25.7-.47.12-.14.2-.29.25-.47.04-.18.07-.39.07-.64v-.31a6.3 6.3 0 0 0-.68-.13 5.6 5.6 0 0 0-.7-.04c-.5 0-.86.1-1.1.3-.25.2-.36.48-.36.85 0 .35.09.61.27.78.18.18.44.26.79.26Zm5.96.8c-.13 0-.22-.02-.28-.07-.06-.04-.11-.15-.16-.29L7.52 6.13a1.3 1.3 0 0 1-.07-.3c0-.12.06-.19.18-.19h.73c.14 0 .24.02.29.07.06.04.1.15.15.29l1.25 4.93 1.16-4.93c.04-.15.08-.25.14-.29a.5.5 0 0 1 .3-.07h.6c.14 0 .24.02.3.07.06.04.11.15.14.29l1.18 4.99 1.29-4.99c.04-.15.1-.25.15-.29a.48.48 0 0 1 .29-.07h.7c.12 0 .19.06.19.19 0 .04 0 .08-.02.12l-.04.18-1.8 5.77c-.05.15-.1.25-.16.29a.49.49 0 0 1-.28.07h-.64c-.14 0-.24-.02-.3-.07-.06-.05-.11-.15-.14-.3L12.16 7.2l-1.15 4.8c-.04.15-.08.25-.14.3-.06.05-.16.07-.3.07h-.64Zm9.62.2c-.39 0-.78-.04-1.15-.13a3.4 3.4 0 0 1-.87-.3.54.54 0 0 1-.23-.2.52.52 0 0 1-.04-.2v-.38c0-.15.06-.23.17-.23.04 0 .09 0 .13.02l.18.07c.25.11.52.2.81.26.3.06.58.09.88.09.47 0 .83-.08 1.08-.24a.8.8 0 0 0 .38-.71.73.73 0 0 0-.2-.52c-.14-.14-.4-.27-.77-.39l-1.11-.35c-.56-.17-.97-.43-1.23-.77a1.8 1.8 0 0 1-.38-1.1c0-.32.07-.6.2-.84.14-.24.32-.45.55-.62.23-.18.49-.31.8-.4.3-.09.62-.13.96-.13.17 0 .34 0 .51.03l.5.08.44.13c.13.05.24.1.31.14.1.06.18.12.22.19.05.06.07.14.07.25v.35c0 .15-.06.23-.17.23a.76.76 0 0 1-.28-.09 3.4 3.4 0 0 0-1.43-.29c-.43 0-.76.07-1 .21-.23.14-.35.36-.35.66 0 .21.08.39.23.53.15.14.43.28.83.41l1.09.35c.55.17.95.42 1.19.73.24.31.35.67.35 1.07 0 .33-.07.62-.2.88-.13.26-.32.49-.56.67-.24.19-.52.33-.85.43-.35.11-.71.16-1.1.16Z" />
      <path d="M21.24 15.94c-2.57 1.9-6.3 2.9-9.51 2.9-4.5 0-8.55-1.66-11.62-4.43-.24-.22-.03-.52.26-.35a15.8 15.8 0 0 0 11.63 3.43c2.82 0 5.94-.59 8.8-1.8.43-.19.8.28.44.25Zm1.07-1.22c-.33-.42-2.18-.2-3.01-.1-.25.03-.29-.19-.06-.35 1.47-1.04 3.9-.74 4.18-.39.28.35-.08 2.78-1.46 3.94-.21.18-.41.08-.32-.15.31-.78 1-2.52.67-2.95Z" />
    </svg>
  );
}

export function BrandIcon({
  name,
  className,
  colored = false,
}: {
  name: string;
  className?: string;
  colored?: boolean;
}) {
  if (name === "AWS" || name === "Amazon Web Services")
    return <AwsGlyph className={cn("size-6", colored && "text-[#232F3E]", className)} />;
  const lower = name.toLowerCase();
  const key =
    aliases[name] ?? (lower in brandIcons ? (lower as keyof typeof brandIcons) : undefined);
  const icon = key ? brandIcons[key] : undefined;
  if (!icon) return null;
  return (
    <svg
      viewBox="0 0 24 24"
      role="img"
      aria-label={icon.title}
      className={cn("size-6", className)}
      fill={colored ? (icon.hex === "#000000" ? "#0A1F44" : icon.hex) : "currentColor"}
    >
      <path d={icon.path} />
    </svg>
  );
}
