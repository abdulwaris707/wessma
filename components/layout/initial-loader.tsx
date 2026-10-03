import { siteConfig } from "@/config/site";
import Image from "next/image";

/**
 * Server-rendered first-load overlay. It is deliberately plain HTML/CSS so it
 * can paint before the application JavaScript has loaded or hydrated.
 */
export function InitialLoader() {
  return (
    <div id="initial-loader" role="status" aria-live="polite" aria-label="Preparing your experience">
      <div className="initial-loader__content">
        <Image
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
        <span className="sr-only">Loading {siteConfig.name}</span>
      </div>
    </div>
  );
}

/**
 * Runs without waiting for React hydration. Fonts are the only critical asset
 * for the first layout; the timeout guarantees that the overlay cannot stick.
 */
export function InitialLoaderScript() {
  const script = `(() => {
    const loader = document.getElementById("initial-loader");
    const shell = document.getElementById("app-shell");
    if (!loader || !shell) return;
    let complete = false;
    const reveal = () => {
      if (complete) return;
      complete = true;
      window.clearTimeout(timeout);
      document.documentElement.dataset.appReady = "true";
      loader.classList.add("is-exiting");
      window.setTimeout(() => loader.remove(), 300);
    };
    const nextFrame = () => requestAnimationFrame(() => requestAnimationFrame(reveal));
    const timeout = window.setTimeout(reveal, 3200);
    const fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
    Promise.race([fonts, new Promise(resolve => window.setTimeout(resolve, 1200))]).then(nextFrame);
    window.addEventListener("load", nextFrame, { once: true });
  })();`;

  return <script id="initial-loader-script" dangerouslySetInnerHTML={{ __html: script }} />;
}
