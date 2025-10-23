# Mithra Transfer — Next.js Edition

A modern, multilingual, multi-currency transfer pricing web application for Mithra Travel, rebuilt with Next.js 14, React 18, Tailwind CSS, and TypeScript.

## Getting Started

```bash
npm install
npm run dev
```

> **Important:** this is a dynamic Next.js application. Opening the files directly from the filesystem will only show an
> unstyled mock-up. Always run `npm run dev` (or `npm run build && npm start`) and browse to
> [http://localhost:3000](http://localhost:3000) to see the fully styled React experience.

## Features

- App Router architecture with static region preloading and incremental revalidation.
- Reusable UI components styled with Tailwind CSS and Apple-inspired visual language.
- i18next-powered localisation (English, Türkçe, Русский, Deutsch, العربية, Español, Nederlands) with RTL support.
- Multi-currency conversion (EUR, USD, GBP, TRY) powered by exchange API route and persisted preferences.
- Dynamic pricing API endpoint that streams pricing data from `data/pricingData.json` on demand.
- Responsive design with sticky pricing table header and mobile-friendly layout.
- 1,100+ Antalya routes captured in the pricing dataset with automatic filtering for each vehicle tier.
- Comprehensive marketing pages (About, Services, Fleet, Destinations, Blog, FAQ, Contact, Privacy, Terms) mirroring the full Mithra Travel website experience.

## Project Structure

```
app/
  api/          # Next.js API routes
  about/        # About page
  blog/         # Journal listing and articles
  components/   # Reusable UI components
  book/         # Future-ready booking route stubs
  contact/      # Concierge contact form
  destinations/ # Region highlights and SEO copy
  faq/          # Frequently asked questions
  fleet/        # Fleet showcase
  privacy/      # Privacy policy
  services/     # Service catalogue
  terms/        # Terms & conditions
  page.tsx      # Main pricing experience
  layout.tsx    # Root layout and metadata
lib/            # State, i18n, and pricing helpers
data/           # Transfer pricing dataset (EUR base)
types/          # Shared TypeScript types
```

## Deployment

Vercel will now respect the `.npmrc` in the repository and install dependencies with `--legacy-peer-deps`, which resolves the React/Next canary peer requirement. Follow these exact steps to deploy successfully:

1. **Push the latest code** to GitHub (including this README and the `.npmrc` file).
2. **In your Vercel dashboard**, select the Mithra Transfer project and click **Deploy** (or re-run the most recent deployment).
3. Vercel automatically runs `npm install` (using the `.npmrc` setting) followed by `npm run build`.
4. Once the build completes, Vercel promotes the deployment and serves it on your configured domain.

If you prefer to trigger the deployment from the command line:

```bash
vercel --prod
```

> Tip: Should you need to bypass the cache, choose **Deploy without cache** in the Vercel UI so the new dependency resolution runs fresh.
