// utils/sendEmail.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const sendEmail = async (to, subject, text) => {
  await transporter.sendMail( {
    from:  '"Admin Dashboard" <zarrouktayssir60@gmail.com>',
    to,
    subject,
    text,
  });
};

module.exports = sendEmail;
