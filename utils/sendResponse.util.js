// const errorMessages = require("./errorMessages.util");
const savedErrors = require("./errors");

module.exports = (response, statusCode, data, error) => {
  try {
    let returnObject;
    if (statusCode == 200) {
      returnObject = {
        data: data,
        error: null,
      };
    } else if (statusCode == 400) {
      console.log("error:", error);

      if (error.code == "VALIDATION_ERROR") {
        returnObject = {
          data: null,
          error: { code: error.code, msg: error.msg },
        };
      } else {
        returnObject = {
          data: null,
          error: {
            code: error.code,
            msg: savedErrors.get("en").get(error.code),
          },
        };
      }
    } else if (statusCode == 500) {
      returnObject = {
        data: null,
        error: { code: "SERVER_ERROR", msg: error },
      };
      // return response.status(statusCode).send(returnObject);
    }
    console.log("returnObject in util: ", returnObject);
    response.status(statusCode).send(returnObject);
  } catch (err) {
    console.log("error in sendResponse util: ", err);
  }
};
