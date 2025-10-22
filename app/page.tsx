import Header from '@/app/components/Header';
import Controls from '@/app/components/Controls';
import Footer from '@/app/components/Footer';
import LanguageCurrencyBar from '@/app/components/LanguageCurrencyBar';
import PricingTable from '@/app/components/PricingTable';
import { getRegions } from '@/lib/pricing';

export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function HomePage() {
  const regions = await getRegions();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-6 px-6 py-10">
        <LanguageCurrencyBar />
        <Controls regions={regions} />
        <PricingTable />
      </main>
      <Footer />
    </div>
  );
}
