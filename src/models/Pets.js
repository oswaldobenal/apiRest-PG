import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { TypePet } from "./Typepet.js";
import { BreedPet } from "./Breedpet.js";

export const Pets = sequelize.define('pets', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('name', value.toLowerCase());
    }
  },
  typeHair: {
    type: DataTypes.ENUM,
    values: ['hairless', 'short', 'medium', 'long', 'wire', 'kinky'],
  },
  specialCares: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  castrated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  gender: {
    type: DataTypes.ENUM,
    values: ['male', 'female'],
    allowNull: false,
  },
  environment: {
    type: DataTypes.JSONB,
    get() {
      return JSON.parse(this.getDataValue("environment"));
    },
    set(value) {
      this.setDataValue('environment', value.toLowerCase());
    }
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.ENUM('friendly', 'affectionate', 'protective', 'smart', 'funny', 'quiet')),
    allowNull: false,
  },
  size: {
    type: DataTypes.ENUM,
    values: ['small', 'medium', 'large', 'extra large'],
    allowNull: false,
  },
  color: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('color', value.toLowerCase());
    }
  },
  age: {
    type: DataTypes.ENUM,
    values: ['puppy', 'young', 'adult', 'senior'],
    allowNull: false,
  },
  published_at: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  health: {
    type: DataTypes.ENUM,
    values: ['vaccinations up to date', 'no vaccines'],
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  photos: {
    type: DataTypes.ARRAY(DataTypes.TEXT),
    defaultValue: []
  },
  status: {
    type: DataTypes.ENUM('adoptable', 'adopted'),
    defaultValue: 'adoptable',
    allowNull: false,
  }
}, {
  timestamps: false,
})

Pets.belongsTo(BreedPet, {
  foreignKey: "breedId",
  targetId: "id",
});
Pets.belongsTo(TypePet, {
  foreignKey: "typeId",
  targetId: "id",
});
