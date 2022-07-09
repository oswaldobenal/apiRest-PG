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

const router = Router();

router.use('/countries', countries);
router.use('/cities', cities);
router.use('/user', user);
router.use('/pets', pets);
router.use('/auth', auth);

export default router;