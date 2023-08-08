const { Citizen } = require("../models");
const bcrypt = require("bcrypt");
const { JsonWebTokenError } = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const mail = require("../util/mail.util");

exports.register = async (body) => {
  try {
    console.log("body:", body);
    //check uniqueness of the email
    let foundedEmail = await Citizen.findOne({ where: { email: body.email } });
    if (foundedEmail) {
      throw { code: "REPEATED_EMAIL" };
    } else {
      let hashedPassword = await bcrypt.hash(body.password, 10);
      let newCitizen = await Citizen.create({
        name: body.name,
        email: body.email,
        password: hashedPassword,
      });
      return newCitizen;
    }
  } catch (error) {
    throw error;
  }
};

exports.signin = async (body) => {
  try {
    let foundedAccount = await Citizen.findOne({
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
      let token = jwt.sign({ id: foundedAccount.id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      return "Bearer " + token;
    }
  } catch (error) {
    throw error;
  }
};

exports.resetPassword = async (token, password) => {
  //Get Token From Request
  // console.log("token", token);

  try {
    let { citizen_email } = jwt.verify(token, process.env.JWT_SECRET);
    if (!citizen_email) {
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

    console.log("citizen_email", citizen_email);

    let citizen = await Citizen.findOne({ where: { email: citizen_email } });

    //Hash Password
    const encrypted = await bcrypt.hash(password, 10);
    console.log("encrypted", encrypted);

    // body.password = encrypted;
    // const updateClientData = await updateClient(client._id, {
    //   password: encrypted,
    // });
    let citizen_updated = await citizen.update({ password: encrypted });

    return citizen_updated;
  } catch (err) {
    console.log("error in service:", err);
    // if (err instanceof JsonWebTokenError) {
    //   throw { code: "JWT_ERROR" };
    // }
    throw err;
  }
};

exports.sendResetPasswordMail = async (body) => {
  try {
    //Store Requested Mail
    const email = body.email;

    //Get Citizen From Database
    let citizen = await Citizen.findOne({ where: { email: email } });

    //Check If Client Exists
    if (!citizen) throw { code: "CITIZEN_NOT_FOUND" };

    const token = jwt.sign(
      { citizen_id: citizen.id, citizen_email: citizen.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "10m",
      }
    );

    console.log("token", token);

    let link = `${process.env.APP_HOST}:${process.env.PORT}/reset_password/${token}`;

    // try {
    let emailSent = await mail.sendPasswordResetMailToCitizen(email, link);
    console.log("emailSent:", emailSent);
    if (emailSent) {
      return "Email Sent";
    }
  } catch (error) {
    console.log("error in citizen email service:", error);
    // throw { code: "UNABLE_TO_SEND_EMAIL" };
    throw error;
  }
};
