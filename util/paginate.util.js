module.exports = paginate = async (model, page, perPage) => {
  page = parseInt(page);
  perPage = parseInt(perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = page * perPage;

  const result = {};
  let modelCount = await model.count();
  result.allCount = modelCount;
  result.availablePages = Math.ceil(modelCount / perPage);
  if (page > result.availablePages) {
    throw { code: "EXCEED_PAGE_LIMIT", msg: "not available page" };
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
  result.results = await model.findAll({
    raw: true,
    perPage: perPage,
    offset: startIndex,
  });
  return result;
};
