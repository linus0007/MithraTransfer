from __future__ import annotations

from pathlib import Path
from typing import Dict, List, Optional, Tuple
import json

from .models import VehicleClass, Location, RoutePrice, CurrencyTable, VehicleClassId, CurrencyCode


class DataRepository:
    def __init__(self, base_dir: Optional[Path] = None) -> None:
        self._base_dir = base_dir or Path(__file__).resolve().parent / "data"
        self._vehicles: Dict[str, VehicleClass] = {}
        self._locations: Dict[str, Location] = {}
        self._routes: List[RoutePrice] = []
        self._currency_table: Optional[CurrencyTable] = None

    @property
    def vehicles(self) -> Dict[str, VehicleClass]:
        return self._vehicles

    @property
    def locations(self) -> Dict[str, Location]:
        return self._locations

    @property
    def routes(self) -> List[RoutePrice]:
        return self._routes

    @property
    def currency_table(self) -> CurrencyTable:
        assert self._currency_table is not None, "Currency table not loaded"
        return self._currency_table

    def load_all(self) -> None:
        self._vehicles = {v.id: v for v in self._load_list("vehicles.json", VehicleClass)}
        self._locations = {l.id: l for l in self._load_list("locations.json", Location)}
        self._routes = self._load_list("routes.json", RoutePrice)
        self._currency_table = self._load_one("currencies.json", CurrencyTable)

    def _load_list(self, filename: str, model):
        path = self._base_dir / filename
        with path.open("r", encoding="utf-8") as f:
            data = json.load(f)
        return [model(**item) for item in data]

    def _load_one(self, filename: str, model):
        path = self._base_dir / filename
        with path.open("r", encoding="utf-8") as f:
            data = json.load(f)
        return model(**data)

    def get_vehicle(self, vehicle_id: str) -> Optional[VehicleClass]:
        return self._vehicles.get(vehicle_id)

    def get_location(self, location_id: str) -> Optional[Location]:
        return self._locations.get(location_id)

    def find_route(self, from_id: str, to_id: str) -> Tuple[Optional[RoutePrice], bool]:
        for route in self._routes:
            if route.from_id == from_id and route.to_id == to_id:
                return route, False
            if route.bidirectional and route.from_id == to_id and route.to_id == from_id:
                return route, True
        return None, False

    def list_destinations_from(self, from_id: str) -> List[Location]:
        seen = set()
        results: List[Location] = []
        for route in self._routes:
            if route.from_id == from_id and route.to_id in self._locations and route.to_id not in seen:
                seen.add(route.to_id)
                results.append(self._locations[route.to_id])
            if route.bidirectional and route.to_id == from_id and route.from_id in self._locations and route.from_id not in seen:
                seen.add(route.from_id)
                results.append(self._locations[route.from_id])
        return results


class CurrencyConverter:
    def __init__(self, table: CurrencyTable) -> None:
        self._base = table.base_currency
        self._rates = table.rates

    def convert(self, amount_in_base: float, to: CurrencyCode) -> float:
        rate = self._rates[to]
        return amount_in_base * rate

    def rate_for(self, to: CurrencyCode) -> float:
        return self._rates[to]
