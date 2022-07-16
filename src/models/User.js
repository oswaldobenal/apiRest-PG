import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { City } from "./City.js";
import { Country } from "./Country.js";
import { Pets } from "./Pets.js";
import { UserPetsFavourite } from './FavouritePet.js';
import { Donations } from './Donations.js';

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
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["fundation", "user", "admin"],
      defaultValue: "user",
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    verification: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    donaciones: {
      type: DataTypes.DOUBLE,
      defaultValue: 0,
    },
    address: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    phone: {
      type: DataTypes.STRING
    },
    document: {
      type: DataTypes.TEXT,
      defaultValue: null,
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

Pets.belongsToMany(User, {
  through: UserPetsFavourite,
  foreignKey: "userId",
  targetId: "id"
});

User.belongsToMany(Pets, {
  through: UserPetsFavourite,
  foreignKey: "petId",
  targetId: "id"
});

User.belongsToMany(User, {
  through: {
    model: Donations,
    unique: false
  },
  as: "from",
  foreignKey: "fromUserId",
});
User.belongsToMany(User, {
  through: {
    model: Donations,
    unique: false
  },
  as: "to",
  foreignKey: "toUserId",
});
