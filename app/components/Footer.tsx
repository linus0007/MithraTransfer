'use client';

import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-slate-100 bg-slate-50/60 py-8">
      <div className="mx-auto max-w-6xl px-6">
        <p className="text-center text-sm text-slate-500">{t('footer')}</p>
      </div>
    </footer>
  );
}
