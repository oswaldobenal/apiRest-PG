import { sequelize } from "../database/database.js";

export const UserPetsFavourite = sequelize.define('favouritePet', {}, {
  timestamps: false,
  tableName: 'favouritePet'
});