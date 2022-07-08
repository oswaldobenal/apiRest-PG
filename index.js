import app from "./app.js";
import { sequelize } from "./src/database/database.js";
import "./src/models/Country.js";
import "./src/models/User.js";

const PORT = process.env.PORT || 5000;
async function main() {
  try {
    await sequelize.sync({ force: true });
    app.listen(PORT, () => {
      console.log(`Server runing in port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database " + error.message);
  }
}

main();
