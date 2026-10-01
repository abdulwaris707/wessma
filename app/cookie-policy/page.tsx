import { cookiePolicy } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata = buildMetadata({
  title: "Cookie Policy",
  description: "Which cookies Wessmaa uses and how to control them.",
  path: "/cookie-policy",
});

export default function Page() {
  return <LegalPage doc={cookiePolicy} path="/cookie-policy" />;
}
