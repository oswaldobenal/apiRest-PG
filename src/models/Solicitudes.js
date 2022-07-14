import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { User } from "./User.js";




export const Solicitudes = sequelize.define(
    "solicitudes",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      estado:{
        type: DataTypes.ENUM,
        values: ["pendiente", "aprobado", "rechazado"],
        defaultValue: "pendiente",
      },
      fechainicio:{
        type:DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW
      },
      fechafinaliza:{
        type: DataTypes.DATEONLY,
        defaultValue: null
      }

    },
    {
      timestamps: false,
    }
  );

  User.hasOne(Solicitudes,{
    foreignKey:"userId",
    sourceKey: "id",
  })
  Solicitudes.belongsTo(User,{
    foreignKey: "userId",
    targetId: "id",
  } )


