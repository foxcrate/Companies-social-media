const { Applicant } = require("../models");
const applicantService = require("../services/applicant.service");
const sendResponse = require("../utils/sendResponse.util");

exports.register = async (req, res, next) => {
  try {
    let data = await applicantService.register(req.body);
    sendResponse(res, 200, data, null);
  } catch (err) {
    // console.log("error in controller: ", err);
    // sendResponse(res, 400, null, err);
    // if (!err.code) console.log("error in applicant controller: ", err);
    next(err);
  }
};

exports.signin = async (req, res, next) => {
  try {
    let token = await applicantService.signin(req.body);
    let return_data = { token: token };
    // res.send(return_data);
    sendResponse(res, 200, return_data, null);
  } catch (err) {
    // console.log("error in controller: ", err);
    // res.status(400).send(err);
    // sendResponse(res, 400, null, err);
    // if (!err.code) console.log("error in applicant controller: ", err);
    next(err);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    // console.log("req.body:", req.body.token);
    // const token = req.body.token.split(" ")[1];
    let authorizationHeader = req.header("Authorization");
    let token = authorizationHeader.split(" ")[1];

    const password = req.body.password;
    const data = await applicantService.resetPassword(token, password);
    // res.status(200).json({
    //   data: data,
    // });
    sendResponse(res, 200, data, null);
  } catch (err) {
    // res.status(400).send(error);
    // sendResponse(res, 400, null, error);
    // if (!err.code) console.log("error in applicant controller: ", err);
    next(err);
  }
};

exports.sendResetPasswordMail = async (req, res, next) => {
  try {
    let data = await applicantService.sendResetPasswordMail(req.body);
    // console.log("data in controller:", data);
    // res.send({ data: data });
    sendResponse(res, 200, data, null);
  } catch (err) {
    // res.status(400).send(err);
    // sendResponse(res, 400, null, err);
    // if (!err.code) console.log("error in applicant controller: ", err);
    next(err);
  }
};

// exports.arrival = async (req, res) => {
//   try {
//     // console.log("arrived to applicant controller");
//     let the_applicant = await Applicant.findByPk(41);
//     // console.log("the_applicant:", the_applicant);

//     the_applicant_updated = await the_applicant.update({
//       email: "besu@gmail.com",
//     });
//     // console.log("the_applicant_updated:", the_applicant_updated);
//     res.status(200).send();
//   } catch (err) {
//     // res.status(400).send(err);
//     // if (!err.code) console.log("error in applicant controller: ", err);
//   }
// };
