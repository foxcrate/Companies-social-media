const { Citizen } = require("../models");
const citizenService = require("../services/citizen.service");
const nodemailer = require("nodemailer");

exports.register = async (req, res) => {
  try {
    let data = await citizenService.register(req.body);
    res.send(data);
  } catch (err) {
    // console.log("error in controller: ", err);
    res.status(400).send(err);
  }
};

exports.signin = async (req, res) => {
  try {
    let token = await citizenService.signin(req.body);
    let return_data = { data: { token: token } };
    res.send(return_data);
  } catch (err) {
    // console.log("error in controller: ", err);
    res.status(400).send(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    console.log("req.body:", req.body.token);
    const token = req.body.token.split(" ")[1];
    const password = req.body.password;
    const data = await citizenService.resetPassword(token, password);
    res.status(200).json({
      data: data,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.sendResetPasswordMail = async (req, res) => {
  try {
    let data = await citizenService.sendResetPasswordMail(req.body);
    console.log("data in controller:", data);
    res.send({ data: data });
  } catch (err) {
    // console.log("error in controller: ", err);
    res.status(400).send(err);
  }
};

exports.arrival = async (req, res) => {
  try {
    console.log("arrived to citizen controller");
    the_citizen = await Citizen.findByPk(41);
    console.log("the_citizen:", the_citizen);

    the_citizen_updated = await the_citizen.update({ email: "besu@gmail.com" });
    console.log("the_citizen_updated:", the_citizen_updated);
    res.status(200).send();
  } catch (err) {
    // res.status(400).send(err);
  }
};
