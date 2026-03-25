import React, { Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import AdBlockDetector from "./components/AdBlockDetector";

const MovieDetails = React.lazy(() => import("./pages/MovieDetails"));
const CategoryPage = React.lazy(() => import("./pages/CategoryPage"));
const About = React.lazy(() => import("./pages/About"));
const Contact = React.lazy(() => import("./pages/Contact"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
const PrivacyPolicy = React.lazy(() => import("./pages/PrivacyPolicy"));
const TermsOfService = React.lazy(() => import("./pages/TermsOfService"));
const Disclaimer = React.lazy(() => import("./pages/Disclaimer"));

const LazyFallback = () => (
  <div style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
    backgroundColor: "#000",
    color: "#FFD700",
    fontFamily: "Poppins, sans-serif",
    fontSize: "18px",
  }}>
    Loading...
  </div>
);

const App = () => {
  return (
    <Router>
      <AdBlockDetector>
        <ScrollToTop />
        <div className="app-container">
          <Suspense fallback={<LazyFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:title" element={<MovieDetails />} />
              <Route path="/category/:type" element={<CategoryPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/disclaimer" element={<Disclaimer />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <Footer />
        </div>
      </AdBlockDetector>
    </Router>
  );
};

export default App;
