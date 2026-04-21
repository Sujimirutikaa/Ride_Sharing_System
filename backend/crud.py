from sqlalchemy.orm import Session
from . import models, schemas
from fastapi import HTTPException

def get_driver(db: Session, driver_id: int):
    return db.query(models.Driver).filter(models.Driver.id == driver_id).first()

def get_driver_by_name_and_phone(db: Session, name: str, phone: str):
    return db.query(models.Driver).filter(models.Driver.name == name, models.Driver.phone_number == phone).first()

def create_driver(db: Session, driver: schemas.DriverCreate):
    db_driver = models.Driver(name=driver.name, phone_number=driver.phone_number)
    db.add(db_driver)
    db.commit()
    db.refresh(db_driver)
    return db_driver

def get_user_by_name_and_phone(db: Session, name: str, phone: str):
    return db.query(models.User).filter(models.User.name == name, models.User.phone == phone).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(name=user.name, phone=user.phone)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def get_rides(db: Session, pickup: str = None, destination: str = None, driver_id: int = None):
    query = db.query(models.Ride)
    if pickup:
        query = query.filter(models.Ride.pickup_location.ilike(f"%{pickup}%"))
    if destination:
        query = query.filter(models.Ride.destination.ilike(f"%{destination}%"))
    if driver_id:
        query = query.filter(models.Ride.driver_id == driver_id)
    return query.all()

def create_ride(db: Session, ride: schemas.RideCreate):
    db_ride = models.Ride(
        driver_name=ride.driver_name,
        driver_id=ride.driver_id,
        total_seats=ride.total_seats,
        available_seats=ride.total_seats,
        pickup_location=ride.pickup_location,
        destination=ride.destination
    )
    db.add(db_ride)
    db.commit()
    db.refresh(db_ride)
    return db_ride

def book_ride(db: Session, ride_id: int, booking: schemas.RideBookingCreate):
    db_ride = db.query(models.Ride).filter(models.Ride.id == ride_id).first()
    if not db_ride:
        raise HTTPException(status_code=404, detail="Ride not found")
    
    if db_ride.available_seats <= 0:
        raise HTTPException(status_code=400, detail="Ride is overbooked")
    
    db_booking = models.RideBooking(
        ride_id=ride_id, 
        user_id=booking.user_id,
        user_name=booking.user_name
    )
    db_ride.available_seats -= 1
    
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

def get_bookings(db: Session, user_id: int = None):
    query = db.query(models.RideBooking)
    if user_id:
        query = query.filter(models.RideBooking.user_id == user_id)
    return query.all()
