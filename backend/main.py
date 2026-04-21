from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from . import crud, models, schemas
from .database import SessionLocal, engine, get_db

from fastapi.middleware.cors import CORSMiddleware

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Ride-Sharing API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/users/register", response_model=schemas.User)
def register_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_name_and_phone(db, name=user.name, phone=user.phone)
    if db_user:
        raise HTTPException(status_code=400, detail="User already registered")
    return crud.create_user(db, user=user)

@app.post("/users/login", response_model=schemas.User)
def login_user(login: schemas.LoginRequest, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_name_and_phone(db, name=login.name, phone=login.phone)
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.post("/drivers/", response_model=schemas.Driver)
def create_driver(driver: schemas.DriverCreate, db: Session = Depends(get_db)):
    return crud.create_driver(db=db, driver=driver)

@app.post("/drivers/login", response_model=schemas.Driver)
def login_driver(login: schemas.LoginRequest, db: Session = Depends(get_db)):
    db_driver = crud.get_driver_by_name_and_phone(db, name=login.name, phone=login.phone)
    if not db_driver:
        raise HTTPException(status_code=404, detail="Driver not found")
    return db_driver

@app.get("/rides/", response_model=List[schemas.Ride])
def read_rides(pickup: Optional[str] = None, destination: Optional[str] = None, driver_id: Optional[int] = None, db: Session = Depends(get_db)):
    rides = crud.get_rides(db, pickup=pickup, destination=destination, driver_id=driver_id)
    return rides

@app.post("/rides/", response_model=schemas.Ride)
def create_ride(ride: schemas.RideCreate, db: Session = Depends(get_db)):
    return crud.create_ride(db=db, ride=ride)

@app.post("/rides/{ride_id}/book", response_model=schemas.RideBooking)
def book_ride(ride_id: int, booking: schemas.RideBookingCreate, db: Session = Depends(get_db)):
    return crud.book_ride(db=db, ride_id=ride_id, booking=booking)

@app.get("/bookings/", response_model=List[schemas.RideBooking])
def read_bookings(user_id: Optional[int] = None, db: Session = Depends(get_db)):
    return crud.get_bookings(db, user_id=user_id)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
