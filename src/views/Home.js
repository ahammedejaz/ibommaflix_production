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
import StructuredData from "../components/StructuredData";
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

      {/* Editorial Content Section */}
      <div className="editorial-section">
        <Container>
          <div className="editorial-content">
            <h2 className="editorial-heading">The Definitive Guide to Telugu, Hindi & Hollywood Cinema</h2>
            <p>
              Indian cinema is no longer a regional phenomenon — it is a global force reshaping how the world thinks about
              filmmaking. In 2022, S.S. Rajamouli's RRR earned over ₹1,200 crore worldwide and landed an Oscar for Best Original
              Song with "Naatu Naatu," a moment that sent shockwaves through the international film community. A year earlier,
              Allu Arjun's Pushpa: The Rise turned a Seshachalam forest smuggling story into a pan-Indian cultural event.
              Meanwhile, Hollywood continued its own reinvention, with Christopher Nolan's Oppenheimer and Denis Villeneuve's
              Dune Part Two proving that original, director-driven spectacle still fills theaters. iBommaFlix exists at this
              intersection — a discovery platform that treats Tollywood, Bollywood, and Hollywood with equal seriousness, pulling
              ratings, plot details, cast information, and trailers from trusted sources so you can navigate three of the world's
              most prolific film industries from a single screen.
            </p>

            <h3 className="editorial-subheading">Tollywood: The Powerhouse That Rewrote Indian Box Office History</h3>
            <p>
              Telugu cinema, produced out of Hyderabad's Ramoji Film City and surrounding studios, has quietly overtaken
              Bollywood in annual film output since 2021 — a fact that surprises many but not those who have been paying
              attention. The turning point was Baahubali: The Conclusion (2017), S.S. Rajamouli's mythological epic that
              earned ₹1,810 crore globally and proved a Telugu-language film could outgross every Bollywood release in
              the same year. Rajamouli was not working in isolation. Before Baahubali, his Magadheera (2009) had already
              redefined what Telugu audiences expected from visual effects and action choreography, and his insect-revenge
              fantasy Eega (2012) demonstrated that wildly original concepts could find massive commercial success. Today,
              Tollywood's bench runs deep: Sukumar directs Allu Arjun in the Pushpa franchise, blending raw rustic energy
              with mass-appeal storytelling. Ram Charan and Jr. NTR, both second-generation stars, delivered career-defining
              performances in RRR as fictional versions of real Indian freedom fighters. Rangasthalam (2018), directed by
              Sukumar and starring Ram Charan, offered a gritty, village-set political drama that earned over ₹200 crore
              on a modest budget. And then there is Arjun Reddy (2017) — Sandeep Reddy Vanga's polarizing but undeniably
              influential character study that launched Vijay Deverakonda into stardom and spawned the Hindi remake Kabir
              Singh. Prabhas remains the industry's most bankable global name, his Baahubali fame opening doors for Telugu
              stars across languages. Mahesh Babu continues to command massive openings with every release. On iBommaFlix,
              our Tollywood catalog spans these landmark titles and the deeper cuts that hardcore Telugu film fans seek out.
            </p>

            <h3 className="editorial-subheading">Bollywood: A Century of Storytelling, from Raja Harishchandra to Pathaan</h3>
            <p>
              Hindi cinema's history stretches back to 1913, when Dadasaheb Phalke's Raja Harishchandra became the first
              full-length Indian feature film — giving Bollywood a head start of over a century in shaping the subcontinent's
              popular imagination. That history matters because it produced the storytelling DNA that still powers today's
              hits. Aamir Khan understood this better than anyone: his Dangal (2016), based on the true story of wrestler
              Mahavir Singh Phogat, earned ₹2,024 crore worldwide — making it the highest-grossing Indian film ever at the
              time and a phenomenon in China. His earlier 3 Idiots (2009) remains the film that an entire generation quotes
              from memory, a comedy that doubled as a sharp critique of India's education system. Shah Rukh Khan's 2023
              comeback trilogy — Pathaan, Jawan, and Dunki — collectively grossed over ₹2,500 crore and proved that
              Bollywood's biggest star could reinvent himself at 57, with Pathaan alone crossing ₹1,000 crore. But
              Bollywood's real creative renaissance lives in its mid-budget films: Vidhu Vinod Chopra's 12th Fail (2023)
              turned an IPS officer's struggle story into a sleeper hit through sheer word of mouth. Anurag Kashyap's
              Gangs of Wasseypur (2012) gave Indian cinema its most ambitious crime epic — five hours of generational
              warfare that influenced a wave of gritty Hindi filmmaking. Tumbbad (2018) merged mythology with horror in
              ways Indian cinema had never attempted. Andhadhun (2018), Sriram Raghavan's pitch-black thriller starring
              Ayushmann Khurrana, earned universal acclaim and a National Film Award. Deepika Padukone continues to bridge
              commercial and prestige cinema. iBommaFlix catalogs this full spectrum — the blockbusters that dominate
              opening weekends and the films that build loyal audiences over time.
            </p>

            <h3 className="editorial-subheading">Hollywood: Where Auteur Vision Meets Global Scale</h3>
            <p>
              Hollywood operates on a different axis than Indian cinema — fewer films, larger individual budgets, and a
              distribution network that reaches virtually every country on earth. Christopher Nolan's The Dark Knight (2008)
              did not just redefine the superhero genre; it made a billion dollars while earning comparisons to Michael Mann's
              crime thrillers, proving that commercial filmmaking and artistic ambition could coexist at the highest level.
              Nolan repeated this trick with Interstellar (2014), a $165 million hard science fiction film about love and
              relativity that audiences turned into a cultural touchstone, and again with Oppenheimer (2023), which earned
              $952 million and swept the Oscars with seven wins including Best Picture and Best Director, with Cillian Murphy
              and Robert Downey Jr. both taking home acting honors. Denis Villeneuve's Dune Part Two (2024) delivered the
              kind of epic world-building that Hollywood does at its best — a $700 million global run that vindicated the
              slow-burn approach of splitting Frank Herbert's novel across two films. Meanwhile, films like Everything
              Everywhere All at Once (2022) showed that a $14.3 million budget and sheer creative audacity could win seven
              Oscars and outperform films costing ten times as much. Quentin Tarantino remains the gold standard for
              dialogue-driven cinema; Pulp Fiction (1994) still appears on virtually every greatest-films list three decades
              after release, its non-linear structure and pop-culture fluency as influential as ever. On iBommaFlix, we
              track Hollywood from the tent-pole franchises — Avengers: Endgame earned $2.8 billion, the second-highest
              global gross in history — to the director-driven films that define each awards season.
            </p>

            <h3 className="editorial-subheading">How Our Verdict System Cuts Through the Noise</h3>
            <p>
              With hundreds of titles across three industries, raw numbers can overwhelm rather than inform. That is why
              every film on iBommaFlix carries a plain-language watchability verdict alongside its IMDb or TMDB score.
              Films rated above 8.0 — the tier occupied by The Dark Knight, Dangal, and Baahubali: The Conclusion — earn
              a "Worth watching" tag, signaling exceptional quality across direction, performance, and craft. The 6.5 to
              8.0 range covers reliably entertaining films and receives a "Good to watch" verdict. Titles between 5.0 and
              6.5 are marked "Average," and anything below 5.0 carries a "Not worth watching" flag. The goal is not to
              replace your judgment but to accelerate it — when you are scanning fifty Telugu releases or comparing Nolan's
              filmography, a quick verdict helps you prioritize.
            </p>

            <h3 className="editorial-subheading">Why Serious Film Fans Use iBommaFlix</h3>
            <p>
              Most movie platforms treat Indian cinema as an afterthought — a secondary tab, a sparse catalog, an algorithm
              that does not understand why someone who watches Rajamouli might also watch Villeneuve. iBommaFlix was built
              for the audience that already exists: viewers who follow Allu Arjun's next project and Nolan's next film with
              equal anticipation, who consider Gangs of Wasseypur and Pulp Fiction part of the same conversation about great
              crime cinema. We surface trending titles, aggregate reliable ratings, provide cast and crew details, and serve
              trailers — all without requiring an account or a subscription. Browse Tollywood's latest alongside Hollywood's
              award contenders. Search any title by name and get an instant verdict. iBommaFlix is free, fast, and built by
              someone who actually watches these films.
            </p>
          </div>
        </Container>
      </div>

    </div>
  );
};

export default Home;
