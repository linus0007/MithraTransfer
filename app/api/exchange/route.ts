import { NextResponse } from 'next/server';
import type { ExchangeRates } from '@/lib/store';

const rates: ExchangeRates = {
  EUR: 1,
  USD: 1.08,
  GBP: 0.85,
  TRY: 35
};

export async function GET() {
  return NextResponse.json({ rates, updatedAt: new Date().toISOString() });
}
