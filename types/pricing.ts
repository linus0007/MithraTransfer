import type { VehicleType } from '@/lib/store';

export interface PricingRecord {
  from: string;
  to: string;
  prices: Partial<Record<VehicleType, number>>;
}

export interface PricingResponse {
  region: string;
  destination: string;
  vehicle: VehicleType;
  price: number;
  passengers: string;
}
