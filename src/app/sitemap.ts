import type { MetadataRoute } from "next";

/**
 * Generates /sitemap.xml dynamically for search engine indexing.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "https://selvaalta.cl";
  const lastModified = new Date("2026-11-10T12:00:00Z");

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/club`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/b2b`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/terminos`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/privacidad`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];
}
