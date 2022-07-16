import "dotenv/config";
import app from "./app.js";
import { sequelize } from "./src/database/database.js";
import "./src/models/Country.js";
import "./src/models/User.js";
import "./src/models/Typepet.js";
import "./src/models/Breedpet.js";
import "./src/models/Colorpet.js";
import "./src/models/Solicitudes.js";
import { preloadCountrys, preloadTypesPets, preloadColorsPets } from './src/utils/preloadData.js';

const PORT = process.env.PORT || 5000;
async function main() {
  try {
    await sequelize.sync({ force: true });
    app.listen(PORT, async () => {
      await preloadTypesPets();
      await preloadCountrys();
      await preloadColorsPets();
      console.log(`Server runing in port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database " + error.message);
  }
}

main();
