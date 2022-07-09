import {validationResult} from "express-validator";
import { City } from "../models/City.js";
import { Country } from "../models/Country.js";
import { Pets } from "../models/Pets.js";

import { User } from "../models/User.js";

/// POST USER
export const createUser =async (req, res)  => {
    const errors = validationResult(req);
    const{ name,lastName, password,email,isFundation,active,donaciones,countryId,cityId,address,phone,document}=req.body;
    const country= await Country.findByPk(countryId)
    const city= await City.findByPk(cityId)
    try {
    if (!errors.isEmpty()) { return res.status(400).json({ errors: errors.array()});}
    let verifyEmail= await User.findOne({
        where:{email:email}
    })
    if(verifyEmail){
        res.status(400).json({ message:"the email entered already exists "});

    }else{

        if(isFundation===true){
            
        // Encode the String  ""
        //  let encodedString = btoa(document);
        //  console.log(encodedString); 
      let usersCountry= await User.create({ name, lastName,password,email,isFundation,active:false,donaciones,address,phone,document })
        usersCountry.setCountry(country)
        usersCountry.setCity(city)
    return res.json({message:"created user, wait for the verification of your foundation"})
    }else{
        let usersCountry= await User.create({ name, lastName,password,email,isFundation,active,donaciones,address,phone })
        usersCountry.setCountry(country)
        usersCountry.setCity(city)
    return res.json({message:"User Cread"})
    }
    
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
        user= await User.findByPk(id, { include: Pets })
       let pets= await Pets.findAll({where:{userId:id}})
       let city=await City.findByPk(user.cityId)
        if(user){
            if(user.isFundation===true){
            user= {
             name:user.name,
             lastName:user.lastName,
             email:user.email,
             isFundation:user.isFundation,
             donaciones:user.donaciones,
             country:user.countryId,
             city:city.name,
             address:user.address,
             phone:user.phone,
             active:user.active,
             document:user.document,
             pets:pets.map(e=>e)
            }
        }else{
            user= {
                name:user.name,
                lastName:user.lastName,
                email:user.email,
                country:user.countryId,
                city:city.name,
                address:user.address,
                phone:user.phone,
                active:user.active,
                pets:pets.map(e=>e)
               }
        }
         res.send(user);
         }else{
            return res.status(400).json({ message: "user id does not exist!" })
         }
        } 
     } catch (error) { 
        return res.status(400).json({ message: error.message })  
     }
  }

//PUT USER 
export const putUser= async(req,res)=>{  
    const {id}=req.params;
    const { name, lastName,password,address,phone,active,donaciones}=req.body;
       try {
         await User.update({ name, lastName,password,address,phone,active,donaciones},{
            where:{
                id,
            }
          })
          return res.status(201).json({ message: 'Updated!' });
        } catch (error) {
         
          return res.status(400).json({ message: error.message })
       }
    }