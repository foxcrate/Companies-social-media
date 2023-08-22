const { Startup, Applicant, Like, Comment } = require("../models");
const startupService = require("../services/startup.service");
const paginate = require("../utils/paginate.util");
const util = require("util");
const sendResponse = require("../utils/sendResponse.util");

exports.getAll = async (req, res, next) => {
  try {
    // default pagination values
    let page = req.query.page;
    let perPage = req.query.perPage;

    let startupsCount = await Startup.count();
    let pagination = paginate(startupsCount, page, perPage);
    let allStartupsPaginated = await Startup.findAll({
      perPage: pagination.perPage,
      offset: pagination.offset,
    });
    // console.log("allStartupsPaginated: ", allStartupsPaginated);

    let data = {
      ...pagination,
      results: allStartupsPaginated,
    };
    sendResponse(res, 200, data, null);
  } catch (err) {
    // if (!err.code) console.log("error in startup controller: ", err);
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    let data = await startupService.getOne(req);
    // res.send(data);
    sendResponse(res, 200, data, null);
  } catch (err) {
    // console.log("error in controller: ", err);
    // res.status(400).send(err);
    // sendResponse(res, 400, null, err);
    // if (!err.code) console.log("error in startup controller: ", err);
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    let data = await startupService.create(req);
    // res.send(data);
    sendResponse(res, 200, data, null);
  } catch (err) {
    // console.log("error in controller: ", err);
    // res.status(400).send(err);
    // sendResponse(res, 400, null, err);
    // if (!err.code) console.log("error in startup controller: ", err);
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    let data = await startupService.update(req);
    // res.send(data);
    sendResponse(res, 200, data, null);
  } catch (err) {
    // console.log("error in controller: ", err);
    // res.status(400).send(err);
    // sendResponse(res, 400, null, err);
    // if (!err.code) console.log("error in startup controller: ", err);
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    let data = await startupService.delete(req);
    // res.send(data);
    sendResponse(res, 200, data, null);
  } catch (err) {
    // console.log("error in controller: ", err);
    // res.status(400).send(err);
    // sendResponse(res, 400, null, err);
    // if (!err.code) console.log("error in startup controller: ", err);
    next(err);
  }
};

exports.showComments = async (req, res, next) => {
  try {
    let data = await startupService.all_comments(req);
    sendResponse(res, 200, data, null);
  } catch (err) {
    next(err);
  }
};

exports.addComment = async (req, res, next) => {
  try {
    let data = await startupService.addComment(req);
    sendResponse(res, 200, data, null);
  } catch (err) {
    next(err);
  }
};

exports.editComment = async (req, res, next) => {
  try {
    let data = await startupService.editComment(req);
    sendResponse(res, 200, data, null);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    let data = await startupService.deleteComment(req);
    sendResponse(res, 200, data, null);
  } catch (err) {
    next(err);
  }
};

exports.showLikes = async (req, res, next) => {
  try {
    // let all_likes = await Like.findAll({ raw: true });
    let data = await startupService.all_likes(req);
    sendResponse(res, 200, data, null);
  } catch (err) {
    next(err);
  }
};

exports.addRemoveLike = async (req, res, next) => {
  try {
    let previousLike = await Like.findOne({
      where: { CitizenId: req.citizen_id },
    });
    if (previousLike) {
      console.log("foundedLike");
      await previousLike.destroy();
      sendResponse(res, 200, "Like removed", null);
      return;
    }
    let data = await startupService.addRemoveLike(req);
    sendResponse(res, 200, data, null);
  } catch (err) {
    next(err);
  }
};
