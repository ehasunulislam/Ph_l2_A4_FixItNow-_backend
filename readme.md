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

| Method | Endpoint |
|----------|----------------|
| POST | `/api/auth/register` |
| POST | `/api/auth/login` |
| GET | `/api/auth/me` |
| POST | `/api/auth/refresh-token` |

---

## 📂 Categories

| Method | Endpoint |
|----------|----------------|
| GET | `/api/categories` |

---

## 🛠️ Services

| Method | Endpoint |
|----------|----------------|
| GET | `/api/services` |
| POST | `/api/services` |
| PATCH | `/api/services/:id` |
| DELETE | `/api/services/:id` |

---

## 👨‍🔧 Technician

| Method | Endpoint |
|----------|----------------|
| GET | `/api/technician` |
| GET | `/api/technician/:id` |
| GET | `/api/technician/profile` |
| PUT | `/api/technician/profile` |
| POST | `/api/technician/availability` |
| GET | `/api/technician/availability` |
| PUT | `/api/technician/availability/:id` |
| DELETE | `/api/technician/availability/:id` |
| GET | `/api/technician/bookings` |
| PATCH | `/api/technician/:id/status` |

---

## 📅 Bookings

| Method | Endpoint |
|----------|----------------|
| POST | `/api/bookings` |
| GET | `/api/bookings` |
| GET | `/api/bookings/:id` |

---

## 💳 Payments

| Method | Endpoint |
|----------|----------------|
| POST | `/api/payments/create` |
| POST | `/api/payments/confirm` |
| GET | `/api/payments` |
| GET | `/api/payments/:id` |

---

## ⭐ Reviews

| Method | Endpoint |
|----------|----------------|
| POST | `/api/reviews` |

---

## 🛡️ Admin

| Method | Endpoint |
|----------|----------------|
| GET | `/api/admin/users` |
| PATCH | `/api/admin/users/:id` |
| GET | `/api/admin/bookings` |
| GET | `/api/admin/categories` |
| POST | `/api/admin/categories` |

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