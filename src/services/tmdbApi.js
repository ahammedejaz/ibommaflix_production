import axios from "axios";
import { fetchMultipleFromOmdb } from "./omdbApi";
import { tollywoodMovies, bollywoodMovies, hollywoodMovies } from "../data/movieList";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p/w500";
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// 5-second timeout so fallback kicks in fast on blocked networks
const TMDB_TIMEOUT = 5000;

// Cache TTL: 6 hours in milliseconds
const CACHE_TTL = 6 * 60 * 60 * 1000;

const getCached = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const { data, ts } = JSON.parse(raw);
    if (Date.now() - ts > CACHE_TTL) {
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
    // localStorage full or unavailable — silently ignore
  }
};

// Language codes for each industry
const LANGUAGE_MAP = {
  tollywood: "te",
  bollywood: "hi",
  hollywood: "en",
};

// Static movie lists for OMDb fallback
const STATIC_LISTS = {
  tollywood: tollywoodMovies,
  bollywood: bollywoodMovies,
  hollywood: hollywoodMovies,
};

/**
 * Pick random titles from a static list
 */
const pickRandom = (arr, count) => {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * Fallback: fetch movies from OMDb using static title lists
 */
const fetchFallbackFromOmdb = async (industry, count = 20) => {
  const titles = STATIC_LISTS[industry];
  if (!titles || titles.length === 0) return [];

  const selected = pickRandom(titles, count);
  return fetchMultipleFromOmdb(selected);
};

/**
 * Fetch trending/popular movies by industry.
 * Tries TMDB first (with timeout), falls back to OMDb + static lists.
 * @param {string} industry - "tollywood" | "bollywood" | "hollywood"
 * @param {number} page - page number (1-based)
 * @returns {Array} - array of movie objects
 */
export const fetchTrendingMovies = async (industry, page = 1) => {
  // Check cache first (works for both TMDB and OMDb cached results)
  const cacheKey = `tmdb_trending_${industry}_p${page}`;
  const cached = getCached(cacheKey);
  if (cached) return cached;

  // Try TMDB
  if (TMDB_API_KEY) {
    const lang = LANGUAGE_MAP[industry] || "en";
    try {
      const res = await axios.get(`${TMDB_BASE}/discover/movie`, {
        params: {
          api_key: TMDB_API_KEY,
          with_original_language: lang,
          sort_by: "popularity.desc",
          page,
          "vote_count.gte": 10,
          include_adult: false,
        },
        timeout: TMDB_TIMEOUT,
      });

      const movies = res.data.results
        .filter((m) => m.poster_path)
        .map((m) => ({
          id: m.id,
          title: m.title,
          year: m.release_date ? m.release_date.split("-")[0] : "N/A",
          poster: `${TMDB_IMG}${m.poster_path}`,
          rating: m.vote_average ? m.vote_average.toFixed(1) : "N/A",
          overview: m.overview,
        }));

      if (movies.length > 0) {
        setCache(cacheKey, movies);
        return movies;
      }
    } catch (error) {
      console.warn(`TMDB failed for ${industry}, falling back to OMDb:`, error.message);
    }
  }

  // Fallback: OMDb + static movie lists
  // Don't cache this list — individual movies are cached in omdbApi.js,
  // so picking fresh random titles each refresh is free for already-fetched movies
  try {
    const fallbackMovies = await fetchFallbackFromOmdb(industry, 20);
    if (fallbackMovies.length > 0) {
      return fallbackMovies;
    }
  } catch (error) {
    console.error(`OMDb fallback also failed for ${industry}:`, error.message);
  }

  return [];
};

/**
 * Build carousel movies from already-fetched category data (no extra API calls)
 * @param {Array} tollywood - tollywood movies array
 * @param {Array} bollywood - bollywood movies array
 * @param {Array} hollywood - hollywood movies array
 * @returns {Array} - shuffled array of movie objects
 */
export const buildCarouselMovies = (tollywood, bollywood, hollywood) => {
  return [
    ...tollywood.slice(0, 6),
    ...bollywood.slice(0, 6),
    ...hollywood.slice(0, 6),
  ].sort(() => Math.random() - 0.5);
};

/**
 * Fetch movie details from TMDB by ID
 * @param {number} id - TMDB movie ID
 * @returns {Object|null} - movie details or null
 */
export const fetchMovieById = async (id) => {
  if (!TMDB_API_KEY) return null;

  try {
    const res = await axios.get(`${TMDB_BASE}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: "credits",
      },
      timeout: TMDB_TIMEOUT,
    });

    const m = res.data;
    const directors = m.credits?.crew?.filter((c) => c.job === "Director").map((c) => c.name).join(", ") || "N/A";
    const actors = m.credits?.cast?.slice(0, 5).map((c) => c.name).join(", ") || "N/A";

    return {
      Title: m.title,
      Year: m.release_date ? m.release_date.split("-")[0] : "N/A",
      Rated: m.adult ? "R" : "PG-13",
      Runtime: m.runtime ? `${m.runtime} min` : "N/A",
      Genre: m.genres?.map((g) => g.name).join(", ") || "N/A",
      Director: directors,
      Actors: actors,
      Plot: m.overview || "N/A",
      Language: m.spoken_languages?.map((l) => l.english_name).join(", ") || "N/A",
      Poster: m.poster_path ? `${TMDB_IMG}${m.poster_path}` : "N/A",
      imdbRating: m.vote_average ? m.vote_average.toFixed(1) : "N/A",
      Awards: "N/A",
      source: "tmdb",
    };
  } catch {
    return null;
  }
};

/**
 * Search TMDB by title (with OMDb fallback handled by MovieDetails.js)
 * @param {string} title - movie title to search
 * @returns {Object|null} - movie details or null
 */
export const searchMovieByTitle = async (title) => {
  if (!TMDB_API_KEY) return null;

  try {
    const res = await axios.get(`${TMDB_BASE}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: title,
      },
      timeout: TMDB_TIMEOUT,
    });

    if (res.data.results && res.data.results.length > 0) {
      const movieId = res.data.results[0].id;
      return fetchMovieById(movieId);
    }
    return null;
  } catch {
    return null;
  }
};

export const TMDB_IMAGE_BASE = TMDB_IMG;
