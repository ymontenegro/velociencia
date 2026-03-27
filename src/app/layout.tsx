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

  return {
    title: {
      default: siteName,
      template: `%s | ${siteName}`,
    },
    description: siteDescription,
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
