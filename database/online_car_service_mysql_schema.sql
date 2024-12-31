-- Create the database if it does not exist
CREATE DATABASE IF NOT EXISTS online_car_service;
USE online_car_service;

-- Users Table (with new roles)
CREATE TABLE IF NOT EXISTS Users (
    User_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Phone VARCHAR(15),
    Address TEXT,
    Password VARCHAR(255) NOT NULL,
    Role ENUM('Admin', 'Customer', 'Mechanic') NOT NULL DEFAULT 'Customer' -- Changed 'User' to 'Customer'
);

-- Vehicles Table
CREATE TABLE IF NOT EXISTS Vehicles (
    Vehicle_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT NOT NULL,
    Make VARCHAR(255) NOT NULL,
    Model VARCHAR(255) NOT NULL,
    Year INT,
    Registration_Number VARCHAR(255) UNIQUE,
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID)
);

-- Service Centers Table
CREATE TABLE IF NOT EXISTS Service_Centers (
    Center_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Location TEXT NOT NULL,
    Contact VARCHAR(15)
);

-- Services Table
CREATE TABLE IF NOT EXISTS Services (
    Service_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Description TEXT,
    Price DECIMAL(10, 2) NOT NULL,
    Category_ID INT,
    FOREIGN KEY (Category_ID) REFERENCES Categories(Category_ID)
);

-- Categories Table
CREATE TABLE IF NOT EXISTS Categories (
    Category_ID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL UNIQUE
);

-- Service_Categories Table to link services to categories
CREATE TABLE IF NOT EXISTS Service_Categories (
    Service_ID INT NOT NULL,
    Category_ID INT NOT NULL,
    PRIMARY KEY (Service_ID, Category_ID),
    FOREIGN KEY (Service_ID) REFERENCES Services(Service_ID),
    FOREIGN KEY (Category_ID) REFERENCES Categories(Category_ID)
);

-- Bookings Table
CREATE TABLE IF NOT EXISTS Bookings (
    Booking_ID INT AUTO_INCREMENT PRIMARY KEY,
    User_ID INT NOT NULL,
    Center_ID INT NOT NULL,
    Service_ID INT NOT NULL,
    Booking_Date DATETIME NOT NULL,
    Status ENUM('Pending', 'Confirmed', 'Completed', 'Cancelled') NOT NULL,
    FOREIGN KEY (User_ID) REFERENCES Users(User_ID),
    FOREIGN KEY (Center_ID) REFERENCES Service_Centers(Center_ID),
    FOREIGN KEY (Service_ID) REFERENCES Services(Service_ID)
);

-- Payments Table
CREATE TABLE IF NOT EXISTS Payments (
    Payment_ID INT AUTO_INCREMENT PRIMARY KEY,
    Booking_ID INT NOT NULL,
    Amount DECIMAL(10, 2) NOT NULL,
    Payment_Date DATETIME NOT NULL,
    Payment_Status ENUM('Paid', 'Pending', 'Failed') NOT NULL,
    FOREIGN KEY (Booking_ID) REFERENCES Bookings(Booking_ID)
);

-- Insert sample data into Categories table
INSERT INTO Categories (Name) VALUES
('Maintenance'),
('Repair'),
('Diagnostics'),
('Cleaning'),
('Tires'),
('Accessories'),
('Others');

-- Maintenance Category (ID = 1) - Reduced services to 5
INSERT INTO Services (Service_ID, Name, Description, Price, Category_ID) VALUES
(1, 'Oil Change', 'Change engine oil and replace oil filter.', 29.99, 1),
(4, 'Oil Change', 'Change engine oil and replace oil filter.', 29.99, 1),
(7, 'Oil Change', 'Change engine oil and replace oil filter.', 29.99, 1),
(10, 'Oil Change', 'Change engine oil and replace oil filter.', 29.99, 1),
(13, 'Oil Change', 'Change engine oil and replace oil filter.', 29.99, 1);

-- Tires Category (ID = 5) - Reduced services to 5
INSERT INTO Services (Service_ID, Name, Description, Price, Category_ID) VALUES
(2, 'Tire Rotation', 'Rotate tires to ensure even wear.', 19.99, 5),
(5, 'Tire Rotation', 'Rotate tires to ensure even wear.', 19.99, 5),
(8, 'Tire Rotation', 'Rotate tires to ensure even wear.', 19.99, 5),
(11, 'Tire Rotation', 'Rotate tires to ensure even wear.', 19.99, 5),
(14, 'Tire Rotation', 'Rotate tires to ensure even wear.', 19.99, 5);

-- Repair Category (ID = 2) - Reduced services to 5
INSERT INTO Services (Service_ID, Name, Description, Price, Category_ID) VALUES
(3, 'Brake Inspection', 'Inspect and test brake system.', 49.99, 2),
(6, 'Brake Inspection', 'Inspect and test brake system.', 49.99, 2),
(9, 'Brake Inspection', 'Inspect and test brake system.', 49.99, 2),
(12, 'Brake Inspection', 'Inspect and test brake system.', 49.99, 2),
(15, 'Brake Inspection', 'Inspect and test brake system.', 49.99, 2);

-- Diagnostics Category (ID = 3) - New services added
INSERT INTO Services (Service_ID, Name, Description, Price, Category_ID) VALUES
(16, 'Diagnostic Test', 'Perform an engine diagnostic test.', 49.99, 3),
(17, 'Check Engine Light Diagnosis', 'Read and diagnose check engine light codes.', 59.99, 3),
(18, 'Battery Health Check', 'Test battery voltage and health.', 19.99, 3),
(19, 'Fluid Check', 'Inspect and refill essential fluids.', 29.99, 3);

