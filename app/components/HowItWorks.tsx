const steps = [
  {
    title: 'Select your route',
    description: 'Choose the pick-up region and destination to reveal all vehicle tiers with live currency conversion.'
  },
  {
    title: 'Confirm availability',
    description: 'Reserve instantly online or message our concierge team for complex itineraries and return journeys.'
  },
  {
    title: 'Meet your chauffeur',
    description: 'Enjoy meet & greet at the airport, luggage assistance, complimentary water, and door-to-door drop-off.'
  }
];

export default function HowItWorks() {
  return (
    <section className="card px-6 py-8">
      <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">How Mithra Transfer works</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {steps.map((step, index) => (
          <div key={step.title} className="space-y-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-sm font-semibold text-brand-500">
              {String(index + 1).padStart(2, '0')}
            </div>
            <h3 className="text-lg font-semibold text-slate-900">{step.title}</h3>
            <p className="text-sm text-slate-600">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
