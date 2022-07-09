import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { City } from "./City.js";
import { Country } from "./Country.js";
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
      allowNull: true,
      defaultValue: 0,
    },
    address:{
      type: DataTypes.TEXT,
      allowNull:true,
      defaultValue:""
    },
    phone:{
      type:DataTypes.INTEGER,
      allowNull:true,
      defaultValue:0
    },
    document:{
      type:DataTypes.STRING,
      allowNull:true,
      defaultValue:null
    }



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
Country.hasMany(User, {
  foreignKey: "countryId",
  sourceKey: "id",
});
User.belongsTo(Country, {
  foreignKey: "countryId",
  targetId: "id",
});
City.hasMany(User, {
  foreignKey: "cityId",
  sourceKey: "id",
});
User.belongsTo(City, {
  foreignKey: "cityId",
  targetId: "id",
});



