import type { MetadataRoute } from "next";
import { AREAS } from "@/lib/areas";
const BASE = "https://www.brightonroadlandscaping.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["","/about","/services","/gallery","/testimonials","/contact","/quote","/join","/services/commercial-snow-removal","/services/hardscaping","/services/landscape-design","/services/drainage","/services/seasonal-cleanups","/fall-cleanup", ...AREAS.map((a) => "/landscaping/" + a.slug)];
  return paths.map((p) => ({
    url: BASE + p,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : p.startsWith("/services/") || p === "/fall-cleanup" || p.startsWith("/landscaping/") ? 0.8 : 0.7,
  }));
}
