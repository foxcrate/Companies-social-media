const nodemailer = require("nodemailer");

exports.sendPasswordResetMailToCitizen = async (email, link) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const options = {
    from: process.env.EMAIL,
    to: email,
    subject: "Application Platform Citizen Portal - Reset Password",
    html:
      "<h1>A password reset has been requested for this email!<br/>If this was not requested by you please ignore the rest of this email.<br/>Please visit this link to reset password<br/> </h1>" +
      "<a href='" +
      link +
      "'>" +
      link +
      "</a>",
  };

  transporter.sendMail(options, (err) => {
    if (err) {
      console.log("email has an error", err);
      throw { code: "SENDING_EMAIL_ERROR", msg: "error in sending the email" };
    } else {
      console.log("email sent successfully");
      res.status(200).send("email sent successfully");
    }
  });
};
