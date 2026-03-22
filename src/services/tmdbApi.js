import axios from "axios";

const TMDB_BASE = "https://api.themoviedb.org/3";
const TMDB_IMG = "https://image.tmdb.org/t/p/w500";
const TMDB_API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Language codes for each industry
const LANGUAGE_MAP = {
  tollywood: "te",
  bollywood: "hi",
  hollywood: "en",
};

/**
 * Fetch trending/popular movies by industry from TMDB
 * @param {string} industry - "tollywood" | "bollywood" | "hollywood"
 * @param {number} page - page number (1-based)
 * @returns {Array} - array of movie objects
 */
export const fetchTrendingMovies = async (industry, page = 1) => {
  if (!TMDB_API_KEY) {
    console.error("TMDB API Key is missing. Add REACT_APP_TMDB_API_KEY to .env");
    return [];
  }

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
    });

    return res.data.results
      .filter((m) => m.poster_path)
      .map((m) => ({
        id: m.id,
        title: m.title,
        year: m.release_date ? m.release_date.split("-")[0] : "N/A",
        poster: `${TMDB_IMG}${m.poster_path}`,
        rating: m.vote_average ? m.vote_average.toFixed(1) : "N/A",
        overview: m.overview,
      }));
  } catch (error) {
    console.error(`Error fetching ${industry} movies from TMDB:`, error);
    return [];
  }
};

/**
 * Fetch movies for the carousel — mixed from all three industries
 * @returns {Array} - array of { poster, title } objects
 */
export const fetchCarouselMovies = async () => {
  if (!TMDB_API_KEY) return [];

  try {
    const [te, hi, en] = await Promise.all([
      fetchTrendingMovies("tollywood", 1),
      fetchTrendingMovies("bollywood", 1),
      fetchTrendingMovies("hollywood", 1),
    ]);

    // Take 6 from each, shuffle
    const mixed = [
      ...te.slice(0, 6),
      ...hi.slice(0, 6),
      ...en.slice(0, 6),
    ].sort(() => Math.random() - 0.5);

    return mixed;
  } catch {
    return [];
  }
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
 * Search TMDB by title
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
    });

    if (res.data.results && res.data.results.length > 0) {
      const movieId = res.data.results[0].id;
      return await fetchMovieById(movieId);
    }
    return null;
  } catch {
    return null;
  }
};

export const TMDB_IMAGE_BASE = TMDB_IMG;
