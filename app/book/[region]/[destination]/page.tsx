import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getRegions, getPricingByRegion } from '@/lib/pricing';
import { slugify } from '@/lib/slug';

interface BookingPageProps {
  params: { region: string; destination: string };
}

export async function generateStaticParams() {
  const regions = await getRegions();
  const params: BookingPageProps['params'][] = [];

  for (const region of regions) {
    const records = await getPricingByRegion(region);
    const regionSlug = slugify(region);
    records.forEach((record) => {
      params.push({
        region: regionSlug,
        destination: slugify(record.to)
      });
    });
  }

  return params;
}

export default async function BookingPage({ params }: BookingPageProps) {
  const regionSlug = params.region;
  const destinationSlug = params.destination;
  const regions = await getRegions();
  const regionName = regions.find((region) => slugify(region) === regionSlug);

  if (!regionName) {
    notFound();
  }

  const records = await getPricingByRegion(regionName);
  const match = records.find((record) => slugify(record.to) === destinationSlug);

  if (!match) {
    notFound();
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-4xl flex-col gap-8 px-6 py-12">
      <div>
        <h1 className="text-3xl font-semibold text-slate-900">{match.to}</h1>
        <p className="mt-2 text-slate-600">
          Booking for routes from <span className="font-medium">{regionName}</span> to <span className="font-medium">{match.to}</span>{' '}
          is coming soon. Contact our team for bespoke itineraries.
        </p>
      </div>
      <Link
        href="/"
        className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-500 px-5 py-2 text-sm font-semibold text-white shadow hover:bg-teal-500"
      >
        ← Back to pricing
      </Link>
    </div>
  );
}
