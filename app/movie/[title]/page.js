import axios from "axios";
import MovieDetailsClient from "@/src/views/MovieDetails";

async function fetchMovieData(title) {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await axios.get(
      `https://www.omdbapi.com/?t=${encodeURIComponent(title)}&apikey=${apiKey}`,
      { timeout: 5000 }
    );
    if (res.data && res.data.Response === "True") return res.data;
  } catch { /* fallback to client-side fetch */ }
  return null;
}

export async function generateMetadata({ params }) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);
  const movieData = await fetchMovieData(decodedTitle);

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
    twitter: { title: pageTitle, description: pageDesc },
  };
}

function getVerdict(rating) {
  if (!rating || rating === "N/A") return "Rating unavailable";
  const r = parseFloat(rating);
  if (r < 5) return "Not worth watching";
  if (r <= 6.5) return "Average";
  if (r <= 8) return "Good to watch";
  return "Worth watching";
}

export default async function MoviePage({ params }) {
  const { title } = await params;
  const decodedTitle = decodeURIComponent(title);
  const movieData = await fetchMovieData(decodedTitle);
  const canonicalUrl = `https://ibommaflix.com/movie/${encodeURIComponent(decodedTitle)}`;

  // Build Movie JSON-LD for server-side rendering
  const movieSchema = movieData ? {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movieData.Title,
    "url": canonicalUrl,
    "image": movieData.Poster && movieData.Poster !== "N/A" ? movieData.Poster : undefined,
    "datePublished": movieData.Year,
    "description": movieData.Plot && movieData.Plot !== "N/A" ? movieData.Plot : undefined,
    "genre": movieData.Genre && movieData.Genre !== "N/A" ? movieData.Genre.split(",").map(g => g.trim()) : undefined,
    "director": movieData.Director && movieData.Director !== "N/A"
      ? movieData.Director.split(",").map(d => ({ "@type": "Person", "name": d.trim() }))
      : undefined,
    "actor": movieData.Actors && movieData.Actors !== "N/A"
      ? movieData.Actors.split(",").map(a => ({ "@type": "Person", "name": a.trim() }))
      : undefined,
    ...(movieData.imdbRating && movieData.imdbRating !== "N/A" ? {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": movieData.imdbRating,
        "bestRating": "10",
        "worstRating": "1",
        "ratingCount": movieData.imdbVotes ? movieData.imdbVotes.replace(/,/g, "") : "1000"
      }
    } : {})
  } : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://ibommaflix.com/" },
      { "@type": "ListItem", "position": 2, "name": movieData ? movieData.Title : decodedTitle, "item": canonicalUrl }
    ]
  };

  return (
    <>
      {/* Server-rendered JSON-LD — visible to all crawlers without JS */}
      {movieSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(movieSchema) }}
        />
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Server-rendered movie summary for crawlers — shows before JS hydrates */}
      {movieData && (
        <div className="sr-only">
          <h1>{movieData.Title} ({movieData.Year}) - {getVerdict(movieData.imdbRating)}</h1>
          <p>IMDb Rating: {movieData.imdbRating}/10{movieData.imdbVotes ? ` (${movieData.imdbVotes} votes)` : ""}</p>
          {movieData.Plot && movieData.Plot !== "N/A" && <p>{movieData.Plot}</p>}
          {movieData.Director && movieData.Director !== "N/A" && <p>Director: {movieData.Director}</p>}
          {movieData.Actors && movieData.Actors !== "N/A" && <p>Stars: {movieData.Actors}</p>}
          {movieData.Genre && movieData.Genre !== "N/A" && <p>Genre: {movieData.Genre}</p>}
          {movieData.Runtime && movieData.Runtime !== "N/A" && <p>Runtime: {movieData.Runtime}</p>}
          {movieData.Awards && movieData.Awards !== "N/A" && <p>Awards: {movieData.Awards}</p>}
        </div>
      )}

      <MovieDetailsClient key={decodedTitle} titleParam={decodedTitle} initialMovie={movieData} />
    </>
  );
}
