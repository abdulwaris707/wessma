import { Fragment } from "react";
import type { LegalDoc } from "@/content/legal";
import { PageHero } from "@/components/shared/page-hero";
import { formatDate } from "@/lib/utils";

/** Shared layout for privacy, terms and cookie pages. */
export function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  return (
    <>
      <PageHero
        align="left"
        breadcrumbs={[{ label: doc.title, href: path }]}
        eyebrow="Legal"
        title={doc.title}
        subtitle={`Last updated ${formatDate(doc.updated)}`}
      />
      <section className="bg-white pb-24">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-12">
          <aside className="hidden lg:col-span-3 lg:block">
            <nav aria-label="Sections" className="sticky top-28">
              <p className="text-muted-ink text-xs font-semibold tracking-[0.12em] uppercase">
                Contents
              </p>
              <ol className="border-line mt-4 grid gap-1 border-l">
                {doc.sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="text-muted-ink hover:text-ink -ml-px block border-l-2 border-transparent py-1.5 pl-4 text-sm transition-colors hover:border-orange-500"
                    >
                      {i + 1}. {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <article className="prose-wessmaa max-w-[72ch] lg:col-span-9">
            <p className="text-lead">{doc.intro}</p>
            {doc.sections.map((s, i) => (
              <Fragment key={s.id}>
                <h2 id={s.id} className="scroll-mt-28">
                  {i + 1}. {s.heading}
                </h2>
                {s.body.map((b) => (
                  <p key={b}>{b}</p>
                ))}
              </Fragment>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
