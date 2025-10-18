from __future__ import annotations

from typing import List, Optional
from fastapi import FastAPI, HTTPException, Query

from .models import VehicleClass, Location, RoutePrice, QuoteResponse, QuoteRequest, CurrencyCode
from .repositories import DataRepository, CurrencyConverter


app = FastAPI(title="Mithra Transfer API", version="0.1.0")

repo = DataRepository()
converter: Optional[CurrencyConverter] = None


@app.on_event("startup")
def startup() -> None:
    global converter
    repo.load_all()
    converter = CurrencyConverter(repo.currency_table)


@app.get("/health")
def health() -> dict:
    return {"status": "ok"}


@app.get("/vehicles", response_model=List[VehicleClass])
def list_vehicles() -> List[VehicleClass]:
    return list(repo.vehicles.values())


@app.get("/locations", response_model=List[Location])
def list_locations(q: Optional[str] = Query(default=None, description="Search text"), type: Optional[str] = None) -> List[Location]:
    items = list(repo.locations.values())
    if type:
        items = [l for l in items if l.type == type]
    if q:
        qlower = q.lower()
        items = [l for l in items if qlower in l.name.lower()]
    return items


@app.get("/routes", response_model=List[RoutePrice])
def list_routes(from_id: Optional[str] = None, to_id: Optional[str] = None) -> List[RoutePrice]:
    routes = repo.routes
    if from_id:
        routes = [r for r in routes if r.from_id == from_id or (r.bidirectional and r.to_id == from_id)]
    if to_id:
        routes = [r for r in routes if r.to_id == to_id or (r.bidirectional and r.from_id == to_id)]
    return routes


@app.get("/routes/from/{from_id}", response_model=List[Location])
def list_destinations(from_id: str) -> List[Location]:
    if not repo.get_location(from_id):
        raise HTTPException(status_code=404, detail="Unknown from_id")
    return repo.list_destinations_from(from_id)


@app.get("/quote", response_model=QuoteResponse)
def get_quote(
    from_id: str,
    to_id: str,
    vehicle_class: str,
    currency: CurrencyCode = "EUR",
    is_return: bool = False,
) -> QuoteResponse:
    if converter is None:
        raise HTTPException(status_code=500, detail="Currency converter not ready")

    if not repo.get_location(from_id):
        raise HTTPException(status_code=404, detail="Unknown from_id")
    if not repo.get_location(to_id):
        raise HTTPException(status_code=404, detail="Unknown to_id")

    route, reversed_pair = repo.find_route(from_id, to_id)
    if not route:
        raise HTTPException(status_code=404, detail="Route not found")

    # Get the vehicle price from the route
    if vehicle_class not in route.prices_by_vehicle:
        raise HTTPException(status_code=400, detail="Vehicle class not available for this route")

    base_price_one_way = route.prices_by_vehicle[vehicle_class]  # already in base currency (EUR)
    total_base = base_price_one_way * (2 if is_return else 1)

    rate = converter.rate_for(currency)
    converted_one_way = round(converter.convert(base_price_one_way, currency), 2)
    total_converted = round(converter.convert(total_base, currency), 2)

    return QuoteResponse(
        route_id=route.id,
        from_id=to_id if reversed_pair else from_id,
        to_id=from_id if reversed_pair else to_id,
        vehicle_class=vehicle_class,  # type: ignore
        base_currency=route.base_currency,
        requested_currency=currency,
        base_price_one_way=base_price_one_way,
        converted_price_one_way=converted_one_way,
        total_base_price=total_base,
        total_converted_price=total_converted,
        rate_used=rate,
        notes="Return price is exactly 2x one-way as per fixed-rate policy." if is_return else None,
    )
