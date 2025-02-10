const nodemailer = require('nodemailer');
require('dotenv').config()

const sendEmail = async (options) => {
        // console.log(options)
    try {


        var transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT || 587,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: `"Uttar Pradesh Federation of Distributor Associations" <${process.env.EMAIL_USERNAME}>`,
            to: options.email,
            subject: options.subject,
            html: options.message
        };

        await transporter.sendMail(mailOptions);

    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Error sending email');
    }
};

module.exports = sendEmail;