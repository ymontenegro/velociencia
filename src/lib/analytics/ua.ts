// Lightweight user-agent parsing — only what we need for analytics.
// Avoids the 200kb ua-parser-js dependency.

export type ParsedUA = {
  device: "desktop" | "mobile" | "tablet" | "bot";
  browser: string;
  os: string;
};

const BOT_RX = /(bot|crawler|spider|crawling|preview|fetch|monitor|headless|axios|curl|wget|node-fetch|python|java|ruby|go-http)/i;

export function parseUserAgent(ua: string | null | undefined): ParsedUA {
  if (!ua) return { device: "desktop", browser: "unknown", os: "unknown" };

  if (BOT_RX.test(ua)) {
    return { device: "bot", browser: "bot", os: "unknown" };
  }

  // Device detection
  const isTablet = /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/i.test(ua);
  const isMobile =
    !isTablet &&
    /(mobile|iphone|ipod|android.+mobile|blackberry|iemobile|opera mini|windows phone)/i.test(
      ua
    );
  const device: ParsedUA["device"] = isTablet
    ? "tablet"
    : isMobile
      ? "mobile"
      : "desktop";

  // OS detection (order matters)
  let os = "unknown";
  if (/windows nt 10/i.test(ua)) os = "Windows 10/11";
  else if (/windows nt 6\.3/i.test(ua)) os = "Windows 8.1";
  else if (/windows nt 6\.[12]/i.test(ua)) os = "Windows 7/8";
  else if (/windows/i.test(ua)) os = "Windows";
  else if (/iphone os|ipad os|ios/i.test(ua)) os = "iOS";
  else if (/mac os x/i.test(ua)) os = "macOS";
  else if (/android/i.test(ua)) os = "Android";
  else if (/cros/i.test(ua)) os = "ChromeOS";
  else if (/linux/i.test(ua)) os = "Linux";

  // Browser detection (order matters: Edge before Chrome, Chrome before Safari)
  let browser = "Other";
  if (/edg\//i.test(ua)) browser = "Edge";
  else if (/opr\/|opera/i.test(ua)) browser = "Opera";
  else if (/firefox/i.test(ua)) browser = "Firefox";
  else if (/chrome|crios/i.test(ua)) browser = "Chrome";
  else if (/safari/i.test(ua) && /version\//i.test(ua)) browser = "Safari";

  return { device, browser, os };
}
