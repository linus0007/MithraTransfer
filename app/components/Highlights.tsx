export default function Highlights() {
  const highlights = [
    {
      title: 'Fixed regional pricing',
      description: 'Transparent EUR base fares for every resort, converted instantly to your preferred currency.'
    },
    {
      title: 'Licensed chauffeurs',
      description: 'Professional, multilingual drivers with airport meet & greet service and flight monitoring.'
    },
    {
      title: 'Premium fleet tiers',
      description: 'Passenger cars, minibuses, Mercedes Sprinter Crafters, and UltraLux VIP vans with on-board Wi-Fi.'
    }
  ];

  return (
    <section className="grid gap-6 md:grid-cols-3">
      {highlights.map((item) => (
        <div key={item.title} className="card space-y-3 px-6 py-6">
          <span className="text-2xl">✨</span>
          <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
          <p className="text-sm text-slate-600">{item.description}</p>
        </div>
      ))}
    </section>
  );
}
