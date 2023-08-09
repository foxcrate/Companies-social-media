const { Startup, Applicant } = require("../models");
const startupService = require("../services/startup.service");
const paginate = require("../util/paginate.util");
const util = require("util");
const sendResponse = require("../util/sendResponse.util");

exports.getAll = async (req, res, next) => {
  try {
    // default pagination values
    let page = 0;
    let perPage = 0;
    req.query.page ? (page = req.query.page) : (page = 1);
    req.query.perPage ? (perPage = req.query.perPage) : (perPage = 10);
    let data = await paginate(Startup, page, perPage);
    sendResponse(res, 200, data, null);
  } catch (err) {
    // console.log("error in controller: ", err);
    // err = util.inspect(err, true, null);
    // sendResponse(res, 400, null, err);
    if (!err.code) console.log("error in startup controller: ", err);
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
    if (!err.code) console.log("error in startup controller: ", err);
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
    if (!err.code) console.log("error in startup controller: ", err);
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
    if (!err.code) console.log("error in startup controller: ", err);
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
    if (!err.code) console.log("error in startup controller: ", err);
    next(err);
  }
};

exports.arrival = async (req, res, next) => {
  try {
    // console.log("arrived to controller successfully");
    // let newStartups = await Startup.bulkCreate([
    //   {
    //     name: "startup1",
    //     statue: "Pending",
    //     description: "Pretty good startup",
    //     applicantId: 1,
    //   },
    //   {
    //     name: "startup2",
    //     statue: "Pending",
    //     description: "Pretty good startup",
    //     applicantId: 1,
    //   },
    //   {
    //     name: "startup3",
    //     statue: "Pending",
    //     description: "Pretty good startup",
    //     applicantId: 1,
    //   },
    //   {
    //     name: "startup4",
    //     statue: "Pending",
    //     description: "Pretty good startup",
    //     applicantId: 1,
    //   },
    //   {
    //     name: "startup5",
    //     statue: "Pending",
    //     description: "Pretty good startup",
    //     applicantId: 1,
    //   },
    //   {
    //     name: "startup6",
    //     statue: "Pending",
    //     description: "Pretty good startup",
    //     applicantId: 1,
    //   },
    // ]);
    res.status(200).send("Alo");
  } catch (err) {
    console.log("err:", err);
    res.status(400).send(err);
  }
};
