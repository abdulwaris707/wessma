import { CalendarCheck, Check, Clock, Video } from "lucide-react";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { team } from "@/content/company";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/shared/page-hero";
import { BorderBeam } from "@/components/magicui/border-beam";

export const metadata = buildMetadata({
  title: "Book a Call",
  description: "Book a free 30-minute discovery call with a Wessmaa strategist.",
  path: "/book",
});

export default function BookPage() {
  const agenda = [
    "Your goals and current situation",
    "What to build first — and what to skip",
    "Realistic budget and timeline ranges",
    "The team we would put on your project",
  ];
  const embed = `${siteConfig.bookingUrl}?embed=true&theme=light&brandColor=%23F97316&layout=month_view`;
  return (
    <>
      <PageHero
        breadcrumbs={[{ label: "Book a call", href: "/book" }]}
        eyebrow="Book a call"
        title={
          <>
            30 minutes that could <em>change</em> your roadmap.
          </>
        }
        subtitle="A free, no-pressure discovery call with a senior strategist. You'll leave with clear next steps — whether you work with us or not."
      />
      <section className="bg-white pb-24">
        <div className="container-page grid grid-cols-1 gap-6 lg:grid-cols-12">
          <aside className="grid content-start gap-6 lg:col-span-4">
            <div className="border-line bg-surface-alt rounded-[28px] border p-7">
              <div className="flex -space-x-3">
                {team.slice(0, 4).map((m) => (
                  <Image
                    key={m.name}
                    src={m.image}
                    alt={m.name}
                    width={48}
                    height={48}
                    className="size-12 rounded-full border-2 border-white object-cover object-top"
                  />
                ))}
              </div>
              <p className="font-display text-navy-950 mt-5 text-xl font-bold">Discovery call</p>
              <ul className="text-body mt-4 grid gap-2.5 text-sm">
                <li className="flex items-center gap-2">
                  <Clock className="size-4 text-orange-500" aria-hidden /> 30 minutes
                </li>
                <li className="flex items-center gap-2">
                  <Video className="size-4 text-orange-500" aria-hidden /> Google Meet or Zoom
                </li>
                <li className="flex items-center gap-2">
                  <CalendarCheck className="size-4 text-orange-500" aria-hidden />{" "}
                  {siteConfig.contact.hours}
                </li>
              </ul>
            </div>
            <div className="border-line rounded-[28px] border bg-white p-7">
              <p className="text-ink text-sm font-semibold">What we&apos;ll cover</p>
              <ul className="mt-4 grid gap-3">
                {agenda.map((a) => (
                  <li key={a} className="text-body flex gap-3 text-[0.9375rem]">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-orange-50 text-orange-700">
                      <Check className="size-3" aria-hidden />
                    </span>
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
          <div className="border-line relative overflow-hidden rounded-[28px] border bg-white shadow-[var(--shadow-lift)] lg:col-span-8">
            <BorderBeam size={260} duration={12} />
            <div className="border-line bg-surface-alt flex items-center gap-2 border-b px-5 py-3">
              <span className="size-2.5 rounded-full bg-slate-300" />
              <span className="size-2.5 rounded-full bg-slate-300" />
              <span className="size-2.5 rounded-full bg-orange-400" />
              <p className="text-muted-ink ml-3 truncate text-xs">Pick a time that works for you</p>
            </div>
            <iframe
              title="Book a discovery call with Wessmaa"
              src={embed}
              loading="lazy"
              className="h-[720px] w-full bg-white"
              data-lenis-prevent
            />
            <p className="border-line text-muted-ink border-t px-5 py-3 text-xs">
              Calendar not loading?{" "}
              <a
                href={siteConfig.bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="text-navy-800 font-semibold underline underline-offset-4"
              >
                Open the booking page
              </a>{" "}
              or email {siteConfig.contact.email}.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
