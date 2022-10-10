-- create a MySQL server and management dev account

CREATE DATABASE IF NOT EXISTS stock_inventory;
CREATE USER IF NOT EXISTS 'stock_dev'@'localhost' IDENTIFIED BY 'dev123';
GRANT ALL PRIVILEGES ON stock_inventory.* TO 'stock_dev'@'localhost';
FLUSH PRIVILEGES;