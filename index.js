import "dotenv/config";
import app from "./app.js";
import { sequelize } from "./src/database/database.js";
import "./src/models/Country.js";
import "./src/models/User.js";
import "./src/models/Typepet.js";
import "./src/models/Breedpet.js";
import "./src/models/Colorpet.js";
import "./src/models/Solicitudes.js";
import { preloadCountrys, preloadTypesPets, preloadColorsPets, preloadPets } from './src/utils/preloadData.js';

const PORT = process.env.PORT || 5000;
async function main() {
  try {
    const _FORCE = true;
    await sequelize.sync({ force: _FORCE });
    app.listen(PORT, async () => {
      await preloadTypesPets();
      await preloadCountrys();
      await preloadColorsPets();
      _FORCE && await preloadPets(10);
      console.log(`Server runing in port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database " + error.message);
  }
}

main();
