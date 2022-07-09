import { Router } from "express";
import { getBreedPets, getBreedPetsByType, createBreedPets } from "../controllers/breedPetController.js";

const router = Router();

router.get("/", getBreedPets);
router.get("/:type", getBreedPetsByType);
router.post("/", createBreedPets)

export default router;
