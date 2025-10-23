import { NextResponse } from 'next/server';
import pricingData from '@/data/pricingData.json';
import type { VehicleType } from '@/lib/store';
import type { PricingRecord } from '@/types/pricing';

const data = pricingData as PricingRecord[];

const passengerLabels: Record<VehicleType, string> = {
  car: '1-4 pax',
  minibus: '1-7 pax',
  crafter: '1-14 pax',
  ultralux: '1-4 pax VIP'
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const region = searchParams.get('region');
  const vehicle = (searchParams.get('vehicle') ?? 'car') as VehicleType;
  const search = searchParams.get('search')?.toLowerCase() ?? '';

  if (!region) {
    return NextResponse.json({ data: [] });
  }

  if (!['car', 'minibus', 'crafter', 'ultralux'].includes(vehicle)) {
    return NextResponse.json({ error: 'Invalid vehicle type' }, { status: 400 });
  }

  const filtered = data.filter((record) => {
    return (
      record.from === region &&
      (!search || record.to.toLowerCase().includes(search))
    );
  });

  const payload = filtered
    .map((record) => {
      const basePrice = record.prices[vehicle];
      if (typeof basePrice !== 'number') {
        return null;
      }

      return {
        region: record.from,
        destination: record.to,
        vehicle,
        basePrice,
        passengers: passengerLabels[vehicle]
      };
    })
    .filter((entry): entry is Exclude<typeof entry, null> => entry !== null);

  return NextResponse.json({ data: payload });
}
