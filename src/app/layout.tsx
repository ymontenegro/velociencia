import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { SITE_NAME, SITE_DESCRIPTION, SITE_NAME_I18N, SITE_DESCRIPTION_I18N } from "@/lib/constants";
import { ThemeProvider } from "@/components/theme-provider";
import { LocaleProvider } from "@/components/locale-provider";
import { getLocale } from "@/lib/i18n";
import { getDictionary } from "@/lib/i18n/dictionaries";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const siteName = SITE_NAME_I18N[locale] ?? SITE_NAME;
  const siteDescription = SITE_DESCRIPTION_I18N[locale] ?? SITE_DESCRIPTION;
  const siteUrl = locale === "en" ? "https://pedalsci.com" : "https://velociencia.cl";

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_US" : "es_CL",
      siteName,
      title: siteName,
      description: siteDescription,
      url: siteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title: siteName,
      description: siteDescription,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: siteUrl,
      languages: {
        es: "https://velociencia.cl",
        en: "https://pedalsci.com",
      },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <html
      lang={locale}
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
        />
        <link rel="alternate" hrefLang="es" href="https://velociencia.cl" />
        <link rel="alternate" hrefLang="en" href="https://pedalsci.com" />
        <link rel="alternate" hrefLang="x-default" href="https://velociencia.cl" />
        {/* Google Funding Choices (CMP) — consent management */}
        <script
          async
          src="https://fundingchoicesmessages.google.com/i/pub-3852673931467935?ers=1"
        />
        <script dangerouslySetInnerHTML={{ __html: `(function() {function signalGooglefcPresent(){if(!window.frames['googlefcPresent']){if(document.body){const e=document.createElement('iframe');e.style='width:0;height:0;border:none;z-index:-1000;left:-1000px;top:-1000px;';e.style.display='none';e.name='googlefcPresent';document.body.appendChild(e);}else{setTimeout(signalGooglefcPresent,0);}}};signalGooglefcPresent();})();` }} />
        {/* Google AdSense — loads conditionally based on cookie consent */}
        <script dangerouslySetInnerHTML={{ __html: `(function(){try{var c=localStorage.getItem('cookie-consent');if(c==='rejected')return;var s=document.createElement('script');s.async=true;s.crossOrigin='anonymous';s.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3852673931467935';document.head.appendChild(s);}catch(e){}})();` }} />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          <LocaleProvider locale={locale} dict={dict}>
            {children}
          </LocaleProvider>
        </ThemeProvider>
        {/* Decorative grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
