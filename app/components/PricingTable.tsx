'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from '@/lib/i18n-client';
import { useAppStore, type VehicleType } from '@/lib/store';
import { slugify } from '@/lib/slug';

interface ApiRow {
  destination: string;
  basePrice: number;
  passengers: string;
  vehicle: VehicleType;
}

const currencyFormatter = (value: number, currency: string, locale: string) =>
  new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'TRY' ? 0 : 2
  }).format(value);

export default function PricingTable() {
  const { t, i18n } = useTranslation();
  const region = useAppStore((state) => state.region);
  const search = useAppStore((state) => state.search);
  const vehicle = useAppStore((state) => state.vehicle);
  const currency = useAppStore((state) => state.currency);
  const rates = useAppStore((state) => state.rates);
  const isRtl = useAppStore((state) => state.isRtl);

  const [rows, setRows] = useState<ApiRow[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!region) {
      setRows([]);
      return;
    }

    setLoading(true);
    const controller = new AbortController();
    const params = new URLSearchParams({ region, vehicle });
    if (search.trim()) {
      params.set('search', search.trim());
    }

    fetch(`/api/prices?${params.toString()}`, { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => setRows(data.data))
      .catch(() => setRows([]))
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, [region, vehicle, search]);

  const convertedRows = useMemo(() => {
    return rows.map((row) => {
      const rate = rates[currency as keyof typeof rates] ?? 1;
      return {
        ...row,
        price: row.basePrice * rate
      };
    });
  }, [rows, rates, currency]);

  return (
    <section id="pricing" className={isRtl ? 'rtl' : ''}>
      <div className="table-container card px-0 py-0">
        <table className="table">
          <thead>
            <tr>
              <th className="rounded-tl-2xl">{t('table.destination')}</th>
              <th>{t('table.vehiclePassengers')}</th>
              <th className="rounded-tr-2xl">{t('table.price')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-sm text-slate-500">
                  {t('table.loading')}
                </td>
              </tr>
            ) : convertedRows.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center text-sm text-slate-500">
                  {t('table.empty')}
                </td>
              </tr>
            ) : (
              convertedRows.map((row) => (
                <tr key={`${row.destination}-${row.vehicle}`} className="border-b border-slate-100 last:border-0">
                  <td className="font-medium text-slate-900">
                    <Link
                      href={`/book/${slugify(row.region)}/${slugify(row.destination)}`}
                      className="hover:text-brand-500"
                    >
                      {row.destination}
                    </Link>
                  </td>
                  <td className="text-slate-600">
                    {t(`vehicles.${row.vehicle}` as const)} <span className="text-xs text-slate-400">({row.passengers})</span>
                  </td>
                  <td className="text-brand-500">
                    {currencyFormatter(row.price, currency, i18n.language)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
