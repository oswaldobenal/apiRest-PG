import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { City } from "./City.js";

export const Country = sequelize.define(
  "countries",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
    },
    symbol: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
  }
);

//Relaciones
Country.hasMany(City, {
  foreignKey: "countryId",
  sourceKey: "id",
});

City.belongsTo(Country, {
  foreignKey: "countryId",
  targetId: "id",
});
