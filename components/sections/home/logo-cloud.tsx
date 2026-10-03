import { clients } from "@/content/company";
import { Marquee } from "@/components/magicui/marquee";
import { ClientLogo } from "@/components/shared/client-logo";

/** Infinite grayscale logo marquee — colour on hover. */
export function LogoCloud() {
  return (
    <section aria-label="Clients" className="border-line relative border-y bg-white py-10">
      <p className="container-page text-muted-ink mb-6 text-center text-sm font-medium">
        Supporting startups and small businesses in Pakistan and abroad
      </p>
      <div className="relative [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]">
        <Marquee className="[--duration:45s] [--gap:0.5rem] max-sm:[--duration:30s]" repeat={2}>
          {clients.map((c, i) => (
            <ClientLogo key={c} name={c} index={i} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}
