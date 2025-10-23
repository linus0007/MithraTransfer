import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import CtaBanner from '@/app/components/CtaBanner';

export const metadata: Metadata = {
  title: 'Contact Mithra Travel',
  description: 'Reach Mithra Travel for Antalya airport transfers, concierge services, and corporate travel support.'
};

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        variant="compact"
        title="Contact the concierge"
        description="We are available 24/7 on WhatsApp, phone, and email for urgent arrivals and bespoke itineraries."
      />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-10 px-6 py-12">
        <section className="grid gap-8 rounded-3xl bg-slate-50/80 px-6 py-8 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-900">Concierge desk</h2>
            <p className="text-sm text-slate-600">
              Phone & WhatsApp:{' '}
              <a className="font-semibold text-brand-500" href="tel:+905555555555">
                +90 555 555 55 55
              </a>
            </p>
            <p className="text-sm text-slate-600">
              Email:{' '}
              <a className="font-semibold text-brand-500" href="mailto:hello@mithratravel.com">
                hello@mithratravel.com
              </a>
            </p>
            <p className="text-sm text-slate-600">Office: Mithra Travel HQ, Lara Cd. 123, Antalya / Türkiye</p>
            <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Response within 15 minutes</p>
          </div>
          <form className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-700" htmlFor="name">
                Full name
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none"
                placeholder="Name"
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700" htmlFor="phone">
                  Phone / WhatsApp
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none"
                  placeholder="+90 555 555 55 55"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-slate-700" htmlFor="details">
                Journey details
              </label>
              <textarea
                id="details"
                rows={4}
                className="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none"
                placeholder="Flight arrival, destination hotel, passengers..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-teal-500"
            >
              Send request
            </button>
          </form>
        </section>
        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}
