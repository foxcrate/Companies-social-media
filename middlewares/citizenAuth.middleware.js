const { Citizen } = require("../models");
const jwt = require("jsonwebtoken");

let token = async (req, res, next) => {
  console.log("citizen middleware");
  try {
    let authorizationHeader = req.header("Authorization");
    // console.log("authorizationHeader: ", authorizationHeader);
    if (!authorizationHeader)
      throw {
        code: "NO_BEARER_TOKEN",
        msg: "authorization Bearer token should be provided",
      };
    let bearerToken = authorizationHeader.split(" ")[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        console.log("jwt error: ", err);
        throw { code: "JWT_ERROR", msg: "invalid token" };
      }
      console.log("data in bearerToken: ", data);
      console.log("data.id:", data.id);
      req.citizen_id = data.id;
      next();
    });
  } catch (err) {
    // console.log("error in middleware: ", err);
    res.status(400).send(err);
  }
};

module.exports = token;
