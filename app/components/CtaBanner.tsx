import Link from 'next/link';

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-brand-500 to-teal-500 px-8 py-10 text-white shadow-soft">
      <div className="max-w-2xl space-y-3">
        <h2 className="text-2xl font-semibold md:text-3xl">Need a bespoke itinerary?</h2>
        <p className="text-sm md:text-base">
          Our Antalya concierge desk organises return journeys, hourly chauffeuring, yacht transfers, and cross-country tours
          throughout Türkiye.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/contact"
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-brand-500 transition hover:bg-slate-100"
          >
            Contact the concierge
          </Link>
          <Link
            href="/services"
            className="rounded-full border border-white/70 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View all services
          </Link>
        </div>
      </div>
      <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/20 blur-3xl" aria-hidden />
    </section>
  );
}
