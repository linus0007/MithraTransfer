import { cache } from 'react';
import pricingData from '@/data/pricingData.json';
import type { PricingRecord } from '@/types/pricing';

const data = pricingData as PricingRecord[];

export const getRegions = cache(async (): Promise<string[]> => {
  return Array.from(new Set(data.map((record) => record.from))).sort((a, b) => a.localeCompare(b));
});

export const getRegionSummary = cache(async () => {
  return data.reduce<Record<string, number>>((acc, record) => {
    acc[record.from] = (acc[record.from] ?? 0) + 1;
    return acc;
  }, {});
});

export const getPricingByRegion = cache(async (region: string) => {
  return data.filter((record) => record.from === region);
});
