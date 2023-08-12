const nodemailer = require("nodemailer");

exports.sendPasswordResetMail = async (email, link, accountType) => {
  // create reusable transporter object using the default SMTP transport
  try {
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
      subject: `GIZ Platform ${accountType} Portal - Reset Password`,
      html:
        "<h1>A password reset has been requested for this email!<br/>If this was not requested by you please ignore the rest of this email.<br/>Please visit this link to reset password<br/> </h1>" +
        "<a href='" +
        link +
        "'>" +
        link +
        "</a>",
    };

    let emailSent = await transporter.sendMail(options);
    console.log("-------emailSent: ", emailSent);
    // if (emailSent) {
    return emailSent;
    // }
    // console.log("emailSent in util:", emailSent);
  } catch (err) {
    // console.log("error in mail: ", err);
    console.log("error in mail util: ", err);
    throw { code: "UNABLE_TO_SEND_EMAIL" };
  }
};
