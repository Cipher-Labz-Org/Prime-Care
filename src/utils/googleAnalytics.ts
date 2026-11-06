export const GA_MEASUREMENT_ID = "G-C77NBDEZ6N";
export const GOOGLE_ADS_ID = "AW-18551547737";

type Gtag = (...args: unknown[]) => void;

function getGtag(): Gtag | undefined {
  if (typeof window === "undefined") return undefined;
  const gtag = (window as Window & { gtag?: Gtag }).gtag;
  return typeof gtag === "function" ? gtag : undefined;
}

function pageViewConfig(pagePath: string, pageTitle?: string) {
  return {
    page_path: pagePath,
    ...(pageTitle ? { page_title: pageTitle } : {}),
  };
}

/** Send a page_view for SPA navigations (initial hit is from index.html config). */
export function trackGa4PageView(pagePath: string, pageTitle?: string): void {
  getGtag()?.("config", GA_MEASUREMENT_ID, pageViewConfig(pagePath, pageTitle));
}

/** Keep Google Ads tag in sync on SPA route changes. */
export function trackGoogleAdsPageView(pagePath: string, pageTitle?: string): void {
  getGtag()?.("config", GOOGLE_ADS_ID, pageViewConfig(pagePath, pageTitle));
}

export function trackGoogleTagsPageView(pagePath: string, pageTitle?: string): void {
  trackGa4PageView(pagePath, pageTitle);
  trackGoogleAdsPageView(pagePath, pageTitle);
}

export function trackGa4GenerateLead(method: string): void {
  getGtag()?.("event", "generate_lead", { method });
}
