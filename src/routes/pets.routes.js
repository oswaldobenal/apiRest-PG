import { Router } from "express";
import { upload } from "../middlewares/cloudinary.js";
import favouritePet from "./favouritePet.routes.js";

import {
  getAllPets,
  getPetsById,
  createPets,
  updatePets,
  deletePets,
} from "../controllers/petsController.js";
import validatorPets from "../middlewares/validatorPets.js";
import { authMiddleware } from "../middlewares/session.js";

const router = Router();

router.use('/favourite', favouritePet)

router.get("/", getAllPets);
router.get("/:id", getPetsById);
router.post(
  "/",
  // authMiddleware,
  upload.array("photos"),
  validatorPets,
  createPets
);
router.put("/:id", authMiddleware, upload.array("photos"), updatePets);
router.delete("/:id", authMiddleware, deletePets);

export default router;
