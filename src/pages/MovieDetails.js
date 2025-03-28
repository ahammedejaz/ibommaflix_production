import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const MovieDetails = () => {
  const location = useLocation();
  const movie = location.state?.movie;
  const [verdict, setVerdict] = useState("");

  useEffect(() => {
    if (movie) {
      axios.post("http://127.0.0.1:4121/api/sentiment/analyze", {
        reviews: [`This movie is amazing!`, `Loved the storyline!`],
        movie_title: movie.title
      }).then((res) => {
        setVerdict(res.data.verdict);
      });
    }
  }, [movie]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="container text-center">
      <h2>{movie.title} ({movie.year})</h2>
      <img src={movie.poster} alt={movie.title} className="img-fluid my-3" />
      <p><strong>Genre:</strong> {movie.genre}</p>
      <p><strong>IMDb Rating:</strong> {movie.rating}</p>
      <p><strong>Plot:</strong> {movie.plot}</p>
      <h3 className="text-success mt-4">Verdict: {verdict}</h3>
    </div>
  );
};

export default MovieDetails;