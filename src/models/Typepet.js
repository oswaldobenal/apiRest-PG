import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const TypePet = sequelize.define(
  "typepet",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    nameType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
