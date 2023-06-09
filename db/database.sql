CREATE DATABASE IF NOT EXISTS usersdb;

USE usersdb;

CREATE TABLE users (
    id INT NOT NULL AUTO_INCREMENT,
    rol_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL UNIQUE,
    image VARCHAR(300) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (rol_id) REFERENCES roles (id)
);

CREATE TABLE roles(
    id INT NOT NULL AUTO_INCREMENT,
    rol VARCHAR(15) NOT NULL,
    PRIMARY KEY (id)
);
