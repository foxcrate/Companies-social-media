const { Startup, Applicant } = require("../models");
const startupService = require("../services/startup.service");
const paginate = require("../util/paginate.util");

exports.getAll = async (req, res) => {
  try {
    // default pagination values
    let page = 0;
    let perPage = 0;
    req.query.page ? (page = req.query.page) : (page = 1);
    req.query.perPage ? (perPage = req.query.perPage) : (perPage = 10);
    let data = await paginate(Startup, page, perPage);
    res.send(data);
  } catch (err) {
    console.log("error in controller: ", err);
    res.status(400).send(err);
  }
};

exports.getOne = async (req, res) => {
  try {
    let data = await startupService.getOne(req);
    res.send(data);
  } catch (err) {
    console.log("error in controller: ", err);
    res.status(400).send(err);
  }
};

exports.create = async (req, res) => {
  try {
    let data = await startupService.create(req);
    res.send(data);
  } catch (err) {
    console.log("error in controller: ", err);
    res.status(400).send(err);
  }
};

exports.update = async (req, res) => {
  try {
    let data = await startupService.update(req);
    res.send(data);
  } catch (err) {
    console.log("error in controller: ", err);
    res.status(400).send(err);
  }
};

exports.delete = async (req, res) => {
  try {
    let data = await startupService.delete(req);
    res.send(data);
  } catch (err) {
    console.log("error in controller: ", err);
    res.status(400).send(err);
  }
};

exports.arrival = async (req, res) => {
  try {
    console.log("arrived to controller successfully");
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
