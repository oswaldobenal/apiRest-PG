import { Router } from "express";
const router = Router();
import { veriEmail, logVerify, petiPass, recuperated } from "../controllers/veriEmail.controller.js";
router.post('/', veriEmail)
router.get('/tk/:tok', logVerify)
router.post('/recpass', petiPass)
router.put('/modpass/:tak', recuperated)
export default router;