Mithra Transfer API

Quickstart

1. Install dependencies

```bash
pip install -r requirements.txt
```

2. Run dev server

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

3. Example requests

- Vehicles: `GET /vehicles`
- Locations: `GET /locations?q=ant`
- Routes: `GET /routes?from_id=ayt`
- Quote: `GET /quote?from_id=ayt&to_id=lara_kundu&vehicle_class=passenger_car&currency=USD`
