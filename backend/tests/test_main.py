import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool
from backend.database import Base, get_db
from backend.main import app
import os

# Use an in-memory database
SQLALCHEMY_DATABASE_URL = "sqlite:///:memory:"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def override_get_db():
    try:
        db = TestingSessionLocal()
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)

@pytest.fixture(autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def test_create_driver():
    response = client.post("/drivers/", json={"name": "Test Driver"})
    assert response.status_code == 200
    assert response.json()["name"] == "Test Driver"
    assert "id" in response.json()

def test_create_ride():
    # Create a driver first
    driver_res = client.post("/drivers/", json={"name": "Driver 1"})
    driver_id = driver_res.json()["id"]

    response = client.post("/rides/", json={
        "driver_name": "Driver 1",
        "driver_id": driver_id,
        "total_seats": 2,
        "pickup_location": "A",
        "destination": "B"
    })
    assert response.status_code == 200
    assert response.json()["total_seats"] == 2
    assert response.json()["available_seats"] == 2

def test_book_ride_success():
    # Setup
    driver_res = client.post("/drivers/", json={"name": "Driver 1"})
    driver_id = driver_res.json()["id"]
    ride_res = client.post("/rides/", json={
        "driver_name": "Driver 1",
        "driver_id": driver_id,
        "total_seats": 2,
        "pickup_location": "A",
        "destination": "B"
    })
    ride_id = ride_res.json()["id"]

    # Book 1st seat
    response = client.post(f"/rides/{ride_id}/book", json={"user_name": "User 1"})
    assert response.status_code == 200
    
    # Check available seats
    rides_res = client.get("/rides/")
    assert rides_res.json()[0]["available_seats"] == 1

def test_overbooking_prevention():
    # Setup
    driver_res = client.post("/drivers/", json={"name": "Driver 1"})
    driver_id = driver_res.json()["id"]
    ride_res = client.post("/rides/", json={
        "driver_name": "Driver 1",
        "driver_id": driver_id,
        "total_seats": 1,
        "pickup_location": "A",
        "destination": "B"
    })
    ride_id = ride_res.json()["id"]

    # Book 1st seat (allowed)
    client.post(f"/rides/{ride_id}/book", json={"user_name": "User 1"})
    
    # Book 2nd seat (should fail)
    response = client.post(f"/rides/{ride_id}/book", json={"user_name": "User 2"})
    assert response.status_code == 400
    assert response.json()["detail"] == "Ride is overbooked"

def test_ride_matching():
    # Setup
    driver_res = client.post("/drivers/", json={"name": "Driver 1"})
    driver_id = driver_res.json()["id"]
    client.post("/rides/", json={
        "driver_name": "Driver 1",
        "driver_id": driver_id,
        "total_seats": 4,
        "pickup_location": "Downtown",
        "destination": "Airport"
    })
    client.post("/rides/", json={
        "driver_name": "Driver 1",
        "driver_id": driver_id,
        "total_seats": 3,
        "pickup_location": "Suburb",
        "destination": "Mall"
    })

    # Search for "Downtown"
    response = client.get("/rides/?pickup=Downtown")
    assert len(response.json()) == 1
    assert response.json()[0]["pickup_location"] == "Downtown"

    # Search for "Mall"
    response = client.get("/rides/?destination=Mall")
    assert len(response.json()) == 1
    assert response.json()[0]["destination"] == "Mall"
