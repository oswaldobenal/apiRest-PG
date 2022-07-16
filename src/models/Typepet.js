import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { ColorPet } from '../models/Colorpet.js';

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

TypePet.hasMany(ColorPet, {
  foreignKey: "typeId",
  targetId: "id",
});

ColorPet.belongsTo(TypePet, {
  foreignKey: "typeId",
  targetId: "id",
});