"use strict";

import { sequelize } from "@/app/api/dbConfig";

const { Sequelize, DataTypes } = require("sequelize");

export const Cohort = sequelize.define(
  "cohorts",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    cohort: DataTypes.STRING,

    description: DataTypes.TEXT,

    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {}
);
