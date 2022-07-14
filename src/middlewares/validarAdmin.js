import { verifyToken } from "../helpers/handleJwt.js";
import { User } from "../models/User.js";

export const checkRole =(roles)=> async (req, res, next )=>{

    
    try {
     
  
      const token = req.headers.authorization.split(" ").pop();
  
      const dataToken = await verifyToken(token);
      const UserData= await User.findByPk(dataToken.id);
      if([].concat(roles).includes(UserData.role)){
        next()
      }else{
        return res.status(404).json({error:"no tienes permiso"})
      }
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }


}