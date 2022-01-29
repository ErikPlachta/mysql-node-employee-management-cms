
-- Remove if exists
DROP DATABASE IF EXISTS employee_db;

-- Make a new database
CREATE DATABASE employee_db;

-- Tell MySQL what to use
USE employee_db;


-- Adding a table to database
CREATE TABLE Department (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE Role (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT NOT NULL
);

CREATE TABLE Employee (
    id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT
);

-- print to console
-- DESCRIBE Department;
-- DESCRIBE Role;
-- DESCRIBE Employee;