import { Router } from "express";
//importing controllers from src/controllers
import { welcome } from "../controllers/userController.js";
/*Important !!!! 
** if the console shows the code: 
'ERR_MODULE_NOT_FOUND' 
it's because in the import they must use .js at the end of each imported module 
for example:
import { userLogin } from "../controllers/userController.js" is correct
import { userLogin } from "../controllers/userController" is incorrect

 */
const router = Router();

router.get("/welcome", welcome )

export default router;