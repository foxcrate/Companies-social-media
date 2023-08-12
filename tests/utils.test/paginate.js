const supertest = require("supertest");
const app = require("../../app");
const savedErrors = require("../../utils/errors");
const paginate = require("../../utils/paginate.util");

module.exports = () => {
  describe("Pagination", () => {
    test("page and perPage default values", () => {
      let modelCount = 20;
      let page = null;
      let perPage = null;
      let returnObject = {
        allCount: 20,
        availablePages: 2,
        next: {
          page: 2,
          perPage: 10,
        },
        perPage: 10,
        offset: 0,
      };
      let paginationObject = paginate(modelCount, page, perPage);
      expect(paginationObject).toEqual(returnObject);
    });
    test("Unavailable page error", () => {
      let theError = {
        code: "UNAVAILABLE_PAGE",
      };
      try {
        let paginationObject = paginate(10, 3, 5);
      } catch (err) {
        console.log("err in pagination test1:", err);
        expect(err).toEqual(theError);
      }
    });
    test("Existance of next and previous pages object", () => {
      let modelCount = 10;
      let page = 2;
      let perPage = 3;
      let paginationObject = paginate(modelCount, page, perPage);
      expect(paginationObject).toHaveProperty("next");
      expect(paginationObject).toHaveProperty("previous");
    });
  });
};
