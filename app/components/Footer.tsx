'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' }
];

const legalLinks = [
  { href: '/privacy', label: 'Privacy Policy' },
  { href: '/terms', label: 'Terms & Conditions' }
];

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-100 bg-slate-50/80">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-[2fr_1fr_1fr]">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Mithra Travel</h2>
          <p className="text-sm text-slate-600">
            Premium Antalya airport transfers with a trusted local team. Licensed chauffeurs, luxury fleet options, and
            transparent fixed pricing for every resort and district we serve.
          </p>
          <div className="space-y-2 text-sm text-slate-600">
            <p className="font-medium text-slate-900">24/7 Concierge</p>
            <p>
              <Link href="tel:+905555555555" className="font-semibold text-brand-500">
                +90 555 555 55 55
              </Link>{' '}
              ·{' '}
              <Link href="mailto:hello@mithratravel.com" className="font-semibold text-brand-500">
                hello@mithratravel.com
              </Link>
            </p>
            <p>Mithra Travel HQ, Lara Cd. 123, Antalya / Türkiye</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {quickLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-500">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">Resources</h3>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            {legalLinks.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-brand-500">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <span className="text-slate-500">Mithra Travel © 2025</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200/70 bg-white/80 py-4">
        <p className="text-center text-xs text-slate-500">{t('footer')}</p>
      </div>
    </footer>
  );
}
