'use client';

import { useCallback, useSyncExternalStore } from 'react';
import i18n from '@/lib/i18n';

type TranslateArgs = Parameters<typeof i18n.t>;

export function useTranslation() {
  const language = useSyncExternalStore(
    (listener) => {
      const handler = () => listener();
      i18n.on('languageChanged', handler);
      return () => {
        i18n.off('languageChanged', handler);
      };
    },
    () => i18n.language,
    () => i18n.language
  );

  const t = useCallback((...args: TranslateArgs) => i18n.t(...args), [language]);

  return { t, i18n, language };
}
