"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import CustomNavbar from "../components/Navbar";
import SkeletonCard from "../components/SkeletonCard";
import posterPlaceholder from "../assets/poster-placeholder.svg";
import AdBanner from "../components/AdBanner";
import { fetchTrendingMovies } from "../services/tmdbApi";
import BreadcrumbSchema from "../components/BreadcrumbSchema";
import MovieListSchema from "../components/MovieListSchema";
import "./CategoryPage.css";

const categoryLabels = {
  tollywood: "Tollywood",
  bollywood: "Bollywood",
  hollywood: "Hollywood",
};

const categoryDescriptions = {
  tollywood: {
    intro: "Something seismic shifted in Indian cinema when S.S. Rajamouli released Baahubali 2: The Conclusion in 2017 and it collected over \u20B91,810 crore worldwide. That was not just a box office record \u2014 it was a declaration that Telugu cinema had arrived on the global stage with a force Bollywood could no longer ignore. Then RRR happened. Jr. NTR and Ram Charan dancing to \"Naatu Naatu\" at the Oscars was not something anyone predicted, yet it felt inevitable in hindsight. Tollywood had been building toward this moment for years, through Magadheera's mythological grandeur, Eega's audacious premise of a man reincarnated as a fly seeking revenge, and Rangasthalam's earthy, dialect-rich period drama that proved rural stories could dominate the box office.",
    detail: "The industry's current golden era runs deep. Sukumar turned Allu Arjun into a national phenomenon with Pushpa: The Rise, earning Arjun the National Award for Best Actor and making \"Thaggede Le\" a catchphrase heard from Hyderabad to Hamburg. The Pushpa series cemented what audiences already knew: Telugu cinema does not just compete with Bollywood, it outpaces it. In 2022-2023, Tollywood actually surpassed Hindi cinema in domestic box office collections \u2014 a staggering achievement for a regional industry. Sandeep Reddy Vanga's Arjun Reddy was so culturally explosive that Bollywood remade it shot-for-shot as Kabir Singh, and it still could not capture the raw nerve of the original. Prabhas went from Baahubali's warrior king to the sci-fi ambitions of Kalki 2898 AD. Mahesh Babu remains the industry's most bankable leading man. Nani keeps delivering sleeper hits that punch above their budget. Directors like Trivikram Srinivas blend mass entertainment with sharp writing in ways that feel effortless. All of this happens out of Hyderabad, home to Ramoji Film City \u2014 the world's largest film studio complex \u2014 a fitting headquarters for an industry that thinks bigger than anyone else. Browse the latest trending Telugu movies below, complete with IMDb ratings and our watchability verdicts."
  },
  bollywood: {
    intro: "Bollywood began with Raja Harishchandra in 1913 and has not stopped reinventing itself since. Producing 1,500 to 2,000 films a year across every genre imaginable, the Hindi film industry is less a factory and more an ecosystem \u2014 one that sustains everything from Sanjay Leela Bhansali's lavish period spectacles to Anurag Kashyap's Gangs of Wasseypur, a five-hour crime epic that plays like Scorsese filtered through the dust and diesel of rural Bihar. The industry's reach extends far beyond India: from the packed theaters of Dubai and Toronto to the living rooms of the global Indian diaspora, Bollywood is often the first and most enduring connection people have to Indian culture.",
    detail: "The numbers alone tell a remarkable story. Aamir Khan's Dangal earned over \u20B92,024 crore globally, becoming the highest-grossing Indian film ever in China, where audiences who had never heard of Indian wrestling were openly weeping in theaters. Rajkumar Hirani's 3 Idiots became a cultural touchstone across Asia, quoted in boardrooms and classrooms alike. Then Shah Rukh Khan, after years of box office disappointments that had critics writing his obituary, stormed back with Pathaan and Jawan in the same year, silencing every doubter with combined collections that redefined what a comeback looks like. But Bollywood's real strength is not in its tentpoles \u2014 it is in films like 12th Fail, a quiet, devastating story about civil service aspirants that became one of 2023's biggest sleeper hits purely through word of mouth. It is in Andhadhun, Sriram Raghavan's pitch-black thriller about a blind pianist that keeps pulling the rug out from under you. It is in Tumbbad, a horror film so visually stunning and mythologically rich that it developed a cult following years after its modest theatrical run. It is in the Stree franchise, which proved that horror-comedy could be a genuine blockbuster genre. Directors like Zoya Akhtar bring literary sensibility to mainstream cinema, while stars like Deepika Padukone and Alia Bhatt have expanded what a leading role for women in Hindi cinema can be. Explore trending Hindi movies below with ratings, cast details, and plot summaries to find your next favorite film."
  },
  hollywood: {
    intro: "When Christopher Nolan convinced a studio to detonate a practical nuclear explosion for Oppenheimer rather than use CGI, and that film went on to win seven Academy Awards and earn $953 million worldwide, it confirmed something that the streaming era tried to deny: cinema made for the big screen still matters. Hollywood has been handing out Oscars since 1929, and nearly a century later, the American film industry remains the gravitational center of global moviemaking. But the landscape looks radically different now. The same year Oppenheimer dominated, Everything Everywhere All at Once \u2014 a mid-budget, genre-defying film by the Daniels about a laundromat owner fighting across multiverses \u2014 swept the previous ceremony with seven Oscars of its own, proving that original storytelling can still break through.",
    detail: "The range of what Hollywood produces is staggering. Nolan alone accounts for three of the most rewatchable films of the last two decades: The Dark Knight redefined superhero cinema as serious drama, Inception turned a heist movie into a philosophical puzzle box, and Interstellar made astrophysics feel like a love story. Denis Villeneuve took Frank Herbert's supposedly unfilmable Dune and turned it into the kind of sweeping, sand-choked epic that demands an IMAX screen, with Timoth\u00E9e Chalamet anchoring Part Two with genuine movie-star gravity. Quentin Tarantino's Pulp Fiction still feels like the coolest film ever made, thirty years on. Cillian Murphy went from character actor to leading man overnight with Oppenheimer. Robert Downey Jr. bookended his Marvel decade by winning an Oscar for playing a completely different kind of genius. Margot Robbie turned a toy commercial into a billion-dollar cultural event with Barbie. And then there is the Marvel machine: Avengers: Endgame hit $2.8 billion worldwide, a number so absurd it may never be topped, though Deadpool and Wolverine proved audiences will still show up in massive numbers for the right superhero film. The streaming wars have reshaped distribution, but the theatrical experience is fighting back, and the directors and stars driving that fight are making some of the most ambitious work in Hollywood's history. Discover the latest trending Hollywood releases below with comprehensive ratings and recommendations."
  }
};

