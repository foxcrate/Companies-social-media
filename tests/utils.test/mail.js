const supertest = require("supertest");
const app = require("../../app");
const savedErrors = require("../../utils/errors");
const mail = require("../../utils/mail.util");

module.exports = () => {
  describe("Mail", () => {
    test("Sent successfully", async () => {
      let returnValue = await mail.sendPasswordResetMail(
        "ahmedmustafa.pro19@gmail.com",
        "aa.com",
        "aaa"
      );
      expect(returnValue).toBeTruthy();
    });
    test("Unable to send email", async () => {
      let theError = { code: "UNABLE_TO_SEND_EMAIL" };
      try {
        let returnValue = await mail.sendPasswordResetMail(
          "x",
          "aa.com",
          "aaa"
        );
      } catch (err) {
        expect(err).toEqual(theError);
      }
    });
  });
};
