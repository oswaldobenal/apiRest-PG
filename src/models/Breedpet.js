import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { TypePet } from "./Typepet.js";

export const BreedPet = sequelize.define(
  "breedpet",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nameBreed: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

//Relaciones

TypePet.hasMany(BreedPet, {
  foreignKey: "typeId",
  sourceKey: "id",
})

BreedPet.belongsTo(TypePet, {
  foreignKey: "typeId",
  sourceKey: "id",
});

