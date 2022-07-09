import { Router } from "express";
import { login } from "../controllers/auth.controller.js";
import { body } from "express-validator";
import { validatorResultExpress } from "../middlewares/validatorResultExpress.js";

const router = Router();

router.post(
  "/userLogin",
  [
    body("email", "Formato email incorrecto").trim().isEmail().normalizeEmail(),
    body("password", "Minimo 6 caracteres").trim().isLength({ min: 6 }),
    body("password", "Formato de password incorrecto")
      .trim()
      .isLength({ min: 6 }),
  ],
  validatorResultExpress,
  login
);

export default router;
