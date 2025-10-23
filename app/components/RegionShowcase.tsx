interface RegionShowcaseProps {
  regions: Array<{ name: string; count: number }>;
  total: number;
}

export default function RegionShowcase({ regions, total }: RegionShowcaseProps) {
  if (regions.length === 0) {
    return null;
  }

  return (
    <section className="card px-6 py-8">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Popular pick-up regions</h2>
          <p className="text-sm text-slate-600">
            The complete database spans {total} routes from Antalya Airport and regional hubs. Explore a few highlights below.
          </p>
        </div>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {regions.map((region) => (
          <div key={region.name} className="rounded-2xl border border-slate-100 bg-slate-50/80 px-5 py-5">
            <h3 className="text-lg font-semibold text-slate-900">{region.name}</h3>
            <p className="text-sm text-slate-600">{region.count} destinations with live vehicle pricing.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
