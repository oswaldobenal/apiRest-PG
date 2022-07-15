import express from "express";
import morgan from "morgan";
import index from './src/routes/routes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './swagger_output.json';

const app = express();

// Routes import
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerFile))

//use routes
app.use("/api/v1.0", index);

export default app;
