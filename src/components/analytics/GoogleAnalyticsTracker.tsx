import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { trackGoogleTagsPageView } from "../../utils/googleAnalytics";

/** SPA route changes — first page_view is sent by gtag config in index.html. */
export default function GoogleAnalyticsTracker() {
  const { pathname, search } = useLocation();
  const skipInitial = useRef(true);

  useEffect(() => {
    if (skipInitial.current) {
      skipInitial.current = false;
      return;
    }
    trackGoogleTagsPageView(`${pathname}${search}`);
  }, [pathname, search]);

  return null;
}
