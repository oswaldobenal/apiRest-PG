import { Router } from "express";
import {
  getFavouritePets,
  getFavouritePetsByUser,
  createFavouritePet,
  deleteFafouritePet
} from "../controllers/favouriteController.js";

const router = Router();

router.get("/", getFavouritePets);
router.get("/:userId", getFavouritePetsByUser);
router.post("/", createFavouritePet);
router.delete("/", deleteFafouritePet);


export default router;