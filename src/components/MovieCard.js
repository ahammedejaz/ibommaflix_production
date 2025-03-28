import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MovieCard.css";

const MovieCard = ({ movie, setVerdict }) => {
  const [localVerdict, setLocalVerdict] = useState("");

  useEffect(() => {
    if (!movie) return;

    axios
      .post("http://127.0.0.1:4121/api/sentiment/analyze", {
        reviews: ["This movie is amazing!", "Loved the storyline!"],
        movie_title: movie.title
      })
      .then((res) => {
        console.log("🎬 Verdict Received:", res.data.verdict);
        setLocalVerdict(res.data.verdict);
        setVerdict(res.data.verdict); // ✅ Pass verdict to Home.js
      })
      .catch((err) => console.error("❌ Error fetching verdict:", err));
  }, [movie]);

  return (
    <div className="movie-card">
      <div className="poster-container">
        <img src={movie.poster} alt={movie.title} className="movie-poster" />
      </div>
      <div className="movie-details">
        <h3>{movie.title} ({movie.year})</h3>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>IMDb Rating:</strong> {movie.rating}</p>
        <div className="plot-container">
          <p className="plot">{movie.plot}</p>
        </div>
        <h3 className="verdict">{localVerdict || "Fetching Verdict..."}</h3> {/* ✅ Verdict updates properly */}
      </div>
    </div>
  );
};

export default MovieCard;