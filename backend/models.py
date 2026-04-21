from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone = Column(String, unique=True, index=True)
    
    bookings = relationship("RideBooking", back_populates="user")

class Driver(Base):
    __tablename__ = "drivers"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    phone_number = Column(String)
    
    rides = relationship("Ride", back_populates="driver")

class Ride(Base):
    __tablename__ = "rides"
    id = Column(Integer, primary_key=True, index=True)
    driver_name = Column(String) 
    driver_id = Column(Integer, ForeignKey("drivers.id"))
    total_seats = Column(Integer)
    available_seats = Column(Integer)
    pickup_location = Column(String)
    destination = Column(String)

    driver = relationship("Driver", back_populates="rides")
    bookings = relationship("RideBooking", back_populates="ride")

    @property
    def driver_phone(self):
        return self.driver.phone_number if self.driver else None

class RideBooking(Base):
    __tablename__ = "ride_bookings"
    id = Column(Integer, primary_key=True, index=True)
    ride_id = Column(Integer, ForeignKey("rides.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    user_name = Column(String) # Keeping for quick display

    ride = relationship("Ride", back_populates="bookings")
    user = relationship("User", back_populates="bookings")

    @property
    def user_phone(self):
        return self.user.phone if self.user else None
