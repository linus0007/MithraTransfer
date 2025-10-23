'use client';

import Image from 'next/image';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { useAppStore, type VehicleType } from '@/lib/store';

const vehicles: VehicleType[] = ['car', 'minibus', 'crafter', 'ultralux'];

const vehicleVisuals: Record<VehicleType, { image: string; highlight: string }> = {
  car: {
    image: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
    highlight: 'Fiat Egea • 1-4 pax'
  },
  minibus: {
    image: 'https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=800&q=80',
    highlight: 'Mercedes Vito • 1-7 pax'
  },
  crafter: {
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=800&q=80',
    highlight: 'Volkswagen Crafter • 1-14 pax'
  },
  ultralux: {
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
    highlight: 'Maybach Vito • VIP 1-4 pax'
  }
};

export default function VehicleTabs() {
  const { t } = useTranslation();
  const activeVehicle = useAppStore((state) => state.vehicle);
  const setVehicle = useAppStore((state) => state.setVehicle);
  const activeVisual = vehicleVisuals[activeVehicle];

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
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

      <div className="flex items-center gap-4 rounded-2xl bg-slate-50 px-4 py-3 shadow-inner">
        <div className="relative h-16 w-24 overflow-hidden rounded-xl md:h-20 md:w-32">
          <Image
            src={activeVisual.image}
            alt={`${t(`vehicles.${activeVehicle}` as const)} vehicle`}
            fill
            sizes="(max-width: 768px) 96px, 128px"
            className="object-cover"
            priority
          />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">{t(`vehicles.${activeVehicle}` as const)}</p>
          <p className="text-xs text-slate-500">{activeVisual.highlight}</p>
        </div>
      </div>
    </div>
  );
}
