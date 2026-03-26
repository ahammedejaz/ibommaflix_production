"use client";
import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const AdBanner = ({ adSlot, adFormat = "auto", responsive = true }) => {
  const adRef = useRef(null);
  const pathname = usePathname();
  const [adBlocked, setAdBlocked] = useState(false);

  useEffect(() => {
    // Detect if adsbygoogle script was blocked
    if (!window.adsbygoogle) {
      setAdBlocked(true);
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      setAdBlocked(true);
    }
  }, [pathname]);

  if (adBlocked) return null;

  return (
    <div style={{ textAlign: "center", margin: "20px 0", minHeight: "90px", maxWidth: "100%", overflow: "hidden" }}>
      <p style={{ color: "#555", fontSize: "11px", marginBottom: "4px" }}>Advertisement</p>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={process.env.REACT_APP_ADSENSE_PUB_ID || "ca-pub-XXXXXXXXXXXXXXXX"}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? "true" : "false"}
        ref={adRef}
        key={pathname}
      />
    </div>
  );
};

export default AdBanner;
