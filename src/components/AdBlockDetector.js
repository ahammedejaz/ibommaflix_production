import React, { useState, useEffect } from "react";
import "./AdBlockDetector.css";

const AdBlockDetector = ({ children }) => {
  const [adBlocked, setAdBlocked] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const detectAdBlocker = async () => {
      try {
        // Try to fetch the AdSense script — ad blockers will block this
        await fetch(
          "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js",
          { method: "HEAD", mode: "no-cors" }
        );
        setAdBlocked(false);
      } catch {
        setAdBlocked(true);
      }
      setChecking(false);
    };

    // Small delay to let ad blocker extensions initialize
    const timer = setTimeout(detectAdBlocker, 500);
    return () => clearTimeout(timer);
  }, []);

  // Re-check when user clicks the button (they may have disabled the blocker)
  const handleRecheck = () => {
    setChecking(true);
    // Force a fresh check by reloading
    window.location.reload();
  };

  if (checking) return children;

  if (adBlocked) {
    return (
      <div className="adblock-wall">
        <div className="adblock-modal">
          <div className="adblock-icon">🛡️</div>
          <h2 className="adblock-title">Ad Blocker Detected</h2>
          <p className="adblock-message">
            iBommaFlix is a <strong>free platform</strong> supported by ads.
            Please disable your ad blocker to continue using the site.
          </p>
          <div className="adblock-steps">
            <p className="adblock-steps-title">How to disable:</p>
            <ol>
              <li>Click the ad blocker icon in your browser toolbar</li>
              <li>Select "Pause" or "Disable" for this site</li>
              <li>Click the button below to refresh</li>
            </ol>
          </div>
          <button className="adblock-btn" onClick={handleRecheck}>
            I've Disabled It — Refresh
          </button>
          <p className="adblock-footer">
            We respect your experience — our ads are non-intrusive and help keep iBommaFlix free.
          </p>
        </div>
      </div>
    );
  }

  return children;
};

export default AdBlockDetector;
