const errors = require("./errors");

module.exports = (error) => {
  console.log("error in util: ", error);
  if (error.code == "SQL_ERROR") {
    return "repeated email";
  }
};
