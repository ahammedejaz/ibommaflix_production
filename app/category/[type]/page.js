import Link from "next/link";
import CategoryPageClient from "@/src/views/CategoryPage";

const categoryLabels = {
  tollywood: "Tollywood",
  bollywood: "Bollywood",
  hollywood: "Hollywood",
};

const categoryMeta = {
  tollywood: {
    title: "Tollywood Movies - Latest & Trending Telugu Movies",
    description: "Browse the latest and trending Tollywood Telugu movies. Discover ratings, reviews and recommendations on iBommaFlix.",
  },
  bollywood: {
    title: "Bollywood Movies - Latest & Trending Hindi Movies",
    description: "Browse the latest and trending Bollywood Hindi movies. Discover ratings, reviews and recommendations on iBommaFlix.",
  },
  hollywood: {
    title: "Hollywood Movies - Latest & Trending English Movies",
    description: "Browse the latest and trending Hollywood English movies. Discover ratings, reviews and recommendations on iBommaFlix.",
  },
};

export async function generateMetadata({ params }) {
  const { type } = await params;
  const meta = categoryMeta[type] || { title: "Movies", description: "Browse movies on iBommaFlix." };
  const canonicalUrl = `https://ibommaflix.com/category/${type}`;

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalUrl,
    },
    twitter: {
      title: meta.title,
      description: meta.description,
    },
  };
}

function MovieLink({ title, children }) {
  return (
    <Link
      href={`/movie/${encodeURIComponent(title)}`}
      style={{ color: "#FFD700", textDecoration: "none", borderBottom: "1px dotted #FFD700" }}
    >
      {children || title}
    </Link>
  );
}

function TollywoodDescription() {
  return (
    <>
      <p className="category-description-intro">
        Something seismic shifted in Indian cinema when S.S. Rajamouli released{" "}
        <MovieLink title="Baahubali 2: The Conclusion">Baahubali 2: The Conclusion</MovieLink>{" "}
        in 2017 and it collected over &#8377;1,810 crore worldwide. That was not just a box office
        record &mdash; it was a declaration that Telugu cinema had arrived on the global stage. Then{" "}
        <MovieLink title="RRR" /> happened. Jr. NTR and Ram Charan dancing to &quot;Naatu Naatu&quot;
        at the Oscars was not something anyone predicted, yet it felt inevitable in hindsight.
        Tollywood had been building toward this moment for years, through{" "}
        <MovieLink title="Magadheera">Magadheera&apos;s</MovieLink> mythological grandeur,{" "}
        <MovieLink title="Eega">Eega&apos;s</MovieLink> audacious premise of a man reincarnated as
        a fly seeking revenge, and <MovieLink title="Rangasthalam">Rangasthalam&apos;s</MovieLink>{" "}
        earthy, dialect-rich period drama that proved rural stories could dominate the box office.
      </p>
      <p className="category-description-detail">
        The industry&apos;s current golden era runs deep. Sukumar turned Allu Arjun into a national
        phenomenon with <MovieLink title="Pushpa: The Rise">Pushpa: The Rise</MovieLink>, earning
        Arjun the National Award for Best Actor and making &quot;Thaggede Le&quot; a catchphrase
        heard from Hyderabad to Hamburg. The{" "}
        <MovieLink title="Pushpa 2: The Rule">Pushpa series</MovieLink> cemented what audiences
        already knew: Telugu cinema does not just compete with Bollywood, it outpaces it. In
        2022-2023, Tollywood actually surpassed Hindi cinema in domestic box office collections
        &mdash; a staggering achievement for a regional industry. Sandeep Reddy Vanga&apos;s{" "}
        <MovieLink title="Arjun Reddy" /> was so culturally explosive that Bollywood remade it
        shot-for-shot as Kabir Singh, and it still could not capture the raw nerve of the original.
        Prabhas went from <MovieLink title="Baahubali: The Beginning">Baahubali&apos;s</MovieLink>{" "}
        warrior king to the sci-fi ambitions of <MovieLink title="Kalki 2898 AD" />. Mahesh Babu
        remains the industry&apos;s most bankable leading man. Nani keeps delivering sleeper hits
        that punch above their budget. Directors like Trivikram Srinivas blend mass entertainment
        with sharp writing in ways that feel effortless. All of this happens out of Hyderabad, home
        to Ramoji Film City &mdash; the world&apos;s largest film studio complex &mdash; a fitting
        headquarters for an industry that thinks bigger than anyone else. Browse the latest trending
        Telugu movies below, complete with IMDb ratings and our watchability verdicts.
      </p>
    </>
  );
}

