import PrivacyPolicyClient from "@/src/views/PrivacyPolicy";
export const metadata = {
  title: "Privacy Policy - iBommaFlix",
  description: "Read iBommaFlix's privacy policy. Learn how we collect, use, and protect your personal information.",
  alternates: { canonical: "https://ibommaflix.com/privacy-policy" },
  openGraph: { title: "Privacy Policy - iBommaFlix", url: "https://ibommaflix.com/privacy-policy" },
};
export default function PrivacyPolicyPage() { return <PrivacyPolicyClient />; }