-- Cleaning Category (ID = 4) - New services added
INSERT INTO Services (Service_ID, Name, Description, Price, Category_ID) VALUES
(20, 'Interior Cleaning', 'Clean and sanitize the interior of the vehicle.', 29.99, 4),
(21, 'Exterior Wash', 'Hand wash the exterior of the car.', 19.99, 4),
(22, 'Detailing', 'Full detailing of vehicle including waxing and interior treatment.', 99.99, 4),
(23, 'Carpet Cleaning', 'Shampoo and clean floor mats and carpets.', 39.99, 4);

-- Accessories Category (ID = 6) - New services added
INSERT INTO Services (Service_ID, Name, Description, Price, Category_ID) VALUES
(24, 'Car Alarm Installation', 'Install a new car alarm system.', 149.99, 6),
(25, 'GPS Installation', 'Install GPS navigation system.', 199.99, 6),
(26, 'Bluetooth Kit Installation', 'Install Bluetooth connectivity for hands-free calls.', 99.99, 6),
(27, 'Backup Camera Installation', 'Install a rearview camera system.', 129.99, 6);

-- Others Category (ID = 7) - New services added
INSERT INTO Services (Service_ID, Name, Description, Price, Category_ID) VALUES
(28, 'Window Tinting', 'Apply tint to vehicle windows.', 149.99, 7),
(29, 'Windshield Repair', 'Repair chips and cracks in the windshield.', 59.99, 7),
(30, 'Paint Protection', 'Apply a protective coating on the vehicle’s paint.', 129.99, 7),
(31, 'Rust Removal', 'Remove rust and treat affected areas.', 79.99, 7);

-- Link services to categories in Service_Categories table
INSERT INTO Service_Categories (Service_ID, Category_ID) VALUES
(1, 1), -- Oil Change -> Maintenance
(2, 1), -- Tire Rotation -> Maintenance
(3, 2), -- Brake Inspection -> Repair
(4, 2), -- Brake Fluid Replacement -> Repair
(5, 2), -- Suspension Repair -> Repair
(16, 3), -- Diagnostic Test -> Diagnostics
(17, 3), -- Check Engine Light Diagnosis -> Diagnostics
(18, 3), -- Battery Health Check -> Diagnostics
(19, 3), -- Fluid Check -> Diagnostics
(20, 4), -- Interior Cleaning -> Cleaning
(21, 4), -- Exterior Wash -> Cleaning
(22, 4), -- Detailing -> Cleaning
(23, 4), -- Carpet Cleaning -> Cleaning
(24, 6), -- Car Alarm Installation -> Accessories
(25, 6), -- GPS Installation -> Accessories
(26, 6), -- Bluetooth Kit Installation -> Accessories
(27, 6), -- Backup Camera Installation -> Accessories
(28, 7), -- Window Tinting -> Others
(29, 7), -- Windshield Repair -> Others
(30, 7), -- Paint Protection -> Others
(31, 7); -- Rust Removal -> Others

-- Insert sample data into Users table (with roles)
INSERT INTO Users (Name, Email, Phone, Address, Password, Role) VALUES
('John Doe', 'john@example.com', '1234567890', '1234 Elm Street, Springfield, IL', 'password123', 'Customer'),
('Jane Smith', 'jane@example.com', '9876543210', '5678 Oak Avenue, Chicago, IL', 'securepassword', 'Customer'),
('Mike Mechanic', 'mike@example.com', '5555555555', '7890 Maple Road, New York, NY', 'mechanicpassword', 'Mechanic'),
('Alice Admin', 'alice@example.com', '5551234567', '1010 Admin Street, Cityville', 'adminpassword', 'Admin');

-- Insert sample data into Vehicles table
INSERT INTO Vehicles (User_ID, Make, Model, Year, Registration_Number) VALUES
(1, 'Toyota', 'Camry', 2020, 'ABC123'),
(2, 'Honda', 'Civic', 2019, 'XYZ456');

-- Insert sample data into Service_Centers table
INSERT INTO Service_Centers (Name, Location, Contact) VALUES
('Springfield Auto Center', '123 Main Street, Springfield, IL', '555-1234'),
('Chicago Car Repair', '456 Park Avenue, Chicago, IL', '555-5678');

-- Insert sample data into Bookings table
INSERT INTO Bookings (User_ID, Center_ID, Service_ID, Booking_Date, Status) VALUES
(1, 1, 1, '2024-12-15 10:00:00', 'Confirmed'),
(2, 2, 2, '2024-12-16 14:00:00', 'Pending');

-- Insert sample data into Payments table
INSERT INTO Payments (Booking_ID, Amount, Payment_Date, Payment_Status) VALUES
(1, 29.99, '2024-12-15 11:00:00', 'Paid'),
(2, 19.99, '2024-12-16 15:00:00', 'Pending');

-- Upsert user data based on the provided FormData
INSERT INTO Users (Name, Email, Phone, Address, Password, Role)
VALUES ('omkar', 'kailaspatil4033@gmail.com', '8788667043', 'prakash nagar latur', 'Okar@4033', 'Admin')
ON DUPLICATE KEY UPDATE
    Name = VALUES(Name),
    Phone = VALUES(Phone),
    Address = VALUES(Address),
    Password = VALUES(Password),
    Role = CASE 
              WHEN VALUES(Role) IN ('Admin', 'Customer', 'Mechanic') THEN VALUES(Role)
              ELSE Role
           END;

-- Change the Role column datatype from ENUM to VARCHAR
ALTER TABLE Users
MODIFY COLUMN Role VARCHAR(50) NOT NULL DEFAULT 'Customer';

-- Verify the updated Services table
SELECT * FROM Services;
