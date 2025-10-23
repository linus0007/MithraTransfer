import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { getPricingByRegion, getRegions } from '@/lib/pricing';
import type { PricingRecord } from '@/types/pricing';

export const metadata: Metadata = {
  title: 'Destinations & Regional Pricing',
  description: 'Browse Mithra Travel routes with the most popular Antalya destinations and indicative passenger car pricing.'
};

export const revalidate = 3600;

function basePrice(record: PricingRecord) {
  return (
    record.prices.car ??
    record.prices.minibus ??
    record.prices.crafter ??
    record.prices.ultralux ??
    null
  );
}

export default async function DestinationsPage() {
  const regions = await getRegions();
  const priceFormatter = new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  });
  const regionBlocks = await Promise.all(
    regions.map(async (region) => {
      const pricing = await getPricingByRegion(region);
      const filtered = pricing
        .map((record) => ({ record, price: basePrice(record) }))
        .filter((entry) => entry.price !== null)
        .sort((a, b) => (a.price ?? 0) - (b.price ?? 0))
        .slice(0, 6);

      return {
        region,
        destinations: filtered.map((entry) => ({
          name: entry.record.to,
          price: entry.price as number
        }))
      };
    })
  );

  const showcase = regionBlocks.filter((block) => block.destinations.length > 0).slice(0, 10);

  return (
    <div className="flex min-h-screen flex-col">
      <Header
        variant="compact"
        title="Destinations"
        description="Hand-picked highlights from more than a thousand Antalya routes served by Mithra Travel."
      />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-12">
        <section className="grid gap-6 md:grid-cols-2">
          {showcase.map((block) => (
            <div key={block.region} className="card px-6 py-6">
              <h2 className="text-lg font-semibold text-slate-900">{block.region}</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-600">
                {block.destinations.map((destination) => (
                  <li key={destination.name} className="flex items-center justify-between">
                    <span>{destination.name}</span>
                    <span className="font-semibold text-brand-500">{priceFormatter.format(destination.price)}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
