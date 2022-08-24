const nodemailer = require('nodemailer');
import User from "../models/user.js";
import { USER_EMAIL, PASSWORD_EMAIL, ADMIN_EMAIL } from "../models/config.js";
import { template } from "../controllers/template_email.js";
import logger from "../config/logger.js";

export function buyOrderMail(order){
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: USER_EMAIL,
            pass: PASSWORD_EMAIL
        }
    });

    const user = await User.findById(order.userId);
    const mail_to = `${user.email}, ${ADMIN_EMAIL}`  
    const template_email = template(order)
    
    const mailOptions = {
        from: 'connie84@ethereal.email',
        to: 'helberadrian@gmail.com', // mail_to
        subject: 'Se ha realizado una nueva compra',
        html: template_email
    }
    
    try {
        const info = await transporter.sendMail(mailOptions);
        logger.info("Email sent successfully");
    } catch (error) {
        logger.info(error);
    }
}