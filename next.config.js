/** @type {import('next').NextConfig} */
const nextConfig = {
  // Map existing REACT_APP_ env vars so existing code works without changes
  env: {
    REACT_APP_OMDB_API_KEY: process.env.NEXT_PUBLIC_OMDB_API_KEY,
    REACT_APP_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
    REACT_APP_ADSENSE_PUB_ID: process.env.NEXT_PUBLIC_ADSENSE_PUB_ID,
    REACT_APP_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "image.tmdb.org" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "ia.media-imdb.com" },
    ],
  },
  // Suppress hydration warnings from browser extensions injecting attributes
  reactStrictMode: true,
};

module.exports = nextConfig;
