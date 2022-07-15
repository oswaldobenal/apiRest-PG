import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

export const Donations = sequelize.define('donations', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: new Date()
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  timestamps: false,
});
