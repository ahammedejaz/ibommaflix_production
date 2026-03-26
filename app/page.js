import Link from "next/link";
import { Container } from "react-bootstrap";
import HomeClient from "@/src/views/Home";

export const metadata = {
  title: "iBommaFlix - Discover Telugu, Hindi & English Movies | Ratings & Reviews",
  description: "Discover trending Tollywood, Bollywood and Hollywood movies. Get IMDb ratings, plot summaries, cast details and watchability verdicts on iBommaFlix.",
  alternates: { canonical: "https://ibommaflix.com/" },
  openGraph: {
    title: "iBommaFlix - Discover Telugu, Hindi & English Movies | Ratings & Reviews",
    description: "Discover trending Tollywood, Bollywood and Hollywood movies. Get IMDb ratings, plot summaries, cast details and watchability verdicts on iBommaFlix.",
    url: "https://ibommaflix.com/",
    images: [{ url: "/logo512.png", width: 512, height: 512 }],
  },
  twitter: {
    title: "iBommaFlix - Discover Telugu, Hindi & English Movies",
    description: "Discover trending Tollywood, Bollywood and Hollywood movies with ratings and reviews.",
  },
};

export default function HomePage() {
  return (
    <>
      <HomeClient />

      {/* Server-rendered editorial content — visible to all crawlers without JS */}
      <div className="editorial-section">
        <Container>
          <div className="editorial-content">
            <h2 className="editorial-heading">The Definitive Guide to Telugu, Hindi & Hollywood Cinema</h2>
            <p>
              Indian cinema is no longer a regional phenomenon — it is a global force reshaping how the world thinks about
              filmmaking. In 2022, S.S. Rajamouli{"'"}s <Link href="/movie/RRR" style={{color:"#FFD700"}}>RRR</Link> earned over ₹1,200 crore worldwide and landed an Oscar for Best Original
              Song with {"\""}Naatu Naatu,{"\""} a moment that sent shockwaves through the international film community. A year earlier,
              Allu Arjun{"'"}s <Link href="/movie/Pushpa%3A%20The%20Rise" style={{color:"#FFD700"}}>Pushpa: The Rise</Link> turned a Seshachalam forest smuggling story into a pan-Indian cultural event.
              Meanwhile, Hollywood continued its own reinvention, with Christopher Nolan{"'"}s <Link href="/movie/Oppenheimer" style={{color:"#FFD700"}}>Oppenheimer</Link> and Denis Villeneuve{"'"}s
              <Link href="/movie/Dune%3A%20Part%20Two" style={{color:"#FFD700"}}> Dune Part Two</Link> proving that original, director-driven spectacle still fills theaters. iBommaFlix exists at this
              intersection — a discovery platform that treats Tollywood, Bollywood, and Hollywood with equal seriousness.
            </p>

            <h3 className="editorial-subheading">Tollywood: The Powerhouse That Rewrote Indian Box Office History</h3>
            <p>
              Telugu cinema, produced out of Hyderabad{"'"}s Ramoji Film City, has quietly overtaken
              Bollywood in annual film output since 2021. The turning point was <Link href="/movie/Baahubali%202%3A%20The%20Conclusion" style={{color:"#FFD700"}}>Baahubali: The Conclusion</Link> (2017), which
              earned ₹1,810 crore globally. Before that, <Link href="/movie/Magadheera" style={{color:"#FFD700"}}>Magadheera</Link> (2009) redefined visual effects expectations
              and <Link href="/movie/Eega" style={{color:"#FFD700"}}>Eega</Link> (2012) proved wildly original concepts could find commercial success. Today,
              Sukumar directs Allu Arjun in the <Link href="/movie/Pushpa%202" style={{color:"#FFD700"}}>Pushpa franchise</Link>. <Link href="/movie/Rangasthalam" style={{color:"#FFD700"}}>Rangasthalam</Link> (2018) offered gritty village drama earning ₹200+ crore.
              <Link href="/movie/Arjun%20Reddy" style={{color:"#FFD700"}}> Arjun Reddy</Link> (2017) launched Vijay Deverakonda and spawned the Hindi remake Kabir Singh.
            </p>

            <h3 className="editorial-subheading">Bollywood: A Century of Storytelling, from Raja Harishchandra to Pathaan</h3>
            <p>
              Hindi cinema{"'"}s history stretches back to 1913. Aamir Khan{"'"}s <Link href="/movie/Dangal" style={{color:"#FFD700"}}>Dangal</Link> (2016) earned ₹2,024 crore worldwide — the highest-grossing Indian film ever in China.
              <Link href="/movie/3%20Idiots" style={{color:"#FFD700"}}> 3 Idiots</Link> remains the film an entire generation quotes from memory. Shah Rukh Khan{"'"}s 2023
              comeback — <Link href="/movie/Pathaan" style={{color:"#FFD700"}}>Pathaan</Link>, <Link href="/movie/Jawan" style={{color:"#FFD700"}}>Jawan</Link>, and Dunki — collectively grossed over ₹2,500 crore.
              <Link href="/movie/12th%20Fail" style={{color:"#FFD700"}}> 12th Fail</Link> became 2023{"'"}s biggest sleeper hit. <Link href="/movie/Gangs%20of%20Wasseypur" style={{color:"#FFD700"}}>Gangs of Wasseypur</Link> gave Indian cinema its most ambitious crime epic. <Link href="/movie/Tumbbad" style={{color:"#FFD700"}}>Tumbbad</Link> merged mythology with horror.
              <Link href="/movie/Andhadhun" style={{color:"#FFD700"}}> Andhadhun</Link> earned universal acclaim and a National Film Award.
            </p>

            <h3 className="editorial-subheading">Hollywood: Where Auteur Vision Meets Global Scale</h3>
            <p>
              <Link href="/movie/The%20Dark%20Knight" style={{color:"#FFD700"}}>The Dark Knight</Link> (2008) redefined superhero cinema as serious drama. Nolan repeated this with <Link href="/movie/Interstellar" style={{color:"#FFD700"}}>Interstellar</Link> (2014) and
              <Link href="/movie/Oppenheimer" style={{color:"#FFD700"}}> Oppenheimer</Link> (2023), which earned $952 million and seven Oscars.
              <Link href="/movie/Dune%3A%20Part%20Two" style={{color:"#FFD700"}}> Dune Part Two</Link> (2024) delivered a $700 million global epic. <Link href="/movie/Everything%20Everywhere%20All%20at%20Once" style={{color:"#FFD700"}}>Everything Everywhere All at Once</Link> won seven Oscars on a $14.3M budget.
              <Link href="/movie/Pulp%20Fiction" style={{color:"#FFD700"}}> Pulp Fiction</Link> still appears on every greatest-films list. <Link href="/movie/Avengers%3A%20Endgame" style={{color:"#FFD700"}}>Avengers: Endgame</Link> hit $2.8 billion worldwide.
            </p>

            <h3 className="editorial-subheading">How Our Verdict System Cuts Through the Noise</h3>
            <p>
              Every film on iBommaFlix carries a plain-language watchability verdict alongside its IMDb score.
              Films rated above 8.0 earn a {"\""} Worth watching{"\""} tag. The 6.5 to 8.0 range receives {"\""} Good to watch.{"\""} Titles between 5.0 and 6.5 are marked {"\""} Average,{"\""} and below 5.0 carries {"\""}Not worth watching.{"\""}
            </p>

            <h3 className="editorial-subheading">Why Serious Film Fans Use iBommaFlix</h3>
            <p>
              iBommaFlix was built for viewers who follow <Link href="/category/tollywood" style={{color:"#FFD700"}}>Tollywood</Link>, <Link href="/category/bollywood" style={{color:"#FFD700"}}>Bollywood</Link>, and <Link href="/category/hollywood" style={{color:"#FFD700"}}>Hollywood</Link> with equal anticipation. We surface trending titles, aggregate reliable ratings, provide cast and crew details, and serve trailers — all free, fast, and built by someone who actually watches these films.
            </p>
          </div>
        </Container>
      </div>
    </>
  );
}
