import Image from "next/image";
import { siteConfig } from "@/config/site";

const loaderStyles = `
  #app-shell{visibility:hidden;opacity:0}
  html[data-app-ready="true"] #app-shell{visibility:visible;opacity:1;transition:opacity 280ms cubic-bezier(.22,1,.36,1)}
  #initial-loader{position:fixed;z-index:200;inset:0;display:grid;place-items:center;overflow:hidden;background:#f8fafc;color:#0a1f44;transition:opacity 280ms cubic-bezier(.22,1,.36,1),visibility 280ms cubic-bezier(.22,1,.36,1)}
  #initial-loader.is-exiting{visibility:hidden;opacity:0}
  .initial-loader__content{display:grid;justify-items:center;gap:1rem;padding:1.5rem;text-align:center}
  .initial-loader__logo{width:2.5rem;height:auto}
  .initial-loader__indicator{position:relative;width:2rem;height:2rem;border:2px solid rgb(10 31 68 / .16);border-top-color:#0a1f44;border-right-color:#f97316;border-radius:999px;animation:initial-loader-spin 800ms linear infinite}
  .initial-loader__indicator span{position:absolute;inset:.5rem;border-radius:inherit;background:#f97316;opacity:.9;animation:initial-loader-pulse 1.2s ease-in-out infinite}
  .initial-loader__content p{margin:0;color:#64748b;font:600 .8125rem/1.3 system-ui,sans-serif;letter-spacing:.04em}
  @keyframes initial-loader-spin{to{transform:rotate(360deg)}}
  @keyframes initial-loader-pulse{50%{transform:scale(.7);opacity:.45}}
  @media (prefers-reduced-motion:reduce){#app-shell,#initial-loader{transition:none}.initial-loader__indicator,.initial-loader__indicator span{animation:none}}
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
          <div className="initial-loader__indicator" aria-hidden="true">
            <span />
          </div>
          <p>Preparing your experience</p>
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
