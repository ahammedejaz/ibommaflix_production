"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Carousel } from "react-bootstrap";
import "./MovieCarousel.css";
import posterPlaceholder from "../assets/poster-placeholder.svg";

const getPostersPerSlide = () => {
  if (typeof window === "undefined") return 6;
  const width = window.innerWidth;
  if (width < 768) return 1;
  if (width < 1024) return 3;
  return 6;
};

const MovieCarousel = ({ movies = [], loading = false }) => {
  const [postersPerSlide, setPostersPerSlide] = useState(getPostersPerSlide);
  const router = useRouter();

  const handleResize = useCallback(() => {
    setPostersPerSlide(getPostersPerSlide());
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  const chunkedPosters = [];
  for (let i = 0; i < movies.length; i += postersPerSlide) {
    const chunk = movies.slice(i, i + postersPerSlide);
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
                      {posterGroup.map((movieItem, idx) => (
                          <img
                            key={movieItem.id || idx}
                            src={movieItem.poster}
                            alt={movieItem.title}
                            className="carousel-poster-img"
                            style={{ cursor: "pointer" }}
                            onClick={() => router.push(`/movie/${encodeURIComponent(movieItem.title)}`)}
                            onError={handleImgError}
                            loading={index > 0 ? "lazy" : undefined}
                            fetchPriority={index === 0 ? "high" : undefined}
                            width={170}
                            height={260}
                          />
                      ))}
                    </div>
                  </Carousel.Item>
              ))}
            </Carousel>
        ) : loading ? (
            <p className="loading-text">Loading posters...</p>
        ) : (
            <p className="loading-text">No posters available</p>
        )}
      </div>
  );
};

export default MovieCarousel;
