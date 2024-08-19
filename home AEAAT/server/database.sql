CREATE DATABASE aeaat;
GO

USE aeaat;
GO

CREATE TABLE orders (
    order_id INT IDENTITY(1,1) PRIMARY KEY,
    service_id VARCHAR(10),
    customer_name VARCHAR(255),
    address VARCHAR(255),
    service_type VARCHAR(100),
    appointment_date_time DATETIME
);
CREATE TABLE users (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
ALTER TABLE users ADD phone VARCHAR(15) NOT NULL;
ALTER TABLE users ADD address VARCHAR(255) NOT NULL;
