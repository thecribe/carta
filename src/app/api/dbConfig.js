import { Sequelize, DataTypes } from "sequelize";
import mysql2 from "mysql2";

export const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASS,
  {
    host: "127.0.0.1",
    dialect: "mysql",
    dialectModule: mysql2,
    define: {
      freezeTableName: true,
    },
  }
);

export const databaseConnection = async () => {
  try {
    await sequelize.authenticate();
    return true;
  } catch (error) {
    return false;
  }
};
