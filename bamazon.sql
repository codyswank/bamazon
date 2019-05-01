DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;
USE bamazon;
CREATE TABLE products(
    item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("Xbox", "Electronics", 199.99, 20),
        ("PS4", "Electronics", 205.95, 24),
        ("AA Batterys", "Appliances", 19.99, 50),
        ("Cookbook", "Books", 8.95, 13),
        ("Golf Balls", "Sports", 14.35, 43),
        ("Bananas", "Produce", 4.23, 34);
SELECT * FROM products;