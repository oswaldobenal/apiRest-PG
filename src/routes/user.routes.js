import { Router } from "express";
//Import controllers
import {
  adminUpdateUser,
  createUser,
  getDetailUser,
  getUser,
  updatesolicitud,
  updateUser,
} from "../controllers/useRuteController.js";
import { body } from "express-validator";
//Middleware errores Express Validator.
import { validatorResultExpress } from "../middlewares/validatorResultExpress.js";
import { authMiddleware } from "../middlewares/session.js";
import { upload } from "../middlewares/cloudinary.js";
import { checkRole } from "../middlewares/validarAdmin.js";

const router = Router();

router.post(
  "/",upload.array('document'),
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
router.get("/users", authMiddleware, getUser);
router.get("/:id", authMiddleware, getDetailUser);
router.patch("/:id", authMiddleware, updateUser);
router.put("/:id", authMiddleware,checkRole(['admin']), adminUpdateUser);
router.put("/soli/:id",authMiddleware,checkRole(['admin']),updatesolicitud)



export default router;
