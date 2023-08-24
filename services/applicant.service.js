const { Applicant, Startup } = require("../models");
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const mail = require("../utils/mail.util");

exports.register = async (body) => {
  try {
    console.log("body:", body);
    //check uniqueness of the email
    let foundedEmail = await Applicant.findOne({
      where: { email: body.email },
    });
    if (foundedEmail) {
      throw { code: "REPEATED_EMAIL" };
    } else {
      let hashedPassword = await bcrypt.hash(body.password, 10);
      let newApplicant = await Applicant.create({
        name: body.name,
        email: body.email,
        password: hashedPassword,
      });
      return newApplicant;
    }
  } catch (err) {
    // if (!err.code) console.log("error in applicant service: ", err);
    throw err;
  }
};

exports.signin = async (body) => {
  try {
    let foundedAccount = await Applicant.findOne({
      where: { email: body.email },
    });
    if (!foundedAccount) {
      throw { code: "EMAIL_NOT_FOUND" };
    } else {
      console.log("foundedAccount:", foundedAccount);
      let rightPassword = await bcrypt.compare(
        body.password,
        foundedAccount.password
      );
      console.log("password:", body.password);
      console.log("rightPassword:", rightPassword);
      if (!rightPassword) {
        throw { code: "WRONG_PASSWORD" };
      }
      let token = jwt.sign(
        { applicant_id: foundedAccount.id },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );
      return { token: "Bearer " + token, applicantId: foundedAccount.id };
    }
  } catch (err) {
    // if (!err.code) console.log("error in applicant service: ", err);
    throw err;
  }
};

exports.getStartup = async (applicantId) => {
  try {
    let foundedStartup = await Startup.findOne({
      where: { applicantId: applicantId },
    });
    if (!foundedStartup) {
      throw { code: "STARTUP_NOT_FOUND" };
    } else {
      console.log("foundedStartup:", foundedStartup);
      return foundedStartup;
    }
  } catch (err) {
    // if (!err.code) console.log("error in applicant service: ", err);
    throw err;
  }
};

exports.sendResetPasswordMail = async (body) => {
  try {
    //Store Requested Mail
    const email = body.email;

    //Get Applicant From Database
    let applicant = await Applicant.findOne({ where: { email: email } });

    // applicant = null;
    //Check If Applicant Exists
    // console.log("-----------applicant:", applicant);
    if (!applicant) throw { code: "APPLICANT_NOT_FOUND" };

    const token = jwt.sign(
      { applicant_id: applicant.id, applicant_email: applicant.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    console.log("token", token);

    let link = `${process.env.APP_HOST}:${process.env.PORT}/reset_password/${token}`;

    // try {
    let emailSent = await mail.sendPasswordResetMail(email, link, "Applicant");
    console.log("emailSent:", emailSent);
    if (emailSent) {
      return "Email Sent";
    }
  } catch (err) {
    // if (!err.code) console.log("error in applicant service: ", err);
    // throw { code: "UNABLE_TO_SEND_EMAIL" };
    throw err;
  }
};

exports.resetPassword = async (token, password) => {
  //Get Token From Request
  // console.log("token", token);

  try {
    let { applicant_email } = jwt.verify(token, process.env.JWT_SECRET);
    if (!applicant_email) {
      throw { code: "WRONG_JWT_ERROR" };
    }
    // let decoded;
    // jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    //   if (err) {
    //     throw { code: "JWT_ERROR" };
    //   }
    //   decoded = decoded;
    //   console.log("decoded: ", decoded);
    // });
    // console.log("decoded: ", decoded);
    // let { citizen_email } = decoded;

    console.log("applicant_email", applicant_email);

    let applicant = await Applicant.findOne({
      where: { email: applicant_email },
    });

    //Hash Password
    const encrypted = await bcrypt.hash(password, 10);
    console.log("encrypted", encrypted);

    // body.password = encrypted;
    // const updateClientData = await updateClient(client._id, {
    //   password: encrypted,
    // });
    let applicant_updated = await applicant.update({ password: encrypted });

    return applicant_updated;
  } catch (err) {
    // if (!err.code) console.log("error in applicant service: ", err);
    // if (err instanceof JsonWebTokenError) {
    //   throw { code: "JWT_ERROR" };
    // }
    throw err;
  }
};
