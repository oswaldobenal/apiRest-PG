import { Router } from "express";
const router = Router();
import { loginUser } from "../controllers/loginController.js";
router.post('/login', loginUser)
export default router;