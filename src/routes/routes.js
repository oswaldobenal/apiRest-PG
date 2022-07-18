import { Router } from "express";
//importing controllers from src/controllers
/*Important !!!! 
** if the console shows the code: 
'ERR_MODULE_NOT_FOUND' 
it's because in the import they must use .js at the end of each imported module 
for example:
import { userLogin } from "../controllers/userController.js" is correct
import { userLogin } from "../controllers/userController" is incorrect

 */

import countries from "./country.routes.js";
import pets from "./pets.routes.js";
import user from "./user.routes.js";
import cities from "./cities.routes.js";
import auth from "./auth.routes.js";
import typePet from "./typePet.routes.js";
import breedPet from "./breedPet.routes.js";
import colorPet from "./colorsPet.routes.js";
import donation from "./donation.routes.js";
import fundation from "./fundation.routes.js";

import petsDataFake from "./petsDataFake.routes.js";

import veriEmail from "./veriEmail.routes.js";
import automail from "./autoMail.routes.js";

const router = Router();

router.use('/countries', countries);
router.use('/cities', cities);
router.use('/user', user);
router.use('/pets', pets);
router.use('/auth', auth);

router.use("/type-pet", typePet);
router.use("/breed-pet", breedPet);
router.use("/color-pet", colorPet);

router.use('/addPets', petsDataFake);

router.use("/verify", veriEmail);
router.use("/auto", automail);

router.use("/donations", donation);

router.use("/fundations", fundation);

export default router;