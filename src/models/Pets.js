import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";


export const Pets = sequelize.define('pets', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  race: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  size: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  health: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
  }
}, {
  timestamps: false,
})