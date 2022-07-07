import { Router } from "express";
import { upload } from '../middlewares/cloudinary.js';
import { getPets, createPets, updatePets, deletePets } from "../controllers/petsController.js";

const router = Router();

router.get("/", getPets);
router.get("/:id", getPets);
router.post("/", upload.single("image"), createPets)
router.put("/:id", upload.single("image"), updatePets)
router.delete("/:id", deletePets)

export default router;