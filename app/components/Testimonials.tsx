const testimonials = [
  {
    quote:
      'Our flight was delayed and the Mithra Travel driver was still waiting with a smile. The vehicle was spotless and stocked with cold water.',
    author: 'Elena & Marco, Italy'
  },
  {
    quote:
      'We handle corporate incentives in Antalya and Mithra Transfer has become our go-to partner for VIP vans and multilingual hosts.',
    author: 'Sven Koch, Travel Director'
  },
  {
    quote: 'Booking the family minibus online was effortless. Prices are fixed and the team confirmed our child seats ahead of time.',
    author: 'Aylin Demir, İstanbul'
  }
];

export default function Testimonials() {
  return (
    <section className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h2 className="text-xl font-semibold text-slate-900 md:text-2xl">Trusted by global travellers</h2>
        <span className="text-xs uppercase tracking-[0.3em] text-slate-400">Verified feedback</span>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((item) => (
          <blockquote key={item.author} className="card flex h-full flex-col justify-between px-6 py-6">
            <p className="text-sm text-slate-600">“{item.quote}”</p>
            <footer className="mt-4 text-sm font-semibold text-slate-900">{item.author}</footer>
          </blockquote>
        ))}
      </div>
    </section>
  );
}
