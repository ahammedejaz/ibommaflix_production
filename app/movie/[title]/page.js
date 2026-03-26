import axios from "axios";
import MovieDetailsClient from "@/src/views/MovieDetails";

export async function generateMetadata({ params }) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);

  // Pre-fetch movie data for metadata
  let movieData = null;
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  if (apiKey) {
    try {
      const res = await axios.get(
        `https://www.omdbapi.com/?t=${encodeURIComponent(decodedTitle)}&apikey=${apiKey}`,
        { timeout: 5000 }
      );
      if (res.data && res.data.Response === "True") {
        movieData = res.data;
      }
    } catch {
      // Metadata will use fallback
    }
  }

  const pageTitle = movieData
    ? `${movieData.Title} (${movieData.Year}) - Rating & Review`
    : `${decodedTitle} - Rating & Review`;
  const pageDesc = movieData
    ? `${movieData.Title} - IMDb Rating: ${movieData.imdbRating || "N/A"}. ${movieData.Plot ? movieData.Plot.substring(0, 150) : "Discover ratings, cast, and plot details on iBommaFlix."}`
    : `Discover ratings, cast, plot details and watchability verdict for ${decodedTitle} on iBommaFlix.`;
  const canonicalUrl = `https://ibommaflix.com/movie/${encodeURIComponent(decodedTitle)}`;
  const posterImage = movieData && movieData.Poster && movieData.Poster !== "N/A" ? movieData.Poster : undefined;

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: canonicalUrl,
      type: "video.movie",
      ...(posterImage ? { images: [{ url: posterImage }] } : {}),
    },
    twitter: {
      title: pageTitle,
      description: pageDesc,
    },
  };
}

export default async function MoviePage({ params }) {
  const { title } = await params;
  return <MovieDetailsClient titleParam={decodeURIComponent(title)} />;
}
