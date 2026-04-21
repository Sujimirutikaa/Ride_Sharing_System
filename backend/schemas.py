from pydantic import BaseModel
from typing import List, Optional

class UserBase(BaseModel):
    name: str
    phone: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    class Config:
        from_attributes = True

class LoginRequest(BaseModel):
    name: str
    phone: str

class DriverBase(BaseModel):
    name: str
    phone_number: Optional[str] = None

class DriverCreate(DriverBase):
    pass

class Driver(DriverBase):
    id: int
    class Config:
        from_attributes = True

class RideBase(BaseModel):
    driver_name: str
    total_seats: int
    pickup_location: str
    destination: str

class RideCreate(RideBase):
    driver_id: int

class RideBookingBase(BaseModel):
    user_name: str

class RideBookingCreate(RideBookingBase):
    user_id: int # Now required

class RideBooking(RideBookingBase):
    id: int
    ride_id: int
    user_id: Optional[int] = None
    user_phone: Optional[str] = None # Contact for driver
    class Config:
        from_attributes = True

class Ride(RideBase):
    id: int
    available_seats: int
    driver_phone: Optional[str] = None # Contact for user
    bookings: List[RideBooking] = []
    class Config:
        from_attributes = True
