'use client';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useAppStore, type VehicleType } from '@/lib/store';

const vehicles: VehicleType[] = ['car', 'minibus', 'crafter', 'ultralux'];

export default function VehicleTabs() {
  const { t } = useTranslation();
  const activeVehicle = useAppStore((state) => state.vehicle);
  const setVehicle = useAppStore((state) => state.setVehicle);

  return (
    <div className="flex flex-wrap gap-2" role="tablist" aria-label="Vehicle selector">
      {vehicles.map((vehicle) => {
        const isActive = vehicle === activeVehicle;
        return (
          <button
            key={vehicle}
            type="button"
            className={clsx(
              'rounded-full px-4 py-2 text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2',
              isActive
                ? 'bg-brand-500 text-white shadow'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            )}
            role="tab"
            aria-selected={isActive}
            onClick={() => setVehicle(vehicle)}
          >
            {t(`vehicles.${vehicle}` as const)}
          </button>
        );
      })}
    </div>
  );
}
