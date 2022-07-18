import { Router } from "express";
import { getColorPets, getColorsPetsByType, createColorPets } from "../controllers/colorsPetController.js";

const router = Router();

router.get("/", getColorPets);
router.get("/:type", getColorsPetsByType);
router.post("/:type", createColorPets);


export default router;
