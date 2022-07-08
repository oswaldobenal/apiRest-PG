import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const City = sequelize.define(
  "city",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
