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
    unique: true,
  },
  race:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  sexo:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  city:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  size:{
    type: DataTypes.FLOAT,
    allowNull: false,
    unique: true,
    
  },
  color:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  health:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description:{
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  }



}, {
  timestamps: false
})