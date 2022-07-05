import { Sequelize } from "sequelize";
const { USER,PASSWORD, DATABASE_URL } = process.env;
export const sequelize = new Sequelize(DATABASE_URL || 'restApiPG', `postgres`, `2001`, {
  dialect: 'postgres',
  host: 'localhost',
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
