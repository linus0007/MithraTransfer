# Mithra Transfer — Next.js Edition

A modern, multilingual, multi-currency transfer pricing web application for Mithra Travel, rebuilt with Next.js 15, React 19, Tailwind CSS, and TypeScript.

## Getting Started

```bash
npm install
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

## Features

- App Router architecture with static region preloading and incremental revalidation.
- Reusable UI components styled with Tailwind CSS and Apple-inspired visual language.
- i18next-powered localisation (English, Türkçe, Русский, Deutsch, العربية, Español, Nederlands) with RTL support.
- Multi-currency conversion (EUR, USD, GBP, TRY) powered by exchange API route and persisted preferences.
- Dynamic pricing API endpoint that streams pricing data from `data/pricingData.json` on demand.
- Responsive design with sticky pricing table header and mobile-friendly layout.

## Project Structure

```
app/
  api/          # Next.js API routes
  components/   # Reusable UI components
  book/         # Future-ready booking route stubs
  page.tsx      # Main pricing experience
  layout.tsx    # Root layout and metadata
lib/            # State, i18n, and pricing helpers
data/           # Transfer pricing dataset (EUR base)
types/          # Shared TypeScript types
```

## Deployment

The project is optimised for Vercel deployment. Set up your project, link this repository, and run `npm run build`.
