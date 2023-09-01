CREATE TABLE IF NOT EXISTS users (
  username TEXT PRIMARY KEY UNIQUE,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  birth_date DATE,
  password VARCHAR(255) NOT NULL
);






