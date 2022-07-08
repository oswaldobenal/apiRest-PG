import express from "express";

const app = express();
// Routes import
import countries from "./src/routes/country.routes.js";
import welcome from "./src/routes/routes.js";
import cities from "./src/routes/cities.routes.js";
//middleware
app.use(express.json());
//use routes
app.use("/api/v1.0", welcome);
app.use("/api/v1.0", countries);
app.use("/api/v1.0", cities);

export default app;
