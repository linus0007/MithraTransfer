import type { Metadata } from 'next';
import './globals.css';
import Providers from '@/lib/providers';

export const metadata: Metadata = {
  metadataBase: new URL('https://mithratransfer.com'),
  title: {
    default: 'Mithra Transfer — Antalya Airport Transfers',
    template: '%s | Mithra Transfer'
  },
  description:
    'Premium Antalya airport transfers and chauffeur services by Mithra Travel. Fixed regional pricing, multilingual support, and live currency conversion.',
  keywords: [
    'Antalya transfers',
    'airport transfer',
    'Mithra Travel',
    'private chauffeur',
    'Turkey travel'
  ],
  openGraph: {
    title: 'Mithra Transfer — Antalya Airport & Regional Transfers',
    description:
      'Discover fixed-price airport and regional transfers with Mithra Travel. Multilingual, multi-currency pricing and VIP fleet options.',
    url: 'https://mithratransfer.com',
    siteName: 'Mithra Transfer',
    locale: 'en_US',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    site: '@mithratravel'
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-white">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
