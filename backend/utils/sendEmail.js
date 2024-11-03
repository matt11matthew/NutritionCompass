const nodemailer = require("nodemailer");

// Send email
async function sendEmail(email, subject, text) {
  try {
    // create transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: 587,
      secure: false, // need to change to true for port 465 SMTPS
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // send mail with transport object
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: email,
      subject: subject,
      text: text,
    });

    // Log message ID
    console.log(
      `Verification email sent to: ${email} with message ID: ${info.messageId}`
    );
  } catch (error) {
    console.error("Error sending email: ", error);
  }
}

module.exports = sendEmail;
