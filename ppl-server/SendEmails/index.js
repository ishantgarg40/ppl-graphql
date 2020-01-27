const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.FROM_EMAIL_PASS
  }
});

const sendEmail = async data => {
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: data.email,
    subject: "Verify your ppl account by clicking the link below!",
    text: `${process.env.FRONTEND_BASE_URL}/emailverify?id=${data.id}`
  });
};

module.exports = sendEmail;
