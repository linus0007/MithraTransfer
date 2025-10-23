import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const faqs = [
  {
    question: 'How far in advance should I book?',
    answer:
      'Airport transfers are confirmed instantly online. For UltraLux or multi-stop itineraries we recommend at least 24 hours notice.'
  },
  {
    question: 'Do you monitor flights?',
    answer: 'Yes, we track all arrivals. Your driver waits inside the terminal with a name-board and complimentary waiting time.'
  },
  {
    question: 'Are child seats provided?',
    answer: 'Infant, toddler, and booster seats are complimentary. Please specify the ages during booking.'
  },
  {
    question: 'Can I pay in TRY, EUR, USD, or GBP?',
    answer: 'Yes – select your currency on the website. Our concierge can also collect cash or provide a secure payment link.'
  },
  {
    question: 'Do you offer return journeys?',
    answer:
      'Return transfers and daily chauffeur services can be scheduled together with a discounted package rate.'
  }
];

export const metadata: Metadata = {
  title: 'Frequently Asked Questions',
  description: 'Common questions about Antalya airport transfers, luggage allowance, child seats, payments, and return trips.'
};

export default function FaqPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        variant="compact"
        title="Frequently asked questions"
        description="Everything you need to know before arriving at Antalya Airport or Gazipaşa Airport."
      />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
        {faqs.map((faq) => (
          <section key={faq.question} className="card space-y-3 px-6 py-6">
            <h2 className="text-lg font-semibold text-slate-900">{faq.question}</h2>
            <p className="text-sm text-slate-600">{faq.answer}</p>
          </section>
        ))}
      </main>
      <Footer />
    </div>
  );
}
