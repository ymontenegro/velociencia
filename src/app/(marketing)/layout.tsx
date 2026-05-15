import { Suspense } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { TrendingBar } from "@/components/layout/trending-bar";
import { PageTracker } from "@/components/analytics/page-tracker";
import { getLocale } from "@/lib/i18n";

export default async function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <>
      <Suspense fallback={null}>
        <PageTracker locale={locale} />
      </Suspense>
      <Header />
      <TrendingBar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
