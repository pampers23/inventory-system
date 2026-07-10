# Inventory Management API

A RESTful Inventory Management System built with **Node.js**, **Express.js**, and **MySQL**. This project is designed to practice backend development concepts such as authentication, CRUD operations, relational database design, transactions, and REST API development.

---

## 🚀 Features

### Authentication

* User Registration
* User Login
* JWT Authentication
* Password Hashing with bcrypt
* Role-Based Authorization (Admin, Manager, Staff)

### Categories

* Create Category
* View Categories
* Update Category
* Delete Category

### Suppliers

* Create Supplier
* View Suppliers
* Update Supplier
* Delete Supplier

### Products

* Create Product
* View Products
* Update Product
* Delete Product
* Search Products
* Pagination
* Filter by Category
* Filter by Supplier

### Inventory

* Stock In
* Stock Out
* Automatic Quantity Updates
* MySQL Transactions

### Reports

* Inventory Report
* Low Stock Report
* Purchase Report
* Sales Report

---

## 🛠 Tech Stack

* Node.js
* Express.js
* MySQL
* mysql2
* JSON Web Token (JWT)
* bcrypt
* dotenv
* express-validator
* Morgan
* CORS

---

## 📁 Project Structure

```text
inventory-management-api/
│
├── src/
│   ├── config/
│   │   └── database.js
│   │
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── utils/
│   └── app.js
│
├── database/
│   ├── schema.sql
│   ├── seed.sql
│   ├── views.sql
│   └── procedures.sql
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## 🗄 Database Tables

* Users
* Categories
* Suppliers
* Products
* Stock_In
* Stock_Out

---

## 📌 API Endpoints

### Authentication

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register a new user    |
| POST   | `/api/auth/login`    | Login user             |
| GET    | `/api/auth/profile`  | Get authenticated user |

### Categories

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | `/api/categories`     |
| GET    | `/api/categories/:id` |
| POST   | `/api/categories`     |
| PUT    | `/api/categories/:id` |
| DELETE | `/api/categories/:id` |

### Suppliers

| Method | Endpoint             |
| ------ | -------------------- |
| GET    | `/api/suppliers`     |
| GET    | `/api/suppliers/:id` |
| POST   | `/api/suppliers`     |
| PUT    | `/api/suppliers/:id` |
| DELETE | `/api/suppliers/:id` |

### Products

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | `/api/products`     |
| GET    | `/api/products/:id` |
| POST   | `/api/products`     |
| PUT    | `/api/products/:id` |
| DELETE | `/api/products/:id` |

### Inventory

| Method | Endpoint                   |
| ------ | -------------------------- |
| POST   | `/api/inventory/stock-in`  |
| POST   | `/api/inventory/stock-out` |

### Reports

| Method | Endpoint                 |
| ------ | ------------------------ |
| GET    | `/api/reports/inventory` |
| GET    | `/api/reports/low-stock` |
| GET    | `/api/reports/purchases` |
| GET    | `/api/reports/sales`     |

---

## ⚙️ Installation

Clone the repository:

```bash
git clone <repository-url>
```

Install dependencies:

```bash
npm install
```

Create a `.env` file:

```env
PORT=5000

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=inventory_db

JWT_SECRET=your_secret_key
```

Start the development server:

```bash
npm run dev
```

---

## 🧪 Future Improvements

* Product Image Upload
* Barcode Support
* QR Code Generation
* Email Notifications
* Audit Logs
* Docker Support
* Unit Testing
* Integration Testing
* Swagger API Documentation
* Redis Caching
* CI/CD with GitHub Actions

---

## 🎯 Learning Objectives

This project demonstrates:

* REST API Design
* Authentication & Authorization
* MySQL Database Design
* SQL Joins
* Transactions
* Error Handling
* Input Validation
* Clean Project Architecture
* Environment Configuration
* Backend Best Practices

---

## 📄 License

This project is for educational and portfolio purposes.
