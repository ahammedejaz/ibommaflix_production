/** @type {import('next').NextConfig} */
const nextConfig = {
  // Map existing REACT_APP_ env vars so existing service code works without changes
  env: {
    REACT_APP_OMDB_API_KEY: process.env.NEXT_PUBLIC_OMDB_API_KEY,
    REACT_APP_TMDB_API_KEY: process.env.NEXT_PUBLIC_TMDB_API_KEY,
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
