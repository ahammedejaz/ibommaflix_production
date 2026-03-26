import HomeClient from "@/src/views/Home";

export const metadata = {
  title: "iBommaFlix - Discover Telugu, Hindi & English Movies | Ratings & Reviews",
  description: "Discover trending Tollywood, Bollywood and Hollywood movies. Get IMDb ratings, plot summaries, cast details and watchability verdicts on iBommaFlix.",
  alternates: { canonical: "https://ibommaflix.com/" },
  openGraph: {
    title: "iBommaFlix - Discover Telugu, Hindi & English Movies | Ratings & Reviews",
    description: "Discover trending Tollywood, Bollywood and Hollywood movies. Get IMDb ratings, plot summaries, cast details and watchability verdicts on iBommaFlix.",
    url: "https://ibommaflix.com/",
  },
  twitter: {
    title: "iBommaFlix - Discover Telugu, Hindi & English Movies",
    description: "Discover trending Tollywood, Bollywood and Hollywood movies with ratings and reviews.",
  },
};

export default function HomePage() {
  return <HomeClient />;
}