const CategoryPage = ({ typeParam }) => {
  const type = typeParam;
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const label = categoryLabels[type];

  const fetchPage = useCallback(async (pageNum) => {
    if (!label) return;
    setLoading(true);

    const results = await fetchTrendingMovies(type, pageNum);

    if (results.length === 0) {
      setHasMore(false);
    } else {
      setMovies((prev) => [...prev, ...results]);
      setPage(pageNum + 1);
    }
    setLoading(false);
  }, [type, label]);

  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);
    if (label) {
      fetchPage(1);
    }
  }, [type]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleImgError = (e) => {
    e.target.onerror = null;
    e.target.src = posterPlaceholder;
  };

  if (!label) {
    return (
      <div>
        <CustomNavbar />
        <div className="category-not-found">
          <p>Category not found.</p>
          <Link href="/" className="home-link">Go Home</Link>
        </div>
      </div>
    );
  }

  const pageTitle = `${label} Movies - Latest & Trending | iBommaFlix`;
  const pageDesc = `Browse the latest and trending ${label} movies. Discover ratings, reviews and recommendations on iBommaFlix.`;
  const canonicalUrl = `https://ibommaflix.com/category/${type}`;

  return (
    <div>
      <BreadcrumbSchema items={[
        { name: "Home", url: "https://ibommaflix.com/" },
        { name: `${label} Movies`, url: canonicalUrl }
      ]} />
      <MovieListSchema
        movies={movies}
        categoryName={label}
        categoryUrl={canonicalUrl}
      />
      <CustomNavbar />
      <div className="category-container">
        <h1 className="category-page-title">{label} Movies</h1>
        {categoryDescriptions[type] && (
          <div className="category-description">
            <p className="category-description-intro">{categoryDescriptions[type].intro}</p>
            <p className="category-description-detail">{categoryDescriptions[type].detail}</p>
          </div>
        )}
        {movies.length === 0 && loading ? (
          <SkeletonCard count={8} layout="grid" />
        ) : null}
        <div className="category-grid">
          {movies.map((m, index) => (
            <React.Fragment key={m.id || index}>
              <Link href={`/movie/${encodeURIComponent(m.title)}`} className="category-card">
                <img
                  src={m.poster}
                  alt={m.title}
                  className="category-card-img"
                  onError={handleImgError}
                  loading="lazy"
                  width={180}
                  height={270}
                />
                <div className="category-card-info">
                  <p className="category-card-title">{m.title}</p>
                  <p className="category-card-year">{m.year}</p>
                  {m.rating && m.rating !== "N/A" && (
                    <p className="category-card-rating">&#9733; {m.rating}</p>
                  )}
                </div>
              </Link>
              {/* Ad after every 8 cards */}
              {(index + 1) % 8 === 0 && (
                <div className="category-ad-slot">
                  <AdBanner adSlot="5304494924" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
        {hasMore && (
          <div className="load-more-container">
            <button
              className="load-more-btn"
              onClick={() => fetchPage(page)}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
        <div className="back-to-top-container">
          <button
            className="back-to-top-link"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
