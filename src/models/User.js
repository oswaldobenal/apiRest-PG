import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Pets } from "./Pets.js";

export const User = sequelize.define(
  "user",
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
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isFundation: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,

      defaultValue: true,
    },
    donaciones: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
  }
);
User.hasMany(Pets, {
  foreignKey: "userId",
  sourceKey: "id",
});

Pets.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id",
});
