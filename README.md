# Ride-Sharing System (RideFlow)

A modern, full-stack ride-sharing application built with FastAPI and React.

## Features
- **Driver Management**: Register as a driver.
- **Ride Offering**: Drivers can offer rides with specific pickup/destination and seat capacity.
- **Ride Booking**: Users can search for rides by location and book available seats.
- **Overbooking Prevention**: The system ensures a ride cannot be booked beyond its capacity.
- **Premium UI**: Modern dark-themed dashboard with glassmorphism and smooth animations.
- **Generated SDK**: Includes a Python SDK for programmatic interaction with the API.

## Project Structure
- `backend/`: FastAPI application, models, and SQLite database.
- `frontend/`: React + Vite application with Axios and Framer Motion.
- `ride_sdk/`: Automatically generated Python SDK for the API.
- `setupdev.bat`: Development environment setup script.
- `runapplication.bat`: Script to run the full application.

## Prerequisites
- Python 3.10+
- Node.js & npm

## Setup & Execution

### 1. Automated Setup
Run the setup script to create the virtual environment, install dependencies, and run migrations:
```bash
setupdev.bat
```

### 2. Running the Application
Run the execution script to start both the backend and frontend:
```bash
runapplication.bat
```
- Backend will run at: `http://localhost:8000`
- Frontend will run at: `http://localhost:5173` (Vite default)
- Swagger UI Documentation: `http://localhost:8000/docs`

### 3. Database Seed Data
An initial `seed_data.sql` file is provided. You can populate the database manually or use the setup script which initializes the schema via Alembic.

## SDK Usage
The SDK is located in the `ride_sdk` folder. Here is an example of how to use it:

```python
from ride_sdk.api_client import ApiClient
from ride_sdk.api.rides_api import RidesApi
from ride_sdk.configuration import Configuration

# Define configuration
config = Configuration(host="http://localhost:8000")
client = ApiClient(config)
api = RidesApi(client)

# List all rides
rides = api.read_rides_rides_get()
for ride in rides:
    print(f"{ride.driver_name} going from {ride.pickup_location} to {ride.destination}")
```

## Testing
To run backend unit tests:
```bash
cd backend
.\env\Scripts\activate
pytest tests/test_main.py
```
