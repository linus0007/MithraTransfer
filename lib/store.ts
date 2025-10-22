'use client';

import { create } from 'zustand';

export type CurrencyCode = 'EUR' | 'USD' | 'GBP' | 'TRY';
export type VehicleType = 'car' | 'minibus' | 'crafter' | 'ultralux';

export interface PricingRow {
  region: string;
  destination: string;
  prices: Record<VehicleType, number>;
}

interface ExchangeRates {
  EUR: number;
  USD: number;
  GBP: number;
  TRY: number;
}

interface AppState {
  language: string;
  currency: CurrencyCode;
  region: string | null;
  search: string;
  vehicle: VehicleType;
  rates: ExchangeRates;
  isRtl: boolean;
  setLanguage: (language: string, options?: { direction?: 'ltr' | 'rtl' }) => void;
  setCurrency: (currency: CurrencyCode) => void;
  setRegion: (region: string | null) => void;
  setSearch: (search: string) => void;
  setVehicle: (vehicle: VehicleType) => void;
  setRates: (rates: ExchangeRates) => void;
}

const defaultRates: ExchangeRates = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
  TRY: 35
};

export const useAppStore = create<AppState>((set) => ({
  language: 'en',
  currency: 'EUR',
  region: null,
  search: '',
  vehicle: 'car',
  rates: defaultRates,
  isRtl: false,
  setLanguage: (language, options) =>
    set(() => ({ language, isRtl: options?.direction === 'rtl' })),
  setCurrency: (currency) => set(() => ({ currency })),
  setRegion: (region) => set(() => ({ region })),
  setSearch: (search) => set(() => ({ search })),
  setVehicle: (vehicle) => set(() => ({ vehicle })),
  setRates: (rates) => set(() => ({ rates }))
}));

export type { ExchangeRates };
