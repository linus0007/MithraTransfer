'use client';

import { useEffect, type ReactNode } from 'react';
import i18n, { languageOptions } from '@/lib/i18n';
import { useAppStore, type CurrencyCode } from '@/lib/store';

export default function Providers({ children }: { children: ReactNode }) {
  const language = useAppStore((state) => state.language);
  const isRtl = useAppStore((state) => state.isRtl);
  const currency = useAppStore((state) => state.currency);
  const setLanguage = useAppStore((state) => state.setLanguage);
  const setCurrency = useAppStore((state) => state.setCurrency);
  const setRates = useAppStore((state) => state.setRates);

  useEffect(() => {
    const savedLang = window.localStorage.getItem('mithra.lang');
    const savedCurrency = window.localStorage.getItem('mithra.currency') as CurrencyCode | null;

    if (savedLang) {
      const option = languageOptions.find((item) => item.code === savedLang);
      if (option) {
        setLanguage(option.code, { direction: option.direction });
        i18n.changeLanguage(option.code).catch(() => undefined);
      }
    }

    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, [setCurrency, setLanguage]);

  useEffect(() => {
    i18n.changeLanguage(language).catch(() => undefined);
    document.documentElement.lang = language;
    document.documentElement.dir = isRtl ? 'rtl' : 'ltr';
    window.localStorage.setItem('mithra.lang', language);
  }, [language, isRtl]);

  useEffect(() => {
    window.localStorage.setItem('mithra.currency', currency);
  }, [currency]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/exchange', { signal: controller.signal })
      .then((res) => res.json())
      .then((data) => setRates(data.rates))
      .catch(() => undefined);

    return () => controller.abort();
  }, [setRates]);

  return <>{children}</>;
}
