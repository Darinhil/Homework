# Product Management API (Node.js + TypeScript + MVC)

A simple CRUD REST API built using **Node.js, Express, TypeScript, and MySQL** following the **MVC architecture pattern**.

---

# Features

* Create product
* Read all products
* Read product by ID
* Update product
* Delete product
* MVC structure (Model, Controller, Service, Route)
* MySQL database integration
* TypeScript support

---

# Tech Stack

* Node.js
* Express.js
* TypeScript
* MySQL
* mysql2

---

# 📁 Project Structure

```
src/
│
├── config/        # Database connection
├── models/        # Interfaces (User model)
├── services/      # Business logic (DB queries)
├── controllers/   # Request/Response handling
├── routes/        # API routes
├── app.ts         # Express app setup
└── server.ts      # Server entry point
```

---

# ⚙️ Installation

## 1. Clone project

```bash
git clone https://github.com/tolatim/user_management.git
cd user_management
```

---

## 2. Install dependencies

```bash
npm install
```

---

## 3. Setup database

Create MySQL database:

```sql
CREATE DATABASE products_db;

USE products_db;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  price DECIMAL(10,2),
  description TEXT,
  stock INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 4. Configure environment

Create `.env` file:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=products_db
PORT=3000
```

---

## 5. Run project

### Development mode

```bash
npm run dev
```

---

# 📡 API Endpoints

| Method | Endpoint   | Description     |
| ------ | ---------- | --------------- |
| GET    | /products     | Get all products   |
| GET    | /products/:id | Get product by ID  |
| POST   | /products     | Create new product |
| PUT    | /products/:id | Update product     |
| DELETE | /products/:id | Delete product     |

---

# 📦 Example Request

### Create Product

```json
POST /products
Content-Type: application/json

{
  "name": "Laptop",
  "price": 999.99,
  "description": "High-performance laptop",
  "stock": 10
}
```

---

# 📤 Example Response

```json
{
  "success": true,
  "message": "Product created successfully",
  "data": {
    "id": 1,
    "name": "Laptop",
    "price": 999.99,
    "description": "High-performance laptop",
    "stock": 10
  }
}
```

---

# 🧠 MVC Architecture

* **Model** → Data structure (Product interface)
* **Service** → Database logic (SQL queries)
* **Controller** → Handles request/response
* **Route** → API endpoints

---

# 📌 Notes

* `node_modules/` and `dist/` are ignored in `.gitignore`
* TypeScript compiles to JavaScript in `dist/`
* Express must use `express.json()` middleware

---

# 👨‍💻 Author

Made by **Tola**
