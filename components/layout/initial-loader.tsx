import Image from "next/image";
import { siteConfig } from "@/config/site";

const loaderStyles = `
  #initial-loader{position:fixed;z-index:200;inset:0;display:grid;place-items:center;overflow:hidden;background:#fafaf7;color:#0a1f44;transition:opacity 280ms cubic-bezier(.22,1,.36,1),visibility 280ms cubic-bezier(.22,1,.36,1)}
  #initial-loader.is-exiting{visibility:hidden;opacity:0}
  .initial-loader__content{display:grid;justify-items:center;gap:.875rem;padding:1.5rem;text-align:center}
  .initial-loader__logo{width:3rem;height:auto}
  .initial-loader__line{width:3.25rem;height:2px;overflow:hidden;border-radius:999px;background:rgb(10 31 68 / .12)}
  .initial-loader__line span{display:block;width:42%;height:100%;border-radius:inherit;background:#f97316;animation:initial-loader-line 1.1s ease-in-out infinite alternate}
  @keyframes initial-loader-line{to{transform:translateX(138%)}}
  @media (prefers-reduced-motion:reduce){#initial-loader{transition:none}.initial-loader__line span{animation:none;transform:translateX(70%)}}
`;

/** Server-rendered first-load overlay that paints before React hydrates. */
export function InitialLoader() {
  return (
    <>
      <style id="initial-loader-styles">{loaderStyles}</style>
      <div
        id="initial-loader"
        role="status"
        aria-live="polite"
        aria-label={`Preparing ${siteConfig.name}`}
      >
        <div className="initial-loader__content">
          <Image
            id="initial-loader-logo"
            src="/logo-mark.png"
            alt=""
            width="403"
            height="440"
            priority
            className="initial-loader__logo"
          />
          <div className="initial-loader__line" aria-hidden="true">
            <span />
          </div>
        </div>
      </div>
    </>
  );
}

/** Waits for the mounted app, above-fold hero, fonts and logo before reveal. */
export function InitialLoaderScript() {
  const script = `(() => {
    const loader = document.getElementById("initial-loader"), shell = document.getElementById("app-shell"), logo = document.getElementById("initial-loader-logo");
    if (!loader || !shell) return;
    const home = location.pathname === "/" || location.pathname === "";
    let appMounted = false, heroMounted = !home, fontsReady = false, logoReady = !logo, finished = false;
    const finish = () => { if (finished) return; finished = true; clearTimeout(fallback); document.documentElement.dataset.appReady = "true"; loader.classList.add("is-exiting"); setTimeout(() => loader.remove(), 320); };
    const paint = () => requestAnimationFrame(() => requestAnimationFrame(finish));
    const ready = () => { if (appMounted && heroMounted && fontsReady && logoReady) paint(); };
    const fontDeadline = setTimeout(() => { fontsReady = true; ready(); }, 3500);
    const logoDeadline = setTimeout(() => { logoReady = true; ready(); }, 4000);
    const fallback = setTimeout(finish, 9000);
    addEventListener("wessmaa:app-mounted", () => { appMounted = true; ready(); }, { once: true });
    addEventListener("wessmaa:hero-mounted", () => { heroMounted = true; ready(); }, { once: true });
    const fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    fonts.then(() => { clearTimeout(fontDeadline); fontsReady = true; ready(); }).catch(() => { fontsReady = true; ready(); });
    if (logo) { const completeLogo = () => { clearTimeout(logoDeadline); logoReady = true; ready(); }; if (logo.complete) completeLogo(); else { logo.addEventListener("load", completeLogo, { once: true }); logo.addEventListener("error", completeLogo, { once: true }); } }
  })();`;
  return <script id="initial-loader-script" dangerouslySetInnerHTML={{ __html: script }} />;
}
