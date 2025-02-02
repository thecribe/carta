import dotenv from "dotenv";
dotenv.config(); // Load .env variables

import mysql2 from "mysql2";

const dbConfig = {
  development: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: 3306,
    dialect: "mysql",
    dialectModule: mysql2,
  },
  test: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: 3306,
    dialect: "mysql",
    dialectModule: mysql2,
  },
  production: {
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_NAME,
    host: process.env.DATABASE_HOST,
    port: 3306,
    dialect: "mysql",
    dialectModule: mysql2,
  },
};

export default dbConfig;
