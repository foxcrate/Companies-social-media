const nodemailer = require("nodemailer");

exports.sendPasswordResetMailToCitizen = async (email, link) => {
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
      subject: "GIZ Platform Citizen Portal - Reset Password",
      html:
        "<h1>A password reset has been requested for this email!<br/>If this was not requested by you please ignore the rest of this email.<br/>Please visit this link to reset password<br/> </h1>" +
        "<a href='" +
        link +
        "'>" +
        link +
        "</a>",
    };

    // transporter.sendMail(options, (err) => {
    //   try {
    //     if (err) {
    //       console.log("email has an error", err);
    //       // throw { code: "SENDING_EMAIL_ERROR", msg: "error in sending the email" };
    //       throw { code: "UNABLE_TO_SEND_EMAIL" };
    //     } else {
    //       console.log("email sent successfully");
    //       return true;
    //       // res.status(200).send("email sent successfully");
    //     }
    //   } catch (err) {
    //     console.log("error in mail: ", err);
    //     // throw { code: "UNABLE_TO_SEND_EMAIL" };
    //   }
    // });

    let emailSent = await transporter.sendMail(options);
    if (emailSent) {
      return true;
    }
    // console.log("emailSent in util:", emailSent);
  } catch (err) {
    console.log("error in mail: ", err);
    throw { code: "UNABLE_TO_SEND_EMAIL" };
  }
};
