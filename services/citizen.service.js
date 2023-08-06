const { Citizen } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mail = require("../util/mail.util");

exports.register = async (body) => {
  try {
    console.log("body:", body);
    //check uniqueness of the email
    let foundedEmail = await Citizen.findOne({ where: { email: body.email } });
    if (foundedEmail) {
      throw { code: "SQL_ERROR", msg: "repeated email" };
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
      throw { code: "NO_CLIENT_EMAIL", msg: "account not found" };
    } else {
      console.log("foundedAccount:", foundedAccount);
      let rightPassword = await bcrypt.compare(
        body.password,
        foundedAccount.password
      );
      console.log("password:", body.password);
      console.log("rightPassword:", rightPassword);
      if (!rightPassword) {
        throw { code: "CLIENT_WRONG_PASSWORD", msg: "wrong password" };
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
  console.log("token", token);

  try {
    if (!token) {
      throw { code: "NO_TOKEN_PRIVIDED", msg: "a token is needed" };
    }
    let { citizen_email } = await jwt.verify(token, process.env.JWT_SECRET);

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

    return "Password Reset Successfully";
  } catch (error) {
    throw error;
  }
};

exports.sendResetPasswordMail = async (body) => {
  //Store Requested Mail
  const email = body.email;

  //Check If Mail Exists
  if (!email)
    throw { code: "MISSING_EMAIL_IN_RESET_CITIZEN", msg: "email is missing" };

  //Get Citizen From Database
  let citizen = await Citizen.findOne({ where: { email: email } });

  //Check If Client Exists
  if (!citizen) throw { code: "CITIZEN_NOT_FOUND", msg: "Citizen not found" };

  const token = jwt.sign(
    { citizen_id: citizen.id, citizen_email: citizen.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );

  console.log("token", token);

  let link = `${process.env.APP_HOST}:${process.env.PORT}/reset_password/${token}`;

  try {
    await mail.sendPasswordResetMailToCitizen(email, link);
    return "Email Sent";
  } catch (error) {
    console.log("error in citizen email service:", error);
    throw { code: "UNABLE_TO_SEND_EMAIL", msg: "error in sending the email" };
  }
};
