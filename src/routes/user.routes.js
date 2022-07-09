import { Router } from "express";
//Import controllers
import {
  createUser,
  getDetailUser,
  getUser,
  putUser,
} from "../controllers/useRuteController.js";
import { body } from "express-validator";
//Middleware errores Express Validator.
import { validatorResultExpress } from "../middlewares/validatorResultExpress.js";
const router = Router();

router.post(
  "/",
  [
    body("name").trim().notEmpty().withMessage("name is required"),
    body("lastName").trim().notEmpty().withMessage("lastName is required"),
    body("email", "Wrong email format").trim().isEmail().normalizeEmail(),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .notEmpty()
      .withMessage("password is required"),
  ],
  validatorResultExpress,
  createUser
);
router.get("/users", getUser);
router.get("/:id", getDetailUser);
router.put(
  "/:id",
  [
    body("name").trim().notEmpty().withMessage("name is required"),
    body("lastName").trim().notEmpty().withMessage("lastName is required"),
    body("password").trim().notEmpty().withMessage("password is required"),
  ],
  validatorResultExpress,
  putUser
);

export default router;
