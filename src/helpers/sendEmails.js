import nodemailer from "nodemailer";
import "dotenv/config";
const {APP_EMAIL, APP_PASS_EMAIL} = process.env
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: APP_EMAIL, // generated ethereal user
        pass: APP_PASS_EMAIL, // generated ethereal password
    },
});

export const sendEmails = async (from, to, subject, html) => {
    await transporter.sendMail({
        from: `${from} <adoptaMe>`, // sender address
        to: to, // list of receivers
        subject: subject, // Subject line
        html: html, // html body
      });
}