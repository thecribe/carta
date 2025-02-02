"use strict";

import { sequelize } from "@/app/api/dbConfig";

const { Sequelize, DataTypes } = require("sequelize");

export const Institution = sequelize.define(
  "institutions",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    name: DataTypes.STRING,

    website: DataTypes.STRING,

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
