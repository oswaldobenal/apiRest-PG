import express from "express";
import morgan from "morgan";
import index from './src/routes/routes.js';

const app = express();
// Routes import
//middleware
app.use(express.json());
app.use(morgan("dev"));
//use routes
app.use("/api/v1.0", index);

export default app;
