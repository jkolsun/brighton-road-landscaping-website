import type { MetadataRoute } from "next";
const BASE = "https://www.brightonroadlandscaping.com";
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["","/about","/services","/gallery","/testimonials","/contact","/quote","/join","/services/lawn-mowing","/services/hardscaping","/services/landscape-design","/services/drainage","/services/seasonal-cleanups"];
  return paths.map((p) => ({
    url: BASE + p,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: p === "" ? 1 : p.startsWith("/services/") ? 0.8 : 0.7,
  }));
}
