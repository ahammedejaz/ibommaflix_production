import Script from "next/script";
import ScrollToTop from "@/src/components/ScrollToTop";
import AdBlockDetector from "@/src/components/AdBlockDetector";
import Footer from "@/src/components/Footer";
import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://ibommaflix.com"),
  title: {
    default: "iBommaFlix - Discover Telugu, Hindi & English Movies | Ratings & Reviews",
    template: "%s | iBommaFlix",
  },
  description: "Discover trending Tollywood, Bollywood and Hollywood movies. Get IMDb ratings, plot summaries, cast details and watchability verdicts on iBommaFlix.",
  openGraph: {
    type: "website",
    siteName: "iBommaFlix",
    images: [{ url: "/logo512.png", width: 512, height: 512 }],
  },
  twitter: {
    card: "summary_large_image",
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/logo192.png",
  },
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.themoviedb.org" />
        <link rel="preconnect" href="https://image.tmdb.org" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://image.tmdb.org" />
        <link rel="preconnect" href="https://www.omdbapi.com" />
        <link rel="dns-prefetch" href="https://www.omdbapi.com" />
      </head>
      <body>
        {/* Site-wide JSON-LD — server-rendered, visible to all crawlers */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "iBommaFlix",
            "url": "https://ibommaflix.com",
            "description": "Movie discovery and rating aggregation platform for Telugu, Hindi, and English movies",
            "potentialAction": {
              "@type": "SearchAction",
              "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://ibommaflix.com/movie/{search_term_string}"
              },
              "query-input": "required name=search_term_string"
            }
          }) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "iBommaFlix",
            "url": "https://ibommaflix.com",
            "logo": {
              "@type": "ImageObject",
              "url": "https://ibommaflix.com/logo512.png",
              "width": 512,
              "height": 512
            },
            "description": "Movie discovery and rating aggregation platform for Telugu, Hindi, and English movies",
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer support",
              "url": "https://ibommaflix.com/contact"
            }
          }) }}
        />
        <AdBlockDetector>
          <ScrollToTop />
          <div className="app-container">
            {children}
            <Footer />
          </div>
        </AdBlockDetector>

        {/* Google Analytics (GA4) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-13BP0DFQ6Z"
          strategy="lazyOnload"
        />
        <Script id="ga4-config" strategy="lazyOnload">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-13BP0DFQ6Z');`}
        </Script>

        {/* Google AdSense */}
        <Script
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3321228464173831"
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      </body>
    </html>
  );
}
