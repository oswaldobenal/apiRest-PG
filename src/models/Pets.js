import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';


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
  type: {
    type: DataTypes.ENUM,
    values: ['dog', 'cat'],
    allowNull: false,
  },
  breed: {
    type: DataTypes.JSONB,
    get() {
      return JSON.parse(this.getDataValue("breed"));
    },
    set(value) {
      this.setDataValue('breed', value.toLowerCase());
    }
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
  city: {
    type: DataTypes.STRING,
    allowNull: false,
    set(value) {
      this.setDataValue('city', value.toLowerCase());
    }
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