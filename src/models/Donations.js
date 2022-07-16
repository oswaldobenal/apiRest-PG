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
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status_detail: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  comision_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  acredit_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  total_amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  timestamps: false,
});
