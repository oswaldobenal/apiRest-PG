import {validationResult} from "express-validator";

import { User } from "../models/User.js";

/// POST USER
export const createUser =async (req, res)  => {
    const errors = validationResult(req);
    const{ name,lastName, password,email,isFundation,active,donaciones=0}=req.body;
    try {
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array()});}
    let verifyEmail= await User.findOne({
        where:{email:email}
    })
    if(verifyEmail){
        res.status(400).json("the email entered already exists ");
    }else{
     await User.create({ name, lastName,password,email,isFundation,active,donaciones })

     res.json("User Cread")
    }
     } catch (error) {
     res.send(error)
     }
  }

/// GET USER
  export const getUser= async(req,res)=>{
    try {
         let users=  await User.findAll();
        res.send(users)
    } catch (error) {
        res.json(error)
    }
  }
  /// GET DETAILS USER
  export const getDetailUser= async(req,res)=>{  
  const {id}=req.params
 let user;
     try {
         if(id.length>=1){
        user= await User.findByPk(id)
        if(user){
            if(user.isFundation===true){
            user= {
             name:user.name,
             lastName:user.lastName,
             email:user.email,
             isFundation:user.isFundation,
             donaciones:user.donaciones
            }
        }else{
            user= {
                name:user.name,
                lastName:user.lastName,
                email:user.email,
               }
        }
         res.send(user);
         }else{
            return res.status(400).json("user id does not exist")
         }
        } 
     } catch (error) { 
        return res.status(400).json({ message: error.message })  
     }
  }

//PUT USER 
export const putUser= async(req,res)=>{  
    const {id}=req.params;
    const { name, lastName,password}=req.body;
       try {
        
         await User.update({ name, lastName,password},{
            where:{
                id,
            }
          })
       res.status(200).json("Updated!")
        } catch (error) {
         console.log(error)
          return res.status(400).json({ message: error.message })
       }
    }