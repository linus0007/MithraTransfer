import pricingData from '@/data/pricingData.json';
import type { PricingRecord } from '@/types/pricing';

const data = pricingData as PricingRecord[];

export async function getRegions(): Promise<string[]> {
  const regions = Array.from(new Set(data.map((record) => record.from))).sort((a, b) => a.localeCompare(b));
  return regions;
}

export async function getRegionSummary() {
  return data.reduce<Record<string, number>>((acc, record) => {
    acc[record.from] = (acc[record.from] ?? 0) + 1;
    return acc;
  }, {});
}

export async function getPricingByRegion(region: string) {
  return data.filter((record) => record.from === region);
}
