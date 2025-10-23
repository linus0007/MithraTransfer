import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Review Mithra Travel transfer terms including payment policy, cancellation windows, and liability coverage.'
};

const clauses = [
  {
    heading: 'Booking confirmation',
    body: 'Transfers are confirmed upon receipt of flight details and payment or card guarantee. E-vouchers are issued instantly.'
  },
  {
    heading: 'Cancellation policy',
    body: 'Free cancellation up to 12 hours before pick-up. 50% fee applies within 12 hours; no-show incurs full charge.'
  },
  {
    heading: 'Liability',
    body: 'Mithra Travel partners only with licensed chauffeurs. We are not liable for delays caused by force majeure events.'
  }
];

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="compact" title="Terms & conditions" description="Clear policies to keep your Antalya transfer seamless." />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
        {clauses.map((clause) => (
          <section key={clause.heading} className="card space-y-3 px-6 py-6">
            <h2 className="text-lg font-semibold text-slate-900">{clause.heading}</h2>
            <p className="text-sm text-slate-600">{clause.body}</p>
          </section>
        ))}
        <p className="text-xs text-slate-500">Valid from January 2025</p>
      </main>
      <Footer />
    </div>
  );
}
