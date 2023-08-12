module.exports = (dataCount, page, perPage) => {
  try {
    if (!page) {
      page = 1;
    }
    if (!perPage) {
      perPage = 10;
    }

    page = parseInt(page);
    perPage = parseInt(perPage);
    console.log("perPage:", perPage);
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    const result = {};
    // let modelCount = await model.count();
    let modelCount = dataCount;
    result.allCount = modelCount;
    result.availablePages = Math.ceil(modelCount / perPage);
    // console.log("availablePages:", result.availablePages);
    if (page > result.availablePages || page < 0) {
      throw { code: "UNAVAILABLE_PAGE" };
    }
    if (endIndex < modelCount) {
      result.next = {
        page: page + 1,
        perPage: perPage,
      };
    }
    if (startIndex > 0) {
      result.previous = {
        page: page - 1,
        perPage: perPage,
      };
    }
    // result.results = await model.findAll({
    //   raw: true,
    //   perPage: perPage,
    //   offset: startIndex,
    // });
    result.perPage = perPage;
    result.offset = startIndex;
    return result;
  } catch (err) {
    // if (!err.code) {
    // throw { code: "SERVER_ERROR" };
    // } else {
    throw err;
    // }
  }
};
