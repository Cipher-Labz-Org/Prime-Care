/** Meta Pixel ID — base init lives in index.html; use these helpers from React. */
export const META_PIXEL_ID = "1143492241385331";

type Fbq = (
  command: "track" | "init",
  eventOrId: string,
  params?: Record<string, unknown>,
) => void;

function getFbq(): Fbq | undefined {
  if (typeof window === "undefined") return undefined;
  const fbq = (window as Window & { fbq?: Fbq }).fbq;
  return typeof fbq === "function" ? fbq : undefined;
}

export function trackMetaPageView(): void {
  getFbq()?.("track", "PageView");
}

/** Standard event for contact form and similar lead capture. */
export function trackMetaLead(contentName: string): void {
  getFbq()?.("track", "Lead", { content_name: contentName });
}

/** Standard event for contact / enquiry actions (optional alias for reporting). */
export function trackMetaContact(contentName: string): void {
  getFbq()?.("track", "Contact", { content_name: contentName });
}

export function trackMetaWhatsAppClick(): void {
  trackMetaLead("whatsapp_click");
}

export function isWaMeLink(href: string): boolean {
  try {
    const url = new URL(href, window.location.origin);
    return /wa\.me$/i.test(url.hostname) || url.hostname === "api.whatsapp.com";
  } catch {
    return /wa\.me/i.test(href);
  }
}
