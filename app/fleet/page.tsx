import type { Metadata } from 'next';
import Image from 'next/image';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const fleet = [
  {
    name: 'Passenger Car',
    passengers: '1-4 passengers',
    perks: ['Ideal for solo travellers and couples', 'Bottled water and Wi-Fi on request', 'Flight tracking included'],
    image: 'https://images.unsplash.com/photo-1529429617124-aee711a6ba13?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Minibus',
    passengers: '1-7 passengers',
    perks: ['Spacious Mercedes Vito and V-Class', 'Complimentary child seats available', 'Ideal for family holiday transfers'],
    image: 'https://images.unsplash.com/photo-1617814069487-979a34824d89?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'Crafter',
    passengers: '1-14 passengers',
    perks: ['Mercedes Sprinter Crafter range', 'Standing height, ambient lighting', 'Perfect for golf and corporate groups'],
    image: 'https://images.unsplash.com/photo-1533478683023-8c14c38b8250?auto=format&fit=crop&w=640&q=80'
  },
  {
    name: 'UltraLux',
    passengers: '1-4 passengers',
    perks: ['Maybach Vito with captain seats', 'Privacy glass, minibar, streaming', 'Hostess and concierge add-ons'],
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=640&q=80'
  }
];

export const metadata: Metadata = {
  title: 'Mithra Travel Fleet',
  description: 'Explore the Mithra Travel fleet – Passenger Car, Minibus, Crafter, and UltraLux vehicles for Antalya transfers.'
};

export default function FleetPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        variant="compact"
        title="Our fleet"
        description="Choose from elegant passenger cars, executive minibuses, Mercedes Sprinter Crafters, or UltraLux Maybach vans."
      />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-10 px-6 py-12">
        <section className="grid gap-6 md:grid-cols-2">
          {fleet.map((vehicle) => (
            <div key={vehicle.name} className="card overflow-hidden">
              <div className="relative h-40 w-full">
                <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
              </div>
              <div className="space-y-3 px-6 py-6">
                <h2 className="text-lg font-semibold text-slate-900">{vehicle.name}</h2>
                <p className="text-sm text-slate-500">{vehicle.passengers}</p>
                <ul className="space-y-2 text-sm text-slate-600">
                  {vehicle.perks.map((perk) => (
                    <li key={perk}>• {perk}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
