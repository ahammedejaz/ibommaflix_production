import DisclaimerClient from "@/src/views/Disclaimer";
export const metadata = {
  title: "Disclaimer - iBommaFlix",
  description: "Read iBommaFlix's disclaimer about movie ratings, reviews and content accuracy.",
  alternates: { canonical: "https://ibommaflix.com/disclaimer" },
  openGraph: { title: "Disclaimer - iBommaFlix", url: "https://ibommaflix.com/disclaimer" },
};
export default function DisclaimerPage() { return <DisclaimerClient />; }
