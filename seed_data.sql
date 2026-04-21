-- Seed data for Ride-Sharing System

-- Drivers
INSERT INTO drivers (name) VALUES ('John Doe');
INSERT INTO drivers (name) VALUES ('Jane Smith');
INSERT INTO drivers (name) VALUES ('Michael Scott');

-- Rides
-- Note: ids might vary, but assuming john is 1, jane is 2, michael is 3
INSERT INTO rides (driver_name, driver_id, total_seats, available_seats, pickup_location, destination) 
VALUES ('John Doe', 1, 4, 4, 'Downtown', 'Airport');

INSERT INTO rides (driver_name, driver_id, total_seats, available_seats, pickup_location, destination) 
VALUES ('Jane Smith', 2, 3, 3, 'City Center', 'University');

INSERT INTO rides (driver_name, driver_id, total_seats, available_seats, pickup_location, destination) 
VALUES ('Michael Scott', 3, 4, 1, 'Scranton', 'New York');

-- Ride Bookings
INSERT INTO ride_bookings (ride_id, user_name) VALUES (3, 'Pam Beesly');
INSERT INTO ride_bookings (ride_id, user_name) VALUES (3, 'Jim Halpert');
INSERT INTO ride_bookings (ride_id, user_name) VALUES (3, 'Dwight Schrute');
-- Ride 3 has total 4 seats, 3 bookings, 1 available seat left.
