import { Router } from "express";
import { getTypesPets, createTypesPets } from "../controllers/typePetController.js";

const router = Router();

router.get("/", getTypesPets);
router.post("/", createTypesPets)

export default router;
