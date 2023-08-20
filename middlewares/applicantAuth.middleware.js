const { Applicant } = require("../models");
const jwt = require("jsonwebtoken");
const sendResponse = require("../utils/sendResponse.util");

let token = async (req, res, next) => {
  console.log("applicant auth middleware");
  try {
    let authorizationHeader = req.header("Authorization");
    // console.log("authorizationHeader: ", authorizationHeader);
    if (!authorizationHeader)
      throw {
        code: "NO_BEARER_TOKEN",
      };
    let bearerToken = authorizationHeader.split(" ")[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        console.log("jwt error: ", err);
        throw { code: "JWT_ERROR" };
      }
      console.log("data in bearerToken: ", data);
      console.log("data.applicant_id:", data.applicant_id);
      if (!data.applicant_id) {
        throw { code: "JWT_ERROR" };
      }
      req.applicant_id = data.applicant_id;
      next();
    });
  } catch (err) {
    // console.log("error in middleware: ", err);
    // res.status(400).send(err);
    // sendResponse(res, 400, null, err);
    // if (!err.code) console.log("error in applicant auth middleware: ", err);
    next(err);
  }
};

module.exports = token;
