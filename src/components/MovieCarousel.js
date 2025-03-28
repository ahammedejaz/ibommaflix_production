import React, { useEffect, useState } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap"; // ✅ Bootstrap Carousel
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieCarousel.css";
import { tollywoodMovies, bollywoodMovies, hollywoodMovies } from "../data/movieList";

const MovieCarousel = () => {
  const [moviePosters, setMoviePosters] = useState([]);
  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  useEffect(() => {
    const fetchPosters = async () => {
      if (!OMDB_API_KEY) {
        console.error("OMDB API Key is missing. Check your .env file.");
        return;
      }

      try {
        const getRandomMovies = (movies, count) =>
          [...movies].sort(() => Math.random() - 0.5).slice(0, count);

        let selectedMovies = [
          ...getRandomMovies(tollywoodMovies, 24), // ✅ Fetch more movies
          ...getRandomMovies(bollywoodMovies, 24),
          ...getRandomMovies(hollywoodMovies, 24),
        ];

        let validMovies = [];
        let retries = 0;

        while (validMovies.length < 18 && retries < 15) {
          let movieRequests = selectedMovies.map((title) =>
            axios.get(`https://www.omdbapi.com/?t=${title}&apikey=${OMDB_API_KEY}`)
          );

          const responses = await Promise.all(movieRequests);

          let filteredMovies = responses
            .filter(
              (res) =>
                res.data.Response === "True" &&
                res.data.Poster &&
                res.data.Poster !== "N/A" &&
                res.data.Poster !== ""
            )
            .map((res) => res.data.Poster);

          validMovies = [...new Set([...validMovies, ...filteredMovies])]; // ✅ Avoid Duplicates
          retries++;

          // ✅ If we still don’t have enough posters, fetch more movies
          if (validMovies.length < 18) {
            selectedMovies = [
              ...getRandomMovies(tollywoodMovies, 12),
              ...getRandomMovies(bollywoodMovies, 12),
              ...getRandomMovies(hollywoodMovies, 12),
            ];
          }
        }

        // ✅ Ensure Exactly 6 Posters Per Slide
        while (validMovies.length % 6 !== 0) {
          validMovies.push("https://via.placeholder.com/160x250?text=Coming+Soon");
        }

        setMoviePosters(validMovies);
      } catch (error) {
        console.error("Error fetching movie posters from OMDb:", error);
      }
    };

    fetchPosters();
  }, []);

  // ✅ **Chunk Posters into Sets of 6 for Auto-Scrolling**
  const chunkedPosters = [];
  for (let i = 0; i < moviePosters.length; i += 6) {
    chunkedPosters.push(moviePosters.slice(i, i + 6));
  }

  return (
    <div className="movie-carousel">
      {chunkedPosters.length > 0 ? (
        <Carousel indicators={false} controls={true} interval={3000} className="carousel-container">
          {chunkedPosters.map((posterGroup, index) => (
            <Carousel.Item key={index} className="carousel-slide">
              <div className="poster-group">
                {posterGroup.map((poster, idx) => (
                  <img key={idx} src={poster} alt="Movie Poster" className="poster-img" />
                ))}
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : (
        <p className="loading-text">Loading posters...</p>
      )}
    </div>
  );
};

export default MovieCarousel;