'use client';

import Image from 'next/image';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t } = useTranslation();

  return (
    <header className="gradient-header text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-3xl font-extrabold tracking-tight md:text-4xl">
            Mithra <span className="text-teal-100">Travel</span>
          </div>
          <p className="mt-2 max-w-xl text-base md:text-lg">{t('tagline')}</p>
        </div>
        <div className="relative h-24 w-40 md:h-28 md:w-48">
          <Image
            src="https://images.unsplash.com/photo-1529429617124-aee711a6ba13?auto=format&fit=crop&w=640&q=80"
            alt="Luxury vehicle"
            fill
            className="rounded-2xl object-cover shadow-lg shadow-teal-900/30"
            priority
          />
        </div>
      </div>
    </header>
  );
}
