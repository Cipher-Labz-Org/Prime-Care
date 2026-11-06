import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  isWaMeLink,
  trackMetaPageView,
  trackMetaWhatsAppClick,
} from "../../utils/metaPixel";

/**
 * SPA: fire PageView on client-side route changes (initial PageView is in index.html).
 * Delegates WhatsApp link clicks to Lead events site-wide.
 */
export default function MetaPixelTracker() {
  const { pathname } = useLocation();
  const skipNextPageView = useRef(true);

  useEffect(() => {
    if (skipNextPageView.current) {
      skipNextPageView.current = false;
      return;
    }
    trackMetaPageView();
  }, [pathname]);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor?.href || !isWaMeLink(anchor.href)) return;
      trackMetaWhatsAppClick();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
