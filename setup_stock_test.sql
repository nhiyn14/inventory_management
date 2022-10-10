-- create a MySQL server and management test account

CREATE DATABASE IF NOT EXISTS stock_inventory;
CREATE USER IF NOT EXISTS 'stock_test'@'localhost' IDENTIFIED BY 'test123';
GRANT ALL PRIVILEGES ON stock_inventory.* TO 'stock_test'@'localhost';
FLUSH PRIVILEGES;