
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Pets } from "./Pets.js";
import { Rol } from "./Rol.js";


export const User = sequelize.define('user', {
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
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  countrie:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  city:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password:{
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  }



}, {
  timestamps: false
})
User.belongsToMany(Rol,{through:"user_rol"})
Rol.belongsToMany(User,{through:"user_rol"})
User.hasMany(Pets, {
  foreignKey: "userId",
  sourceKey: "id",
  });
  
  Pets.belongsTo(User, {
  foreignKey: "userId",
  targetId: "id",
  });

