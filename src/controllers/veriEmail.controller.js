import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import { sendEmails } from "../helpers/sendEmails.js";
import { encrypt } from "../helpers/handleBcrypt.js";
import { autoMail } from "../helpers/sendEmails.js";

const { URL_FRONT, JWT_SECRET } = process.env;
const url = URL_FRONT || "localhost:5000";



export const veriEmail = async (req, res) => {
    try {
      const {email} = req.body;
      let busqueda = await User.findOne({
          where:{email:email}
        })
        if (!busqueda) {return res.status(400).json({msg: "the email is not registered"})}
        if (busqueda.verification) {return res.status(400).json({msg: "the email not required verification"})}
        if (!(busqueda.verification)) {

           //let token = tokenSing(user);
            let token = jwt.sign(
                {
                    id: busqueda.id,
                },
                JWT_SECRET,
                {
                    expiresIn: 900,
                }
                );


                let url2 ="adoptame.vercel.app/email-confirmed"
                let button ={text: "confirmacion de correo", link: `http://${url2}/api/v1.0/verify/tk/${token}`}
                let info = "Te has registrado exitosamente en adoptaMe, por favor confirma tu correo abajo"
                let from = "Verification email";
                let to = email;
                let titulo = "verificacion de correo electronico"

                autoMail(from, to, from,titulo, info, button)
                
                
                res.status(200).json({msg: "send email"})
        }


} catch (error) {
    console.log(error)
}
}

export const logVerify = async (req, res) => {
    try {
        const {tok} =req.params;
        let info = jwt.decode(tok);
        console.log(info)
        let busqueda = await User.findOne({
            where:{id:info.id}
          })
        
          if (!busqueda) {res.json({msg: "verification fail"})}

          await User.update({verification: true}, {where: {id: info.id}})

          res.json({msg: "verified email"})
        
    } catch (error) {
        console.log(error)
        res.json({msg: "verification fail"})
    }
}
export const petiPass = async (req, res) => {
    try {
        const {email} = req.body;
      let busqueda = await User.findOne({
          where:{email:email}
        })
        if (!busqueda) {res.status(400).json({msg: "the email is not registered"})}
        
        // let token = tokenSing(busqueda)
        let token = jwt.sign(
            {
                id: busqueda.id,
            },
            JWT_SECRET,
            {
                expiresIn: 900,
            }
            );
            //let button ={text: "recuperar contraseña", link: `http://${url}/api/v1.0/verify/modpass/${token}`}
            let url2= "adoptame.vercel.app/reset/confirm"
            let button ={text: "recuperar contraseña", link: `http://${url2}/api/v1.0/verify/modpass/${token}`}
            let info = "has solicitado una recuperacion de contraseña, si no lo hiciste ignora este mensaje"
            let from = "password recovery";
            let to = email;
            let titulo = "recuperacion de contraseña"

            autoMail(from, to, from,titulo, info, button)

            res.json({msg: "send email"})
        
    } catch (error) {
        console.log(error)
        res.json({msg: "verification fail"})
    }
}
export const recuperated = async (req, res) => {
    try {
        const {tak} = req.params;
        const {password1, password2} = req.body;
        let info = jwt.decode(tak)
        let busqueda = await User.findOne({
            where:{id:info.id}
          })
        if (!busqueda) {return res.status(400).json({msg: "verification fail"})}
        if (password1!==password2) {return res.status(400).json({msg: "the password does not match"})}
        let passwordHash = await encrypt(password1);
        await User.update({password: passwordHash}, {where: {id: info.id}})
        res.status(200).json({msg: "updated password"})
        
        
    } catch (error) {
        console.log(error)
        res.json({msg: "verification fail"})
    }
}