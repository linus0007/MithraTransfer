import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import SeoContent from '@/app/components/SeoContent';

export const metadata: Metadata = {
  title: 'About Mithra Travel',
  description:
    'Discover the Mithra Travel story – Antalya transfer specialists delivering premium airport journeys and concierge services since 2005.'
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        variant="compact"
        title="About Mithra Travel"
        description="Independent Antalya transfer specialists with two decades of hospitality experience across the Turkish Riviera."
      />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 py-12">
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Who we are</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Founded in 2005, Mithra Travel began as a boutique Antalya airport transfer service focused on luxury resorts in Lara
            and Belek. Over the years we have expanded to cover the entire Mediterranean coastline, Cappadocia, Pamukkale, and
            bespoke itineraries throughout Türkiye.
          </p>
          <p className="text-sm leading-relaxed text-slate-600">
            Our in-house concierge, multilingual drivers, and operations desk work in harmony to deliver punctual, comfortable,
            and safe journeys. We operate a carefully curated fleet of business sedans, Mercedes Vito UltraLux vans, Sprinter
            Crafter minibuses, and deluxe coaches for group incentives.
          </p>
        </section>

        <section className="grid gap-6 rounded-3xl bg-slate-50/80 px-6 py-8 md:grid-cols-3">
          {[
            { title: '20+', subtitle: 'Years serving Antalya visitors' },
            { title: '1,100+', subtitle: 'Routes published with fixed pricing' },
            { title: '7', subtitle: 'Languages supported across the platform' }
          ].map((stat) => (
            <div key={stat.title} className="space-y-2">
              <p className="text-3xl font-bold text-brand-500">{stat.title}</p>
              <p className="text-sm text-slate-600">{stat.subtitle}</p>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900">Sustainability promise</h2>
          <p className="text-sm leading-relaxed text-slate-600">
            Mithra Travel offsets carbon emissions across all private transfers via accredited reforestation programmes. Our
            upcoming fleet refresh introduces hybrid Mercedes E-Class sedans and electric shuttles for Antalya city excursions.
          </p>
        </section>

        <SeoContent />
      </main>
      <Footer />
    </div>
  );
}
