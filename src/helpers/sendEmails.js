import nodemailer from "nodemailer";
import "dotenv/config";
import { html } from "../utils/email.js";
const {APP_EMAIL, APP_PASS_EMAIL} = process.env
let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: APP_EMAIL, // generated ethereal user
        pass: APP_PASS_EMAIL, // generated ethereal passwor
    },
});

export const sendEmails = async (from, to, subject, html) => {
    await transporter.sendMail({
        from: `${from} <adoptaMe>`,
        to: to,
        subject: subject,
        html: html,
      });
}

export const autoMail = async (from, to, subject,titulo, info, button) => {
    if (subject === undefined || !subject.length) {subject=from}
    if (titulo === undefined || !titulo.length) {titulo=from}
    await transporter.sendMail({
        from: `${from} <adoptaMe>`,
        to: to,
        subject: subject,
        html: html(titulo, info, button),
      });
}