'use client';

import { useEffect } from 'react';
import { useTranslation } from '@/lib/i18n-client';
import VehicleTabs from '@/app/components/VehicleTabs';
import { useAppStore } from '@/lib/store';

interface ControlsProps {
  regions: string[];
}

export default function Controls({ regions }: ControlsProps) {
  const { t } = useTranslation();
  const region = useAppStore((state) => state.region);
  const search = useAppStore((state) => state.search);
  const setRegion = useAppStore((state) => state.setRegion);
  const setSearch = useAppStore((state) => state.setSearch);

  useEffect(() => {
    if (!region && regions.length > 0) {
      setRegion(regions[0]);
    }
  }, [region, regions, setRegion]);

  return (
    <div className="card flex flex-col gap-6 px-6 py-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="region" className="text-sm font-medium text-slate-600">
            {t('controls.pickup')}
          </label>
          <select
            id="region"
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none"
            value={region ?? ''}
            onChange={(event) => setRegion(event.target.value)}
          >
            {regions.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <label htmlFor="destination" className="text-sm font-medium text-slate-600">
            {t('controls.search')}
          </label>
          <input
            id="destination"
            type="search"
            placeholder={t('controls.placeholder')}
            className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-500 focus:outline-none"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>
      <VehicleTabs />
    </div>
  );
}
