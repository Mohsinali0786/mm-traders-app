const nodemailer = require("nodemailer")


const emailTransporter = ()=>{
    const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 5000,
            secure: true,
            auth: {
                user: 'freelancers00786@gmail.com',
                pass: process.env.Email_Pass
            }
        });
        return transporter
}

    module.exports = {emailTransporter}