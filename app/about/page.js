import AboutClient from "@/src/views/About";
export const metadata = {
  title: "About iBommaFlix - Your Movie Discovery Platform",
  description: "Learn about iBommaFlix - your ultimate destination for discovering Telugu, Hindi and English movies with ratings, reviews and recommendations.",
  alternates: { canonical: "https://ibommaflix.com/about" },
  openGraph: { title: "About iBommaFlix", description: "Learn about iBommaFlix - your movie discovery platform.", url: "https://ibommaflix.com/about" },
};
export default function AboutPage() { return <AboutClient />; }
