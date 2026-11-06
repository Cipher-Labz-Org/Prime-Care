import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";

/** Local Openskylabz API Gateway (Channelling public APIs). Override with VITE_CHANNELING_API_PROXY. */
function resolveChannelingProxyTarget(raw?: string): string {
  const fallback = "http://127.0.0.1:7000";
  const target = raw?.trim() || fallback;
  try {
    const url = new URL(target);
    if (url.hostname === "localhost") {
      url.hostname = "127.0.0.1";
      return url.toString().replace(/\/$/, "");
    }
    return target.replace(/\/$/, "");
  } catch {
    return fallback;
  }
}

// https://vite.dev/config/
export default defineConfig(async ({ command }) => {
  const channelingProxyTarget = resolveChannelingProxyTarget(
    process.env.VITE_CHANNELING_API_PROXY,
  );
  const reviewsProxyTarget =
    process.env.VITE_REVIEWS_API_PROXY?.trim() || "http://127.0.0.1:7001";
  const plugins: PluginOption[] = [react(), tailwindcss()];

  if (command === "serve") {
    const { createSlotHoldsMiddleware } = await import("./server/slotHoldsStore.js");
    plugins.push({
      name: "premiercare-slot-holds",
      configureServer(server) {
        server.middlewares.use(createSlotHoldsMiddleware());
      },
    });
  }

  return {
    plugins,
    server: {
      proxy: {
        "/api/public/reviews": {
          target: reviewsProxyTarget,
          changeOrigin: true,
        },
        "/api/public/landing-enquiry": {
          target: reviewsProxyTarget,
          changeOrigin: true,
        },
        "/api/channeling/reviews": {
          target: reviewsProxyTarget,
          changeOrigin: true,
        },
        "/api/channeling/rmo": {
          target: reviewsProxyTarget,
          changeOrigin: true,
        },
        "/api/channeling/reception": {
          target: reviewsProxyTarget,
          changeOrigin: true,
        },
        "/api/channeling/public/discover": {
          target: channelingProxyTarget,
          changeOrigin: true,
        },
        "/api/channeling/public/doctors": {
          target: channelingProxyTarget,
          changeOrigin: true,
        },
        "/api/channeling/public/specializations": {
          target: channelingProxyTarget,
          changeOrigin: true,
        },
        "/api/channeling/public/hospitals": {
          target: channelingProxyTarget,
          changeOrigin: true,
        },
        "/api/channeling/public/uploads": {
          target: channelingProxyTarget,
          changeOrigin: true,
        },
        "/api/channeling/public/sessions": {
          target: channelingProxyTarget,
          changeOrigin: true,
        },
        "/api/channeling/public/bookings": {
          target: channelingProxyTarget,
          changeOrigin: true,
        },
        "/api/channeling/public/auth": {
          target: channelingProxyTarget,
          changeOrigin: true,
        },
        "/api/channeling/holds": {
          target: channelingProxyTarget,
          changeOrigin: true,
        },
      },
    },
  };
});
