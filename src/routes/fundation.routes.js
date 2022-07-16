import { Router } from "express";
import { getFundations } from "../controllers/fundationController.js";

const router = Router();

router.get("/", getFundations);

export default router;