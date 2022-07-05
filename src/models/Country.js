import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { City } from "./City.js"; 

export const Country = sequelize.define('countries', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }
}, {
  timestamps: false
})

//Relaciones 
Country.hasMany(City);
City.hasOne(Country);
