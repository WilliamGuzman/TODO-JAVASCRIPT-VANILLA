CREATE DATABASE nerdify;

USE nerdify;

CREATE TABLE todo (
    id int PRIMARY KEY AUTO_INCREMENT,
    text varchar(255) NOT NULL,
    completed int DEFAULT 0 NOT NULL
);

