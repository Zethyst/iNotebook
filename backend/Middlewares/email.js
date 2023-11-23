"use strict";
//install nodemailer npm i nodemailer

//import nodemailer
const nodemailer = require("nodemailer");

//1. create an email transporter
//SMTP helps transporter send emails
const transporter = nodemailer.createTransport({
    service:"gmail",
    // host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: '21052646@kiit.ac.in',
        pass: 'idakkqebzhbeqdwd'
    }
});

// async..await is not allowed in global scope, must use a wrapper
async function main() {
    // send mail with defined transport object
    
    //2. Configure email content and send email
    const result = await transporter.sendMail({
        from: '"✨ Akshat Jaiswal ✨" <21052646@kiit.ac.in>', // sender address
        to: "ekansha13@gmail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "This email is sent using nodemailer", // plain text body
        html: "<b>This email is sent using nodemailer</b><br><h3>What are you gonna do about it?</h3>", // html body
    });

    console.log("Email sent successfully:\n %s", result);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

}

main().catch(console.error);
