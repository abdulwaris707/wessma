import { privacyPolicy } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata = buildMetadata({
  title: "Privacy Policy",
  description: "How Wessmaa collects, uses and protects your personal data.",
  path: "/privacy-policy",
});

export default function Page() {
  return <LegalPage doc={privacyPolicy} path="/privacy-policy" />;
}
