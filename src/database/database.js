import { Sequelize } from "sequelize";
import "dotenv/config";
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DATABASE_URL } = process.env;
export const sequelize = new Sequelize(
  DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`,
  {
    logging: false, // set to console.log to see the raw SQL queries
    native: false, // lets Sequelize know we can use pg-native for ~30% more speed
    dialectOptions: {
      ssl: process.env.DB_ENABLE_SSL && {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);
