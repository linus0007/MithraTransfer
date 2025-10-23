import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CtaBanner from '@/app/components/CtaBanner';

const services = [
  {
    name: 'Airport transfers',
    description:
      'Fixed-rate journeys from Antalya Airport and Gazipaşa Airport to every resort, villa, and hotel in the Antalya region.'
  },
  {
    name: 'Corporate & MICE',
    description: 'Executive transfers, conference shuttles, and branded meet & greet desks for corporate delegations.'
  },
  {
    name: 'VIP concierge',
    description: 'Dedicated lifestyle managers for yacht, golf, and private aviation transfers with multilingual hostesses.'
  },
  {
    name: 'Group logistics',
    description: 'Fleet of minibuses and coaches for incentive trips, weddings, sports teams, and cultural tours.'
  },
  {
    name: 'Hourly chauffeur',
    description: 'Business-class sedans and UltraLux vans on standby for shopping, dining, and medical appointments.'
  },
  {
    name: 'City-to-city trips',
    description: 'Custom itineraries linking Antalya with Cappadocia, Pamukkale, Bodrum, and Istanbul.'
  }
];

export const metadata: Metadata = {
  title: 'Transfer Services in Antalya',
  description:
    'Explore Mithra Travel services including Antalya airport transfers, VIP concierge, corporate logistics, and private tours.'
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        variant="compact"
        title="Our services"
        description="Comprehensive Antalya transfer solutions tailored for leisure travellers, families, and corporate groups."
      />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-12">
        <section className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <div key={service.name} className="card space-y-3 px-6 py-6">
              <h2 className="text-lg font-semibold text-slate-900">{service.name}</h2>
              <p className="text-sm text-slate-600">{service.description}</p>
            </div>
          ))}
        </section>
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
