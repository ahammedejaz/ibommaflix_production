import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Container } from "react-bootstrap";

import CustomNavbar from "../components/Navbar";
import MovieCarousel from "../components/MovieCarousel";
import SearchBar from "../components/SearchBar";
import SkeletonCard from "../components/SkeletonCard";
import { fetchTrendingMovies, buildCarouselMovies } from "../services/tmdbApi";
import posterPlaceholder from "../assets/poster-placeholder.svg";
import AdBanner from "../components/AdBanner";
import StructuredData from "../components/StructuredData";
import useDocumentTitle from "../hooks/useDocumentTitle";
import "./Home.css";

const Home = () => {
  const [tollywoodMoviesData, setTollywoodMoviesData] = useState([]);
  const [bollywoodMoviesData, setBollywoodMoviesData] = useState([]);
  const [hollywoodMoviesData, setHollywoodMoviesData] = useState([]);
  const [carouselMovies, setCarouselMovies] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useDocumentTitle("iBommaFlix - Discover Telugu, Hindi & English Movies");

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
    navigate(`/movie/${encodeURIComponent(searchTerm.trim())}`);
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

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "iBommaFlix",
    "url": "https://ibommaflix.com",
    "description": "Movie discovery and rating aggregation platform for Telugu, Hindi, and English movies",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ibommaflix.com/movie/{search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "iBommaFlix",
    "url": "https://ibommaflix.com",
    "logo": "https://ibommaflix.com/logo512.png",
    "description": "Movie discovery and rating aggregation platform for Telugu, Hindi, and English movies",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer support",
      "url": "https://ibommaflix.com/contact"
    }
  };

  return (
    <div>
      <Helmet>
        <title>iBommaFlix - Discover Telugu, Hindi &amp; English Movies | Ratings &amp; Reviews</title>
        <meta name="description" content="Discover trending Tollywood, Bollywood and Hollywood movies. Get IMDb ratings, plot summaries, cast details and watchability verdicts on iBommaFlix." />
        <link rel="canonical" href="https://ibommaflix.com/" />
        <meta property="og:title" content="iBommaFlix - Discover Telugu, Hindi & English Movies | Ratings & Reviews" />
        <meta property="og:description" content="Discover trending Tollywood, Bollywood and Hollywood movies. Get IMDb ratings, plot summaries, cast details and watchability verdicts on iBommaFlix." />
        <meta property="og:url" content="https://ibommaflix.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="iBommaFlix" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="iBommaFlix - Discover Telugu, Hindi & English Movies" />
        <meta name="twitter:description" content="Discover trending Tollywood, Bollywood and Hollywood movies with ratings and reviews." />
      </Helmet>
      <StructuredData data={websiteSchema} />
      <StructuredData data={organizationSchema} />
      <h1 className="sr-only">iBommaFlix - Discover Movies</h1>
      <CustomNavbar />
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
                      onClick={() => navigate(`/movie/${encodeURIComponent(m.title)}`)}
                      tabIndex={0}
                      role="button"
                      aria-label={`View details for ${m.title}`}
                      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") navigate(`/movie/${encodeURIComponent(m.title)}`); }}
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

      {/* Editorial Content Section */}
      <div className="editorial-section">
        <Container>
          <div className="editorial-content">
            <h2 className="editorial-heading">Your Complete Guide to Indian & International Cinema</h2>
            <p>
              iBommaFlix is a movie discovery platform built for fans of Telugu, Hindi, and English cinema. Whether you are a lifelong
              Tollywood enthusiast following the latest releases from Hyderabad's film industry, a Bollywood devotee who grew up with
              the musical dramas of Mumbai, or a Hollywood fan tracking the biggest global blockbusters, iBommaFlix brings everything
              together in one place. We aggregate movie data from trusted sources including IMDb and TMDB to give you ratings, plot
              summaries, cast details, trailers, and our own watchability verdicts for every title in our catalog.
            </p>

            <h3 className="editorial-subheading">What is Tollywood?</h3>
            <p>
              Tollywood refers to the Telugu-language film industry based in Hyderabad, Telangana. It is one of the largest film
              industries in India by number of films produced and box office revenue. Telugu cinema has gained massive global recognition
              in recent years, with films like Baahubali, RRR, and Pushpa breaking records worldwide. The industry is known for its
              grand visual storytelling, powerful action sequences, and strong emotional narratives. On iBommaFlix, you can browse
              trending Telugu movies, check their ratings, and discover hidden gems you might have missed.
            </p>

            <h3 className="editorial-subheading">What is Bollywood?</h3>
            <p>
              Bollywood is the Hindi-language film industry headquartered in Mumbai, Maharashtra. It is the most prolific film industry
              in the world by number of films produced annually and one of the largest by revenue. Known globally for its colorful
              musical sequences, dramatic storytelling, and star-driven narratives, Bollywood has produced iconic films that resonate
              across cultures. From timeless classics like Sholay and Dilwale Dulhania Le Jayenge to modern blockbusters like Dangal
              and Pathaan, Hindi cinema continues to captivate audiences worldwide. iBommaFlix curates the latest and most popular
              Bollywood releases alongside all-time favorites.
            </p>

            <h3 className="editorial-subheading">What is Hollywood?</h3>
            <p>
              Hollywood refers to the American English-language film industry centered in Los Angeles, California. It is the oldest
              and most influential film industry globally, responsible for franchises like Marvel, Star Wars, Harry Potter, and The
              Lord of the Rings. Hollywood sets the benchmark for visual effects, cinematography, and global distribution. On iBommaFlix,
              we feature trending Hollywood releases alongside award-winning dramas, sci-fi epics, and critically acclaimed indie films
              to help you find your next favorite movie.
            </p>

            <h3 className="editorial-subheading">How Our Rating System Works</h3>
            <p>
              Every movie on iBommaFlix displays its IMDb or TMDB rating alongside our own watchability verdict. Our verdict system
              translates numeric scores into simple, actionable recommendations: movies rated above 8.0 are labeled "Worth watching"
              as they represent the best of their genre. Films scoring between 6.5 and 8.0 receive a "Good to watch" verdict, indicating
              solid entertainment. Titles in the 5.0 to 6.5 range are marked "Average," and anything below 5.0 is flagged as "Not
              worth watching." This system helps you make quick decisions without analyzing numbers, especially when browsing through
              hundreds of titles across three industries.
            </p>

            <h3 className="editorial-subheading">Why Choose iBommaFlix?</h3>
            <p>
              Unlike generic movie databases, iBommaFlix is purpose-built for audiences who watch across Indian and international
              cinema. We bring together Tollywood, Bollywood, and Hollywood under one roof so you do not need to switch between
              multiple platforms. Our interface is designed for quick discovery: browse trending titles, search for any movie by name,
              view trailers, check cast and crew details, and read plot summaries, all without creating an account or paying a
              subscription. iBommaFlix is free, fast, and focused on helping you find great movies to watch.
            </p>
          </div>
        </Container>
      </div>

    </div>
  );
};

export default Home;
