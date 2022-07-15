import { autoMail } from "../helpers/sendEmails.js";
export const autoMails = (req, res) => {
    try {
        const {from, to, subject,titulo, info, button = false} =req.body;
        autoMail(from, to, subject,titulo, info, button)
        res.status(200).json({msg:"send email"})
        
    } catch (error) {
        console.log(error)
        res.json({msg: "no send email"})
    }
}