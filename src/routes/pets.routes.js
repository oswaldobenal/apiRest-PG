import { Router } from "express";
import { upload } from '../middlewares/cloudinary.js';
import { getPets, createPets, updatePets, deletePets } from "../controllers/petsController.js";
import validatorPets from '../middlewares/validatorPets.js';

const router = Router();

router.get("/", getPets);
router.get("/:id", getPets);
router.post("/", upload.array("photos"), validatorPets, createPets);
router.put("/:id", upload.array("photos"), updatePets)
router.delete("/:id", deletePets)

export default router;
