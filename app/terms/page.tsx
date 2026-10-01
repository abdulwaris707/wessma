import { terms } from "@/content/legal";
import { buildMetadata } from "@/lib/seo";
import { LegalPage } from "@/components/legal/legal-page";

export const metadata = buildMetadata({
  title: "Terms of Service",
  description: "The terms that govern use of the Wessmaa website and services.",
  path: "/terms",
});

export default function Page() {
  return <LegalPage doc={terms} path="/terms" />;
}
