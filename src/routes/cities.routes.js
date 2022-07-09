import { Router } from "express";
//Controllers
import { createCities, getCitiesById } from "../controllers/cityController.js";
const router = Router();

router.post("/", createCities);
router.get("/:idCountry", getCitiesById);

export default router;
