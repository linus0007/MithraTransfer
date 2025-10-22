'use client';

import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { languageOptions } from '@/lib/i18n';
import { useAppStore, type CurrencyCode } from '@/lib/store';

const currencyOptions: Array<{ code: CurrencyCode; label: string }> = [
  { code: 'EUR', label: 'EUR' },
  { code: 'USD', label: 'USD' },
  { code: 'GBP', label: 'GBP' },
  { code: 'TRY', label: 'TRY' }
];

export default function LanguageCurrencyBar() {
  const { t } = useTranslation();
  const language = useAppStore((state) => state.language);
  const currency = useAppStore((state) => state.currency);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const setCurrency = useAppStore((state) => state.setCurrency);

  const languageMap = useMemo(() => new Map(languageOptions.map((item) => [item.code, item])), []);

  return (
    <div className="card flex flex-col gap-4 px-6 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <label htmlFor="language" className="text-sm font-medium text-slate-600">
          {t('controls.language')}
        </label>
        <select
          id="language"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none"
          value={language}
          onChange={(event) => {
            const option = languageMap.get(event.target.value);
            setLanguage(event.target.value, { direction: option?.direction });
          }}
        >
          {languageOptions.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-3">
        <label htmlFor="currency" className="text-sm font-medium text-slate-600">
          {t('controls.currency')}
        </label>
        <select
          id="currency"
          className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none"
          value={currency}
          onChange={(event) => setCurrency(event.target.value as CurrencyCode)}
        >
          {currencyOptions.map((option) => (
            <option key={option.code} value={option.code}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
