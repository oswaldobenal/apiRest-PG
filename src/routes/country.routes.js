import { Router } from "express";
//Import controllers
import { getCountries} from "../controllers/countryController.js";

const router = Router();
  router.get("/countries", getCountries);
export default router;