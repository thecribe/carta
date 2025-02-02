"use strict";
const { Sequelize, DataTypes } = require("sequelize");
import { sequelize } from "@/app/api/dbConfig";

export const Fellow = sequelize.define(
  "fellows",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },

    firstname: DataTypes.STRING,
    othername: DataTypes.STRING,
    surname: DataTypes.STRING,

    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    img_url: DataTypes.STRING,
    sex: DataTypes.STRING,
    currentLevel: DataTypes.STRING,
    cohortId: {
      type: DataTypes.UUID,
    },
    CARTAGraduate: DataTypes.STRING,
    shortBio: DataTypes.TEXT,
    institutionId: DataTypes.UUID,
    faculty: DataTypes.STRING,
    department: DataTypes.STRING,
    PhDResearchTitle: DataTypes.STRING,
    PhDResearchInstitute: DataTypes.STRING,
    areaOfSpecialization: DataTypes.STRING,
    researchInterest: DataTypes.STRING,
    ORCIDNumber: DataTypes.STRING,
    googleScholarProfile: DataTypes.STRING,
    researchGateProfile: DataTypes.STRING,

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
