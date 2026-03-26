"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container } from "react-bootstrap";

import CustomNavbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import SearchBar from "../components/SearchBar";
import SkeletonCard from "../components/SkeletonCard";
import { fetchTrendingMovies, buildCarouselMovies } from "../services/tmdbApi";
import posterPlaceholder from "../assets/poster-placeholder.svg";
import AdBanner from "../components/AdBanner";
import "./Home.css";

const Home = () => {
  const [tollywoodMoviesData, setTollywoodMoviesData] = useState([]);
  const [bollywoodMoviesData, setBollywoodMoviesData] = useState([]);
  const [hollywoodMoviesData, setHollywoodMoviesData] = useState([]);
  const [carouselMovies, setCarouselMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const router = useRouter();

  // Fetch latest trending movies from TMDB (single fetch shared with carousel)
  useEffect(() => {
    const loadMovies = async () => {
      setLoading(true);
      setError(false);
      try {
        const [te, hi, en] = await Promise.all([
          fetchTrendingMovies("tollywood"),
          fetchTrendingMovies("bollywood"),
          fetchTrendingMovies("hollywood"),
        ]);
        setTollywoodMoviesData(te.slice(0, 6));
        setBollywoodMoviesData(hi.slice(0, 6));
        setHollywoodMoviesData(en.slice(0, 6));
        setCarouselMovies(buildCarouselMovies(te, hi, en));
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    loadMovies();
  }, []);

  // Search navigates to movie details page
  const fetchMovie = (searchTerm) => {
    if (!searchTerm || !searchTerm.trim()) return;
    router.push(`/movie/${encodeURIComponent(searchTerm.trim())}`);
  };

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = posterPlaceholder;
  };

  const categories = [
    { title: "Trending in Tollywood", data: tollywoodMoviesData },
    { title: "Trending in Bollywood", data: bollywoodMoviesData },
    { title: "Trending in Hollywood", data: hollywoodMoviesData },
  ];

  return (
    <div>
      <CustomNavbar />
      <h1 className="home-hero-title">Discover Telugu, Hindi & English Movies</h1>
      <MovieCarousel movies={carouselMovies} loading={loading} />

      {/* Ad — below hero carousel */}
      <AdBanner adSlot="2271270920" />

      {/* Search Bar */}
      <Container className="mt-3 text-center">
        <SearchBar onSearch={fetchMovie} searchInput={searchInput} setSearchInput={setSearchInput} />
      </Container>

      {/* Tagline */}
      <Container className="tagline-container">
        <h2 className="tagline-heading">Where Quality & Clarity Matter</h2>
        <p className="tagline-text">
          Discover trending Tollywood, Bollywood, and Hollywood movies with ratings, reviews, and recommendations on iBommaFlix.
        </p>
      </Container>

      {/* Movie Sections — Netflix-style horizontal scroll */}
      <div className="movie-sections">
        {loading ? (
          <>
            {["Trending in Tollywood", "Trending in Bollywood", "Trending in Hollywood"].map((cat, i) => (
              <div key={i} className="movie-category">
                <h2 className="category-title">{cat}</h2>
                <SkeletonCard count={6} layout="horizontal" />
              </div>
            ))}
          </>
        ) : error ? (
          <div className="loading-container">
            <p className="loading-movies-text">Unable to load movies. Please check your connection and refresh.</p>
          </div>
        ) : (
          categories.map((category, i) => (
            <React.Fragment key={i}>
              <div className="movie-category">
                <h2 className="category-title">{category.title}</h2>
                <div className="scroll-row">
                  {category.data.map((m, index) => (
                    <div
                      key={m.id || index}
                      className="poster-card"
                      onClick={() => router.push(`/movie/${encodeURIComponent(m.title)}`)}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${m.title}`}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") router.push(`/movie/${encodeURIComponent(m.title)}`); }}
                    >
                      <img
                        src={m.poster}
                        alt={m.title}
                        className="poster-img"
                        onError={handleImgError}
                        loading="lazy"
                        width={180}
                        height={250}
                      />
                      <div className="play-button">&#9654;</div>
                      <p className="poster-title">{m.title}</p>
                      <p className="poster-year">{m.year}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Ad — between Bollywood and Hollywood sections */}
              {i === 1 && <AdBanner adSlot="4458450563" />}
            </React.Fragment>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
