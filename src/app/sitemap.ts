import { MetadataRoute } from "next";
import { cities, states } from "@/data/cities";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://pickleballcourtguide.com";

  const cityPages = cities.map((city) => ({
    url: `${base}/pickleball-courts/${city.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogPages = states.map((state) => ({
    url: `${base}/blog/best-pickleball-courts-${state.toLowerCase().replace(/\s+/g, "-")}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    { url: base, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    ...cityPages,
    ...blogPages,
  ];
}
