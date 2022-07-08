import { Router } from "express";
//Import controllers
import { createUser, getDetailUser, getUser, putUser } from "../controllers/useRuteController.js";
import { body} from "express-validator"
const router = Router();

  router.post("/user", [
    body('name').trim().notEmpty().withMessage('name is required'),
    body('lastName').trim().notEmpty().withMessage('lastName is required'),
    body('email',"Wrong email format").trim().isEmail().normalizeEmail(),
    body('password').trim().notEmpty().withMessage('password is required'),
  ], createUser);
  router.get("/us/all",getUser);
  router.get("/user/:id",getDetailUser);
  router.put("/user/:id",[
    body('name').trim().notEmpty().withMessage('name is required'),
    body('lastName').trim().notEmpty().withMessage('lastName is required'),
    body('password').trim().notEmpty().withMessage('password is required'),
   
  ],putUser);
  
 
export default router;