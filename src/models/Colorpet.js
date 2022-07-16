import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const ColorPet = sequelize.define(
  "colorpet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nameColor: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

