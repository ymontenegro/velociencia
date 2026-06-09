"use client";

import { useEffect } from "react";

/**
 * Creates the hidden `googlefcPresent` iframe that Google Funding Choices
 * expects to find in the DOM. Using useEffect ensures it survives React
 * hydration (a plain <script> in <head> gets its DOM additions wiped out).
 */
export function GoogleFcSignal() {
  useEffect(() => {
    // window.frames has no string index signature in the TS lib; double-cast
    // through unknown to avoid any while still checking frame existence by name.
    if ((window.frames as unknown as Record<string, Window | undefined>)["googlefcPresent"]) return;

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
