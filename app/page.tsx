import Header from '@/app/components/Header';
import Controls from '@/app/components/Controls';
import Footer from '@/app/components/Footer';
import Highlights from '@/app/components/Highlights';
import HowItWorks from '@/app/components/HowItWorks';
import LanguageCurrencyBar from '@/app/components/LanguageCurrencyBar';
import PricingTable from '@/app/components/PricingTable';
import RegionShowcase from '@/app/components/RegionShowcase';
import SeoContent from '@/app/components/SeoContent';
import Testimonials from '@/app/components/Testimonials';
import CtaBanner from '@/app/components/CtaBanner';
import { getRegionSummary, getRegions } from '@/lib/pricing';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function HomePage() {
  const [regions, regionSummary] = await Promise.all([getRegions(), getRegionSummary()]);
  const totalRoutes = Object.values(regionSummary).reduce((total, count) => total + count, 0);
  const showcaseRegions = Object.entries(regionSummary)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 6);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
        <LanguageCurrencyBar />
        <Controls regions={regions} />
        <PricingTable />
        <Highlights />
        <RegionShowcase regions={showcaseRegions} total={totalRoutes} />
        <HowItWorks />
        <Testimonials />
        <SeoContent />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
