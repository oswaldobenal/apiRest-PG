import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import { TypePet } from "./Typepet.js";
import { BreedPet } from "./Breedpet.js";
import { ColorPet } from '../models/Colorpet.js';
import pet from '../database/pets.js';

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
  age: {
    type: DataTypes.ENUM,
    values: pet[0].ages,
    allowNull: false,
  },
  gender: {
    type: DataTypes.ENUM,
    values: pet[0].genders,
    allowNull: false,
  },
  size: {
    type: DataTypes.ENUM,
    values: pet[0].sizes,
    allowNull: false,
  },
  coat: {
    type: DataTypes.ENUM,
    values: pet[0].coats,
  },
  health: {
    type: DataTypes.ENUM,
    values: pet[0].healths,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.ENUM(pet[0].tags)),
    allowNull: false,
  },
  castrated: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  attributes: {
    type: DataTypes.JSONB,
    get() {
      return JSON.parse(this.getDataValue("attributes"));
    },
    set(value) {
      this.setDataValue('attributes', value.toLowerCase());
    }
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
    photos: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: []
    },
  status: {
    type: DataTypes.ENUM,
    values: pet[0].status,
    defaultValue: 'adoptable',
    allowNull: false,
  },
  published_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
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

ColorPet.hasMany(Pets, {
  foreignKey: "colorId",
  sourceKey: "id",
});

Pets.belongsTo(ColorPet, {
  foreignKey: "colorId",
  targetId: "id",
});
