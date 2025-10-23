import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const posts = [
  {
    title: 'Top 10 Antalya attractions within 60 minutes of the airport',
    excerpt: 'From Lara Beach sunsets to ancient Aspendos, discover the must-see highlights once your chauffeur whisks you from arrivals.',
    slug: 'antalya-attractions'
  },
  {
    title: 'How to plan a multi-destination Turkish Riviera holiday',
    excerpt: 'Combine Antalya, Kaş, Kalkan, and Pamukkale with seamless private transfers and overnight chauffeur services.',
    slug: 'multi-destination-riviera'
  },
  {
    title: 'Corporate incentive travel in Antalya – logistics checklist',
    excerpt: 'Ensure your conference attendees and VIP speakers enjoy smooth ground transportation across venues and gala dinners.',
    slug: 'corporate-incentive-logistics'
  }
];

export const metadata: Metadata = {
  title: 'Mithra Travel Journal',
  description: 'Travel inspiration, Antalya guides, and concierge tips from the Mithra Travel operations team.'
};

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header
        variant="compact"
        title="Mithra Travel journal"
        description="Guides and concierge tips to maximise your Antalya stay."
      />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col gap-8 px-6 py-12">
        {posts.map((post) => (
          <article key={post.slug} className="card space-y-3 px-6 py-6">
            <h2 className="text-xl font-semibold text-slate-900">{post.title}</h2>
            <p className="text-sm text-slate-600">{post.excerpt}</p>
            <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-brand-500">
              Read article →
            </Link>
          </article>
        ))}
      </main>
      <Footer />
    </div>
  );
}
