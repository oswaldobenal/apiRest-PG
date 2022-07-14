import { Router } from "express";
const router = Router();
import { autoMails } from "../controllers/autoMailController.js";
router.post('/', autoMails);
export default router;