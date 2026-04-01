"use client";

import { useEffect } from "react";

/**
 * Creates the hidden `googlefcPresent` iframe that Google Funding Choices
 * expects to find in the DOM. Using useEffect ensures it survives React
 * hydration (a plain <script> in <head> gets its DOM additions wiped out).
 */
export function GoogleFcSignal() {
  useEffect(() => {
    if (window.frames["googlefcPresent" as any]) return;

    const iframe = document.createElement("iframe");
    iframe.style.cssText =
      "width:0;height:0;border:none;z-index:-1000;left:-1000px;top:-1000px;position:absolute;display:none";
    iframe.name = "googlefcPresent";
    document.body.appendChild(iframe);

    return () => {
      iframe.remove();
    };
  }, []);

  return null;
}
