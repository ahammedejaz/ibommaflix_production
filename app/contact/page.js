import ContactClient from "@/src/views/Contact";
export const metadata = {
  title: "Contact Us - iBommaFlix",
  description: "Get in touch with the iBommaFlix team. We'd love to hear your feedback, suggestions, and movie recommendations.",
  alternates: { canonical: "https://ibommaflix.com/contact" },
  openGraph: { title: "Contact Us - iBommaFlix", description: "Get in touch with the iBommaFlix team.", url: "https://ibommaflix.com/contact" },
};
export default function ContactPage() { return <ContactClient />; }
