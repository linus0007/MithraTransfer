'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

type HeaderVariant = 'default' | 'compact';

interface HeaderProps {
  title?: string;
  description?: string;
  variant?: HeaderVariant;
  ctaLabel?: string;
  ctaHref?: string;
}

const navLinks: Array<{ href: string; label: string }> = [
  { href: '/', label: 'Home' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/services', label: 'Services' },
  { href: '/fleet', label: 'Fleet' },
  { href: '/destinations', label: 'Destinations' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' }
];

export default function Header({
  title,
  description,
  variant = 'default',
  ctaLabel = 'Plan your transfer',
  ctaHref = '/contact'
}: HeaderProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const heading = title ?? 'Mithra Travel';
  const subheading = description ?? t('tagline');
  const isDefault = variant === 'default';

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/';
    }
    if (href.startsWith('/#')) {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="gradient-header text-white">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="text-xl font-semibold tracking-tight md:text-2xl">
          Mithra <span className="text-teal-100">Travel</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition-colors ${isActive(link.href) ? 'text-white' : 'text-white/80 hover:text-white'}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Link
            href={ctaHref}
            className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:bg-white/20"
          >
            {ctaLabel}
          </Link>
        </div>
        <button
          type="button"
          className="rounded-full border border-white/40 px-3 py-1 text-sm font-semibold text-white md:hidden"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label="Toggle navigation"
        >
          Menu
        </button>
      </div>

      {menuOpen ? (
        <div className="mx-4 mb-4 rounded-2xl border border-white/20 bg-white/10 p-4 text-sm font-medium text-white shadow-lg md:hidden">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`rounded-lg px-2 py-2 transition ${isActive(link.href) ? 'bg-white/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href={ctaHref}
              onClick={() => setMenuOpen(false)}
              className="rounded-lg bg-white/20 px-2 py-2 text-center font-semibold text-white transition hover:bg-white/30"
            >
              {ctaLabel}
            </Link>
          </nav>
        </div>
      ) : null}

      <div
        className={`mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 ${
          isDefault ? 'pb-12 pt-8 md:flex-row md:items-center md:justify-between md:pb-16 md:pt-10' : 'pb-10 pt-8 md:pb-14'
        }`}
      >
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.2em] text-teal-100/80">Antalya Region Airport Transfers</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{heading}</h1>
          <p className="mt-3 text-base text-teal-50/90 md:text-lg">{subheading}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/80 md:text-sm">
            <span className="rounded-full border border-white/30 px-3 py-1">24/7 Concierge</span>
            <span className="rounded-full border border-white/30 px-3 py-1">Instant confirmation</span>
            <span className="rounded-full border border-white/30 px-3 py-1">Multilingual support</span>
          </div>
        </div>
        {isDefault ? (
          <div className="relative h-36 w-full max-w-xs self-center overflow-hidden rounded-3xl shadow-2xl shadow-teal-900/40 md:h-44 md:max-w-sm">
            <Image
              src="https://images.unsplash.com/photo-1529429617124-aee711a6ba13?auto=format&fit=crop&w=640&q=80"
              alt="Luxury vehicle"
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : null}
      </div>
    </header>
  );
}
