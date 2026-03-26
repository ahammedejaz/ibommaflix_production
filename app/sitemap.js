import { tollywoodMovies, bollywoodMovies, hollywoodMovies } from "@/src/data/movieList";

const DOMAIN = "https://ibommaflix.com";

export default function sitemap() {
  // Deduplicate movie titles across categories
  const allTitles = [...new Set([...tollywoodMovies, ...bollywoodMovies, ...hollywoodMovies])];

  const staticPages = [
    { url: `${DOMAIN}/`, lastModified: new Date(), priority: 1.0 },
    { url: `${DOMAIN}/category/tollywood`, lastModified: new Date(), priority: 0.9 },
    { url: `${DOMAIN}/category/bollywood`, lastModified: new Date(), priority: 0.9 },
    { url: `${DOMAIN}/category/hollywood`, lastModified: new Date(), priority: 0.9 },
    { url: `${DOMAIN}/about`, lastModified: new Date("2026-03-26"), priority: 0.5 },
    { url: `${DOMAIN}/contact`, lastModified: new Date("2026-03-26"), priority: 0.5 },
    { url: `${DOMAIN}/privacy-policy`, lastModified: new Date("2026-03-26"), priority: 0.3 },
    { url: `${DOMAIN}/terms-of-service`, lastModified: new Date("2026-03-26"), priority: 0.3 },
    { url: `${DOMAIN}/disclaimer`, lastModified: new Date("2026-03-26"), priority: 0.3 },
  ];

  const moviePages = allTitles.map((title) => ({
    url: `${DOMAIN}/movie/${encodeURIComponent(title)}`,
    lastModified: new Date(),
    priority: 0.7,
  }));

  return [...staticPages, ...moviePages];
}
