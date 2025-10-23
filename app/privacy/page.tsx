import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Understand how Mithra Travel collects and protects customer data for Antalya airport transfers.'
};

const sections = [
  {
    heading: 'Data we collect',
    body: 'Passenger names, contact information, flight details, and accommodation addresses are required to confirm transfers.'
  },
  {
    heading: 'How information is used',
    body: 'Details are shared only with licensed chauffeurs and operations partners involved in the requested journey.'
  },
  {
    heading: 'Retention & security',
    body: 'Records are stored securely for 12 months then anonymised. We never sell data to third parties.'
  }
];

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="compact" title="Privacy policy" description="Your personal data is protected across every touchpoint." />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
        {sections.map((section) => (
          <section key={section.heading} className="card space-y-3 px-6 py-6">
            <h2 className="text-lg font-semibold text-slate-900">{section.heading}</h2>
            <p className="text-sm text-slate-600">{section.body}</p>
          </section>
        ))}
        <p className="text-xs text-slate-500">Last updated: January 2025</p>
      </main>
      <Footer />
    </div>
  );
}
