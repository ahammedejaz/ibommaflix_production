import axios from "axios";

const OMDB_BASE = "https://www.omdbapi.com/";
const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

// Longer cache for OMDb fallback (24 hours) to conserve the 1,000 req/day free limit
const OMDB_CACHE_TTL = 24 * 60 * 60 * 1000;

const getCached = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > OMDB_CACHE_TTL) {
      localStorage.removeItem(key);
      return null;
    }
    return data;
  } catch {
    return null;
  }
};

const setCache = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
  } catch {
    // localStorage full or unavailable
  }
};

/**
 * Fetch a single movie from OMDb by title
 * @param {string} title - movie title
 * @returns {Object|null} - normalized movie object or null
 */
export const fetchFromOmdb = async (title) => {
  if (!OMDB_API_KEY) return null;

  const cacheKey = `omdb_${title}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  try {
    const res = await axios.get(OMDB_BASE, {
      params: { t: title, apikey: OMDB_API_KEY, type: "movie", plot: "short" },
      timeout: 8000,
    });

    if (res.data.Response === "True") {
      const movie = {
        id: res.data.imdbID,
        title: res.data.Title,
        year: res.data.Year || "N/A",
        poster: res.data.Poster !== "N/A" ? res.data.Poster : null,
        rating: res.data.imdbRating !== "N/A" ? res.data.imdbRating : "N/A",
        overview: res.data.Plot || "",
      };
      setCache(cacheKey, movie);
      return movie;
    }
    return null;
  } catch {
    return null;
  }
};

/**
 * Fetch multiple movies from OMDb given an array of titles.
 * Uses Promise.allSettled so one failure doesn't block others.
 * @param {string[]} titles - array of movie titles
 * @returns {Array} - array of movie objects (only successful fetches)
 */
export const fetchMultipleFromOmdb = async (titles) => {
  const results = await Promise.allSettled(titles.map(fetchFromOmdb));
  return results
    .filter((r) => r.status === "fulfilled" && r.value && r.value.poster)
    .map((r) => r.value);
};
