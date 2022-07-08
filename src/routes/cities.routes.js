import { Router } from "express";
//Controllers
import { createCities, getCitiesById } from "../controllers/cityController.js";
const router = Router();

router.post("/cities", createCities);
router.get("/cities/:idCountry", getCitiesById);

export default router;
