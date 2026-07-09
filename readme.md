# 🚀 FixItNow - Home Service Marketplace Backend API

A robust and scalable RESTful API for **FixItNow**, a home service marketplace where customers can book services, technicians can manage bookings and availability, and administrators can manage the platform.

---

## 🔗 Live Links

- 🌐 **Backend API:** https://fixitnow-xi.vercel.app/
- 🗂️ **ERD Diagram:** https://drawsql.app/teams/ehasun-ul-islam/diagrams/fixitnow

---

# ✨ Features

## 🔐 Authentication

- User Registration (Customer / Technician)
- Secure Login with JWT
- Refresh Token Support
- Role-Based Authorization
- Get Current Logged-in User

---

## 👨‍🔧 Technician Features

- Create Technician Profile
- Update Technician Profile
- Manage Availability Slots
- View Assigned Bookings
- Accept / Decline / Complete Bookings

---

## 👤 Customer Features

- Browse Services
- Browse Technicians
- Create Booking
- View Booking History
- Make Secure Payments
- View Payment History
- Leave Reviews after Completed Services

---

## 💳 Payment

- Stripe Payment Integration
- Payment Intent Creation
- Payment Confirmation
- Payment History

---

## 📂 Service Categories

- Get All Categories
- Create Category (Admin)
- Update Category (Admin)
- Delete Category (Admin)

---

## 🛡️ Admin Features

- Get All Users
- Ban / Unban Users
- Get All Bookings
- Manage Categories

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT
- Cookie Parser
- bcrypt

## Payment

- Stripe

## Other Packages

- CORS
- HTTP Status
- dotenv

---

# 📁 Project Structure

```text
src
│
├── config
├── errors
├── lib
├── middleware
├── modules
│   ├── admin
│   ├── auth
│   ├── availability
│   ├── booking
│   ├── category
│   ├── payment
│   ├── review
│   ├── service
│   └── technician
│
├── utils
├── app.ts
└── server.ts
```

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/ehasunulislam/Ph_l2_A4_FixItNow-_backend.git
```

## Install Packages

```bash
npm install
```

## Setup Environment Variables

Create a `.env` file.

```env
PORT= Your_backend_port_here
database_url= Your_connection_string_here
app_url = your_app_url

bcrypt_salt_rounds = bcrypt_time_provided

jwt_access_secret = jwt_access
jwt_access_expires_in = jwt_access_expire_time

jwt_refresh_secret = jwt_refresh
jwt_refresh_expires_in = jwt_refresh_expire_time

STIPE_PUBLISH_KEY= Your_stripe_publish_kyey
STRIPE_SECRET_KEY = Your_stripe_secrect_key
```

---

## Prisma

Generate Prisma Client

```bash
npx prisma generate
```

Run Migration

```bash
npx prisma migrate dev
```

---

## Run Development Server

```bash
npm run dev
```

---

# 📌 API Endpoints

---

## 🔐 Authentication

| Method | Endpoint | Description |
|--------|------------------------------|--------------------------------------------|
| POST | `/api/auth/register` | Register a new user (Customer / Technician) |
| POST | `/api/auth/login` | Login user and return JWT |
| GET | `/api/auth/me` | Get current authenticated user |
| POST | `/api/auth/refresh-token` | Generate a new access token |

---

## 👨‍🔧 Technician

| Method | Endpoint | Description |
|--------|------------------------------------|-------------------------------------------|
| GET | `/api/technician` | Get all technicians |
| GET | `/api/technician/:id` | Get technician details by ID |
| GET | `/api/technician/profile` | Get logged-in technician profile |
| PUT | `/api/technician/profile` | Update technician profile |
| GET | `/api/technician/bookings` | Get technician bookings |
| PATCH | `/api/technician/:id/status` | Update booking status (Accept / Decline / Complete) |

---

## 📅 Availability

| Method | Endpoint | Description |
|--------|------------------------------------------|--------------------------------|
| POST | `/api/technician/availability` | Create availability slot |
| GET | `/api/technician/availability` | Get my availability |
| PUT | `/api/technician/availability/:id` | Update availability |
| DELETE | `/api/technician/availability/:id` | Delete availability |

---

## 📂 Categories

| Method | Endpoint | Description |
|--------|-----------------------------|-------------------------|
| GET | `/api/categories` | Get all categories |
| POST | `/api/categories` | Create category (Admin) |
| PATCH | `/api/categories/:id` | Update category (Admin) |
| DELETE | `/api/categories/:id` | Delete category (Admin) |

---

## 🛠️ Services

| Method | Endpoint | Description |
|--------|----------------------------|----------------------------|
| GET | `/api/services` | Get all services |
| POST | `/api/services` | Create a new service |
| PATCH | `/api/services/:id` | Update service |
| DELETE | `/api/services/:id` | Delete service |

---

## 📖 Bookings

| Method | Endpoint | Description |
|--------|-----------------------------|-----------------------------|
| POST | `/api/bookings` | Create a booking |
| GET | `/api/bookings` | Get logged-in customer's bookings |
| GET | `/api/bookings/:id` | Get booking details |

---

## 💳 Payments

| Method | Endpoint | Description |
|--------|----------------------------------|---------------------------------------|
| POST | `/api/payments/create` | Create Stripe payment |
| POST | `/api/payments/confirm` | Confirm payment |
| GET | `/api/payments` | Get payment history |
| GET | `/api/payments/:id` | Get payment details |

---

## ⭐ Reviews

| Method | Endpoint | Description |
|--------|----------------------------------|--------------------------------|
| POST | `/api/reviews` | Create a review |
| GET | `/api/reviews` | Get all reviews |
| GET | `/api/reviews/my-reviews` | Get logged-in customer's reviews |

---

## 🛡️ Admin

| Method | Endpoint | Description |
|--------|-----------------------------------|--------------------------------|
| GET | `/api/admin/users` | Get all users |
| PATCH | `/api/admin/users/:id` | Update user status (Ban / Unban) |
| GET | `/api/admin/bookings` | Get all bookings |
| GET | `/api/admin/categories` | Get all categories |
| POST | `/api/admin/categories` | Create a category |
---

# 🔐 User Roles

- 👤 Customer
- 👨‍🔧 Technician
- 🛡️ Admin

---

# 💳 Payment Flow

```text
Customer
      │
      ▼
Create Booking
      │
      ▼
Technician Accepts Booking
      │
      ▼
Create Stripe Payment
      │
      ▼
Payment Confirmation
      │
      ▼
Booking Completed
```


# 👨‍💻 Author

### Ehasun Ul Islam

Full Stack Developer

GitHub:
https://github.com/ehasunulislam

LinkedIn:
https://www.linkedin.com/in/ehasun/

---

# 📄 License

This project was developed as part of the Backend Development.