import type { Metadata } from "next";
import { Space_Grotesk, DM_Sans } from "next/font/google";
import { SITE_NAME, SITE_DESCRIPTION } from "@/lib/constants";
import { ThemeProvider } from "@/components/theme-provider";
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

export const metadata: Metadata = {
  title: {
    default: SITE_NAME,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${dmSans.variable} h-full`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/katex@0.16.0/dist/katex.min.css"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <ThemeProvider>
          {children}
        </ThemeProvider>
        {/* Decorative grain overlay */}
        <div className="grain-overlay" aria-hidden="true" />
      </body>
    </html>
  );
}
