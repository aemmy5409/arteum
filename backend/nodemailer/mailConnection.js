import dotenv from 'dotenv';
import nodemailer from "nodemailer";

dotenv.config()
const mailClient = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true for port 465, false for other ports
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export default mailClient


