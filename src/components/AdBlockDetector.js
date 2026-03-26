"use client";
import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import "./AdBlockDetector.css";

const AdBlockDetector = ({ children }) => {
  const [adBlocked, setAdBlocked] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const checkAdBlocker = async () => {
      try {
        await fetch(
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
          { method: "HEAD", mode: "no-cors" }
        );
        setAdBlocked(false);
      } catch {
        setAdBlocked(true);
      }
    };
    checkAdBlocker();
  }, []);

  // Reset dismissed state on route change (gentle reminder)
  useEffect(() => {
    setDismissed(false);
  }, [pathname]);

  return (
    <>
      {children}
      {adBlocked && !dismissed && (
        <div className="adblocker-banner">
          <div className="adblocker-banner-content">
            <div className="adblocker-banner-text">
              <span className="adblocker-banner-icon" role="img" aria-label="shield">&#128737;</span>
              <div>
                <p className="adblocker-banner-title">Ad Blocker Detected</p>
                <p className="adblocker-banner-desc">
                  iBommaFlix is free thanks to ads. Please consider disabling your ad blocker to support us!
                </p>
              </div>
            </div>
            <button
              className="adblocker-banner-close"
              onClick={() => setDismissed(true)}
              aria-label="Dismiss"
            >
              &#10005;
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdBlockDetector;
