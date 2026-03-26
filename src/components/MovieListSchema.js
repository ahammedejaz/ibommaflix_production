import React from 'react';

const MovieListSchema = ({ movies, categoryName, categoryUrl }) => {
  if (!movies || movies.length === 0) return null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": `${categoryName} Movies on iBommaFlix`,
    "url": categoryUrl,
    "numberOfItems": movies.length,
    "itemListElement": movies.slice(0, 20).map((movie, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Movie",
        "name": movie.title,
        "url": `https://ibommaflix.com/movie/${encodeURIComponent(movie.title)}`,
        ...(movie.poster && movie.poster !== 'N/A' ? { "image": movie.poster } : {}),
        ...(movie.rating && movie.rating !== 'N/A' ? {
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": movie.rating,
            "bestRating": "10",
            "worstRating": "1"
          }
        } : {})
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
};

export default MovieListSchema;
