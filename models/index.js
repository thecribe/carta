"use strict";
const Sequelize = require("sequelize");
const process = require("process");
import dbConfig from "../config/config.js";
const env = process.env.NODE_ENV || "development";
const config = dbConfig[env];

export const sequelize = new Sequelize({
  ...config,
  database: config.database,
  user: config.username,
  password: config.password,
  host: config.host,
  port: config.port,
});

try {
  await sequelize.authenticate();
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
