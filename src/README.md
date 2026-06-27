# 🛒 E-Commerce Backend API

A RESTful backend for a full-stack e-commerce mobile application. Built with **Node.js**, **Express**, **TypeScript**, **Prisma ORM**, and **MySQL**. Handles authentication via **Clerk**, payments via **Stripe**, and image uploads via **Multer**.

---

## 🚀 Tech Stack

| Layer       | Technology         |
| ----------- | ------------------ |
| Runtime     | Node.js            |
| Framework   | Express.js         |
| Language    | TypeScript         |
| ORM         | Prisma             |
| Database    | MySQL              |
| Auth        | Clerk (JWT / JWKS) |
| Payments    | Stripe             |
| File Upload | Multer             |
| Dev Server  | Nodemon + tsx      |

---

## 📁 Project Structure

```
backend-ecommerce/
├── prisma/
│   ├── schema.prisma        # Database models
│   └── migrations/          # SQL migration history
├── src/
│   ├── config/
│   │   └── db.ts            # Prisma client instance
│   ├── middleware/
│   │   └── auth.ts          # Clerk auth middleware
│   ├── modules/
│   │   ├── user/            # User management
│   │   ├── product/         # Product CRUD + image upload
│   │   ├── category/        # Product categories
│   │   ├── chart/           # Shopping cart
│   │   ├── bill/            # Orders & billing
│   │   └── reviews/         # Product reviews
│   ├── util/
│   │   ├── types.ts         # Shared TypeScript types
│   │   └── hellper.ts       # Utility functions
│   ├── app.ts               # Express app setup
│   └── server.ts            # Server entry point
├── package.json
└── tsconfig.json
```

---

## 🗄️ Database Schema

The database includes the following models:

- **User** — linked to Clerk auth, with `ADMIN` / `USER` roles
- **Product** — with category, price, discount, quantity, sizes, and images
- **ProductSize** — per-product size variants with individual quantities and prices
- **Category** — product grouping
- **Chart** (Cart) — user cart with order amount and total payment
- **ChartProduct** — cart items with selected colors, sizes, and quantity
- **Bill** — order records with Stripe invoice reference
- **Review** — user reviews per product

---

## 🔌 API Endpoints

All routes are prefixed with `/api/v1`

### 👤 Users

| Method | Endpoint     | Description    |
| ------ | ------------ | -------------- |
| GET    | `/users`     | Get all users  |
| GET    | `/users/:id` | Get user by ID |
| POST   | `/users`     | Create user    |
| PUT    | `/users/:id` | Update user    |

### 📦 Products

| Method | Endpoint        | Description                        |
| ------ | --------------- | ---------------------------------- |
| GET    | `/products`     | Get all products                   |
| GET    | `/products/:id` | Get product by ID                  |
| POST   | `/products`     | Create product (with image upload) |
| PUT    | `/products/:id` | Update product                     |
| DELETE | `/products/:id` | Delete product                     |

### 🗂️ Categories

| Method | Endpoint      | Description        |
| ------ | ------------- | ------------------ |
| GET    | `/categories` | Get all categories |
| POST   | `/categories` | Create category    |

### 🛒 Cart (Chart)

| Method | Endpoint     | Description               |
| ------ | ------------ | ------------------------- |
| GET    | `/chart`     | Get user cart             |
| POST   | `/chart`     | Add item to cart          |
| PUT    | `/chart/:id` | Update cart item quantity |
| DELETE | `/chart/:id` | Remove item from cart     |

### 💳 Bills (Orders)

| Method | Endpoint | Description                    |
| ------ | -------- | ------------------------------ |
| GET    | `/bills` | Get user orders                |
| POST   | `/bills` | Create order (triggers Stripe) |

### ⭐ Reviews

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| GET    | `/reviews/:productId` | Get reviews for a product |
| POST   | `/reviews`            | Add a review              |

### 📊 Charts / Analytics

| Method | Endpoint       | Description          |
| ------ | -------------- | -------------------- |
| GET    | `/chart/stats` | Get sales statistics |

---

## ⚙️ Getting Started

### Prerequisites

- Node.js >= 18
- MySQL database
- Clerk account → [clerk.com](https://clerk.com)
- Stripe account → [stripe.com](https://stripe.com)

### Installation

```bash
# Clone the repository
git clone https://github.com/bensebgag/backend-ecommerce.git
cd backend-ecommerce

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/ecommerce_db"
CLERK_SECRET_KEY=your_clerk_secret_key
STRIPE_SECRET_KEY=your_stripe_secret_key
PORT=3000
```

### Database Setup

```bash
# Run Prisma migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate
```

### Running the Server

```bash
# Development (with hot reload)
npm run dev

# Production build
npm run build
npm start
```

Server runs on `http://localhost:3000`

---

## 🔐 Authentication

All protected routes require a valid **Clerk JWT token** in the `Authorization` header:

```
Authorization: Bearer <your_clerk_token>
```

Authentication is handled via `@clerk/express` middleware using JWKS verification.

---

## 📸 Image Uploads

Product images are uploaded via `multipart/form-data` and served statically from `/images`. Use the field name `image` when sending image files.

---

## 🚧 Work in Progress

This project is currently under active development. Planned features:

- [ ] Docker support for containerized deployment
- [ ] Admin dashboard endpoints
- [ ] Email notifications on order
- [ ] Product search and filtering
- [ ] Unit and integration tests

---

## 👤 Author

**Bensebgag Mohammed Amine**

- GitHub: [@bensebgag](https://github.com/bensebgag)
- LinkedIn: [linkedin.com/in/bensebgag-mohammed-96955625b](https://www.linkedin.com/in/bensebgag-mohammed-96955625b/)
- Email: bensebgagmohammed@gmail.com
