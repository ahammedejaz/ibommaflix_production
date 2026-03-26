import TermsOfServiceClient from "@/src/views/TermsOfService";
export const metadata = {
  title: "Terms of Service - iBommaFlix",
  description: "Read the terms of service for using iBommaFlix movie discovery platform.",
  alternates: { canonical: "https://ibommaflix.com/terms-of-service" },
  openGraph: { title: "Terms of Service - iBommaFlix", url: "https://ibommaflix.com/terms-of-service" },
};
export default function TermsPage() { return <TermsOfServiceClient />; }
