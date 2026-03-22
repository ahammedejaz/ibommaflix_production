import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./MovieCarousel.css";
import { tollywoodMovies, bollywoodMovies, hollywoodMovies } from "../data/movieList";
import posterPlaceholder from "../assets/poster-placeholder.svg";

const getPostersPerSlide = () => {
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1024) return 3;
  return 6;
};

const MovieCarousel = () => {
  const [moviePosters, setMoviePosters] = useState([]);
  const [postersPerSlide, setPostersPerSlide] = useState(getPostersPerSlide);
  const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

  const handleResize = useCallback(() => {
    setPostersPerSlide(getPostersPerSlide());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

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
          ...getRandomMovies(tollywoodMovies, 24),
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

          validMovies = [...new Set([...validMovies, ...filteredMovies])];
          retries++;

          if (validMovies.length < 18) {
            selectedMovies = [
              ...getRandomMovies(tollywoodMovies, 12),
              ...getRandomMovies(bollywoodMovies, 12),
              ...getRandomMovies(hollywoodMovies, 12),
            ];
          }
        }

        setMoviePosters(validMovies);
      } catch (error) {
        console.error("Error fetching movie posters from OMDb:", error);
      }
    };

    fetchPosters();
  }, [OMDB_API_KEY]);

  const chunkedPosters = [];
  for (let i = 0; i < moviePosters.length; i += postersPerSlide) {
    const chunk = moviePosters.slice(i, i + postersPerSlide);
    if (chunk.length === postersPerSlide) {
      chunkedPosters.push(chunk);
    }
  }

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = posterPlaceholder;
  };

  return (
      <div className="movie-carousel">
        {chunkedPosters.length > 0 ? (
            <Carousel indicators={false} controls={true} interval={3000} className="carousel-container">
              {chunkedPosters.map((posterGroup, index) => (
                  <Carousel.Item key={index} className="carousel-slide">
                    <div className="poster-group">
                      {posterGroup.map((poster, idx) => (
                          <img
                            key={idx}
                            src={poster}
                            alt="Movie Poster"
                            className="carousel-poster-img"
                            onError={handleImgError}
                            loading={index > 0 ? "lazy" : undefined}
                          />
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
