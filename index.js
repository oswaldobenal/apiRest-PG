import express from "express";
//importing routes
import router from "./src/routes/routes.js";
//DB connection
import { sequelize } from "./src/database/database.js";
//Models
import "./src/models/Country.js"

const app = express();
app.use(express.json()); // to read req.body in json format

//use the route when url is  http://localhost:5000/api
app.use("/api", router);

const PORT = process.env.PORT || 5000;
async function main() {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server runing in port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database "+ error.message);
  }
}

main();

