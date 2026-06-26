CREATE DATABASE inventory_db;

CREATE TABLE Users (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Categories (
	id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Suppliers (
	id INT AUTO_INCREMENT PRIMARY KEY,
    company_name VARCHAR(50) NOT NULL,
    contact_person VARCHAR(50) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    address TEXT(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE Products (
	id INT AUTO_INCREMENT PRIMARY KEY,
    category_id INT NOT NULL,
    supplier_id INT NOT NULL,
    sku VARCHAR(30) NOT NULL UNIQUE,
    name VARCHAR(50) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
	quantity INT UNSIGNED NOT NULL DEFAULT 0,
    minimum_stock INT UNSIGNED NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES Categories(id),
    FOREIGN KEY (supplier_id) REFERENCES Suppliers(id)
);

CREATE TABLE Stock_In (
	id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    unit_cost DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE TABLE Stock_Out (
	id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    reason VARCHAR(255) NOT NULL,
    date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES Products(id)
);

CREATE INDEX idx_products_name ON Products(name);

CREATE INDEX idx_products_sku ON Products(sku);

CREATE INDEX idx_products_category ON Products(category_id);

CREATE INDEX idx_products_supplier ON Products(supplier_id);

ALTER TABLE categories ADD COLUMN user_id INT;

ALTER TABLE categories ADD CONSTRAINT fk_categories_user 
FOREIGN KEY (user_id) REFERENCES users(id);

UPDATE products SET user_id = 1;

ALTER TABLE suppliers ADD COLUMN user_id INT;

ALTER TABLE suppliers ADD CONSTRAINT fk_suppliers_user 
FOREIGN KEY (user_id) REFERENCES users(id);

SELECT * FROM categories WHERE id = 1;

SELECT * FROM users;

ALTER TABLE products ADD COLUMN user_id INT;

ALTER TABLE products ADD CONSTRAINT fk_products_user 
FOREIGN KEY (user_id) REFERENCES users(id);

UPDATE products SET user_id = 1;