from __future__ import annotations

from typing import Dict, Literal, Optional
from pydantic import BaseModel, Field


LocationType = Literal["airport", "city", "resort", "coastal_area", "region"]
CurrencyCode = Literal["EUR", "USD", "GBP", "TRY"]
VehicleClassId = Literal["passenger_car", "minibus", "crafter", "ultralux"]


class VehicleClass(BaseModel):
    id: VehicleClassId
    name: str
    capacity: int = Field(ge=1)
    description: Optional[str] = None


class Location(BaseModel):
    id: str
    name: str
    type: LocationType
    code: Optional[str] = None  # e.g. airport IATA code
    region: Optional[str] = None
    name_translations: Optional[Dict[str, str]] = None  # e.g. {"tr": "...", "en": "..."}


class RoutePrice(BaseModel):
    id: str
    from_id: str
    to_id: str
    bidirectional: bool = True
    base_currency: CurrencyCode = "EUR"
    prices_by_vehicle: Dict[VehicleClassId, float]
    estimated_duration_min: Optional[int] = None


class CurrencyTable(BaseModel):
    base_currency: CurrencyCode = "EUR"
    rates: Dict[CurrencyCode, float]
    last_updated_iso: Optional[str] = None


class QuoteRequest(BaseModel):
    from_id: str
    to_id: str
    vehicle_class: VehicleClassId
    currency: CurrencyCode = "EUR"
    is_return: bool = False


class QuoteResponse(BaseModel):
    route_id: str
    from_id: str
    to_id: str
    vehicle_class: VehicleClassId
    base_currency: CurrencyCode
    requested_currency: CurrencyCode
    base_price_one_way: float
    converted_price_one_way: float
    total_base_price: float
    total_converted_price: float
    rate_used: float
    notes: Optional[str] = None
