import type { Metadata } from 'next';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

const posts = {
  'antalya-attractions': {
    title: 'Top 10 Antalya attractions within 60 minutes of the airport',
    body: [
      'Head directly to Lara Beach for powder-soft sand, or explore the medieval Kaleiçi old town with cobbled streets and boutique cafés.',
      'Book a chauffeur for the day to combine Düden Waterfalls, Aspendos amphitheatre, and Side’s ancient temples with ease.'
    ]
  },
  'multi-destination-riviera': {
    title: 'How to plan a multi-destination Turkish Riviera holiday',
    body: [
      'Mithra Travel coordinates your airport arrival, coastal transfers, and inland excursions with a single itinerary.',
      'Stay flexible with hourly chauffeurs for spontaneous stops in Kaş, Kalkan, and the Lycian Way viewpoints.'
    ]
  },
  'corporate-incentive-logistics': {
    title: 'Corporate incentive travel in Antalya – logistics checklist',
    body: [
      'Pre-arrange manifest sharing for smooth arrivals, and deploy branded desks in both domestic and international terminals.',
      'Our event specialists manage shuttle rotations, VIP speaker vehicles, and late-night hospitality transfers.'
    ]
  }
} satisfies Record<string, { title: string; body: string[] }>;

interface BlogPostPageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = posts[params.slug];
  if (!post) {
    return {
      title: 'Mithra Travel Journal',
      description: 'Travel inspiration and Antalya concierge tips.'
    };
  }

  return {
    title: `${post.title} | Mithra Travel Journal`,
    description: post.body[0]
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = posts[params.slug];

  if (!post) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header variant="compact" title="Article unavailable" description="Please return to the journal overview." />
        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-12">
          <p className="text-sm text-slate-600">We could not find the requested article.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header variant="compact" title={post.title} description="Insights from the Mithra Travel concierge team." />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-6 px-6 py-12">
        {post.body.map((paragraph, index) => (
          <p key={index} className="text-sm leading-relaxed text-slate-600">
            {paragraph}
          </p>
        ))}
      </main>
      <Footer />
    </div>
  );
}
