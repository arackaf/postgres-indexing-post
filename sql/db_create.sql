-- Create book_management database
CREATE DATABASE book_management;

-- Connect to the database
\c book_management;

-- Table 2: publishers (created first since books references it)
CREATE TABLE publishers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

-- Table 1: books
CREATE TABLE books (
    id SERIAL PRIMARY KEY,  -- auto-incrementing primary key
    isbn VARCHAR(20) NOT NULL,
    author VARCHAR(255) NOT NULL,
    title VARCHAR(500) NOT NULL,
    publisher INT NOT NULL REFERENCES publishers(id),  -- foreign key to publishers
    publication_date DATE NOT NULL,
    pages INT NOT NULL,
    has_active_promotion BOOLEAN NOT NULL DEFAULT FALSE,
    eligible_for_promotion BOOLEAN NOT NULL DEFAULT TRUE
);

-- Table 3: active_promotions
CREATE TABLE active_promotions (
    id SERIAL PRIMARY KEY,  -- auto-incrementing primary key
    name VARCHAR(255) NOT NULL,
    book INT NOT NULL REFERENCES books(id),  -- foreign key to books
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    CONSTRAINT valid_promotion_dates CHECK (end_date >= start_date)
);


