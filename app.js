import express from "express";
import morgan from "morgan";

const app = express();
// Routes import
import countries from "./src/routes/country.routes.js"
import pets from "./src/routes/pets.routes.js"
import welcome from "./src/routes/routes.js"
import user from "./src/routes/user.routes.js"
//middleware
app.use(express.json());
app.use(morgan('dev'));
//use routes
app.use("/api/v1.0", welcome);
app.use("/api/v1.0", countries);
app.use("/api/v1.0", pets);

app.use("/api/v1.0", user);


export default app;