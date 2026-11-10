import type { MetadataRoute } from "next";

/**
 * Generates /robots.txt allowing search engines and AI answer engines to index public pages and llms.txt.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "https://selvaalta.cl";

  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/club", "/b2b", "/terminos", "/privacidad", "/llms.txt"],
        disallow: ["/api/"],
      },
      {
        userAgent: [
          "GPTBot",
          "ChatGPT-User",
          "ClaudeBot",
          "PerplexityBot",
          "Google-Extended",
        ],
        allow: ["/", "/club", "/b2b", "/llms.txt"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
