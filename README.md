# Online Car Service Station

## Overview
The Online Car Service Station is a full-stack web application designed to provide users with an easy way to book car services online. 
The platform allows customers to select services, manage their vehicles, make payments, and track bookings. Admins can manage services, bookings, and user accounts through a dedicated admin panel.

##ScreenShots : -
![WhatsApp Image 2025-02-11 at 11 16 55_3b310a96](https://github.com/user-attachments/assets/e04c82ec-c6bf-4d9d-b126-adddfd2e31ed) ![WhatsApp Image 2025-02-11 at 11 16 56_138b761e](https://github.com/user-attachments/assets/82976b65-5366-4713-934d-ce8dfb7f2595)
![WhatsApp Image 2025-02-11 at 11 16 57_2fec77c2](https://github.com/user-attachments/assets/bbb79259-1c22-4498-bd6d-bcc33757a185)
![WhatsApp Image 2025-02-11 at 11 16 59_dd0a175f](https://github.com/user-attachments/assets/e7e2eddf-cc65-4308-ad85-b428cea9da0e)



## Tech Stack
### Frontend:
- React.js
- Redux (for state management)
- Tailwind CSS (for styling)
- Axios (for API calls)

### Backend:
- Spring Boot (Java)
- Spring Security (for authentication & authorization)
- Spring JPA (for database interaction)
- MySQL (database)

### Payment Integration:
-stripe

## Features

### User Features:
- Register/Login using JWT authentication
- Add and manage car details
- Book car services
- Make secure payments using Razorpay/PayPal
- View booking history

### Admin Features:
- Manage car service categories and services
- Update and delete services
- View and manage customer bookings
- Monitor payments and transactions

## Setup and Installation
### Backend (Spring Boot):
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/online-car-service.git
   cd online-car-service/backend
   ```
2. Configure MySQL database in `application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/car_service
   spring.datasource.username=root
   spring.datasource.password=yourpassword
   ```
3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

### Frontend (React):
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React app:
   ```bash
   npm start
   ```





