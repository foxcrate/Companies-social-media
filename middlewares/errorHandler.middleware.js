const sendResponse = require("../util/sendResponse.util");

module.exports = async (err, req, res, next) => {
  try {
    console.log("error in middleware:", err);
    if (err.code) {
      sendResponse(res, 400, null, err);
    } else {
      sendResponse(res, 400, null, { code: "SERVER_ERROR" });
    }
  } catch (error) {
    // throw error;
  }
};