function BollywoodDescription() {
  return (
    <>
      <p className="category-description-intro">
        Bollywood began with Raja Harishchandra in 1913 and has not stopped reinventing itself since.
        Producing 1,500 to 2,000 films a year across every genre imaginable, the Hindi film industry
        is less a factory and more an ecosystem &mdash; one that sustains everything from Sanjay
        Leela Bhansali&apos;s lavish period spectacles to Anurag Kashyap&apos;s{" "}
        <MovieLink title="Gangs of Wasseypur" />, a five-hour crime epic that plays like Scorsese
        filtered through the dust and diesel of rural Bihar. The industry&apos;s reach extends far
        beyond India: from the packed theaters of Dubai and Toronto to the living rooms of the global
        Indian diaspora, Bollywood is often the first and most enduring connection people have to
        Indian culture.
      </p>
      <p className="category-description-detail">
        The numbers alone tell a remarkable story. Aamir Khan&apos;s{" "}
        <MovieLink title="Dangal" /> earned over &#8377;2,024 crore globally, becoming the
        highest-grossing Indian film ever in China, where audiences who had never heard of Indian
        wrestling were openly weeping in theaters. Rajkumar Hirani&apos;s{" "}
        <MovieLink title="3 Idiots" /> became a cultural touchstone across Asia, quoted in boardrooms
        and classrooms alike. Then Shah Rukh Khan, after years of box office disappointments that had
        critics writing his obituary, stormed back with <MovieLink title="Pathaan" /> and{" "}
        <MovieLink title="Jawan" /> in the same year, silencing every doubter with combined
        collections that redefined what a comeback looks like. But Bollywood&apos;s real strength is
        not in its tentpoles &mdash; it is in films like <MovieLink title="12th Fail" />, a quiet,
        devastating story about civil service aspirants that became one of 2023&apos;s biggest
        sleeper hits purely through word of mouth. It is in{" "}
        <MovieLink title="Andhadhun" />, Sriram Raghavan&apos;s pitch-black thriller about a blind
        pianist that keeps pulling the rug out from under you. It is in{" "}
        <MovieLink title="Tumbbad" />, a horror film so visually stunning and mythologically rich
        that it developed a cult following years after its modest theatrical run. It is in the{" "}
        <MovieLink title="Stree 2">Stree franchise</MovieLink>, which proved that horror-comedy
        could be a genuine blockbuster genre. Directors like Zoya Akhtar bring literary sensibility
        to mainstream cinema, while stars like Deepika Padukone and Alia Bhatt have expanded what a
        leading role for women in Hindi cinema can be. Explore trending Hindi movies below with
        ratings, cast details, and plot summaries to find your next favorite film.
      </p>
    </>
  );
}

function HollywoodDescription() {
  return (
    <>
      <p className="category-description-intro">
        When Christopher Nolan convinced a studio to detonate a practical nuclear explosion for{" "}
        <MovieLink title="Oppenheimer" /> rather than use CGI, and that film went on to win seven
        Academy Awards and earn $953 million worldwide, it confirmed something that the streaming era
        tried to deny: cinema made for the big screen still matters. Hollywood has been handing out
        Oscars since 1929, and nearly a century later, the American film industry remains the
        gravitational center of global moviemaking. But the landscape looks radically different now.
        The same year Oppenheimer dominated,{" "}
        <MovieLink title="Everything Everywhere All at Once" /> &mdash; a mid-budget, genre-defying
        film by the Daniels about a laundromat owner fighting across multiverses &mdash; swept the
        previous ceremony with seven Oscars of its own, proving that original storytelling can still
        break through.
      </p>
      <p className="category-description-detail">
        The range of what Hollywood produces is staggering. Nolan alone accounts for three of the
        most rewatchable films of the last two decades:{" "}
        <MovieLink title="The Dark Knight" /> redefined superhero cinema as serious drama,{" "}
        <MovieLink title="Inception" /> turned a heist movie into a philosophical puzzle box, and{" "}
        <MovieLink title="Interstellar" /> made astrophysics feel like a love story. Denis
        Villeneuve took Frank Herbert&apos;s supposedly unfilmable Dune and turned it into the kind
        of sweeping, sand-choked epic that demands an IMAX screen, with Timoth&eacute;e Chalamet
        anchoring <MovieLink title="Dune: Part Two">Part Two</MovieLink> with genuine movie-star
        gravity. Quentin Tarantino&apos;s <MovieLink title="Pulp Fiction" /> still feels like the
        coolest film ever made, thirty years on. Cillian Murphy went from character actor to leading
        man overnight with Oppenheimer. Robert Downey Jr. bookended his Marvel decade by winning an
        Oscar for playing a completely different kind of genius. Margot Robbie turned a toy
        commercial into a billion-dollar cultural event with <MovieLink title="Barbie" />. And then
        there is the Marvel machine: <MovieLink title="Avengers: Endgame" /> hit $2.8 billion
        worldwide, a number so absurd it may never be topped, though{" "}
        <MovieLink title="Deadpool & Wolverine" /> proved audiences will still show up in massive
        numbers for the right superhero film. The streaming wars have reshaped distribution, but the
        theatrical experience is fighting back, and the directors and stars driving that fight are
        making some of the most ambitious work in Hollywood&apos;s history. Discover the latest
        trending Hollywood releases below with comprehensive ratings and recommendations.
      </p>
    </>
  );
}

const descriptionComponents = {
  tollywood: TollywoodDescription,
  bollywood: BollywoodDescription,
  hollywood: HollywoodDescription,
};

export default async function CategoryRoute({ params }) {
  const { type } = await params;
  const label = categoryLabels[type];
  const canonicalUrl = `https://ibommaflix.com/category/${type}`;
  const DescriptionComponent = descriptionComponents[type];

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://ibommaflix.com/" },
      { "@type": "ListItem", position: 2, name: `${label || "Category"} Movies`, item: canonicalUrl },
    ],
  };

  return (
    <>
      {/* Server-rendered BreadcrumbList JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Server-rendered editorial content with internal links */}
      {label && DescriptionComponent && (
        <div className="category-ssr-wrapper">
          <h1 className="category-page-title">{label} Movies</h1>
          <div className="category-description">
            <DescriptionComponent />
          </div>
        </div>
      )}

      {/* Client component handles the interactive movie grid */}
      <CategoryPageClient typeParam={type} />
    </>
  );
}
