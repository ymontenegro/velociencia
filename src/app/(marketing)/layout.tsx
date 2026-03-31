import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TrendingBar } from "@/components/layout/trending-bar";
import { CookieConsent } from "@/components/shared/cookie-consent";
import { getLocale } from "@/lib/i18n";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();

  return (
    <>
      <Header />
      <TrendingBar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CookieConsent locale={locale} />
    </>
  );
}
