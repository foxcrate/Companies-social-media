const { Startup, Applicant } = require("../models");

exports.getAll = async (req) => {
  try {
    let allStartups = await Startup.findAll();
    return allStartups;
  } catch (err) {
    // if (!err.code) console.log("error in startup service: ", err);
    throw err;
  }
};

exports.getOne = async (req) => {
  try {
    let theStartup = await Startup.findByPk(req.params.id);
    if (!theStartup) throw { code: "STARTUP_NOT_FOUND" };
    return theStartup;
  } catch (err) {
    // if (!err.code) console.log("error in startup service: ", err);
    throw err;
  }
};

exports.create = async (req) => {
  try {
    let startup = await Startup.findOne({ where: { name: req.body.name } });
    if (startup) {
      throw { code: "REPEATED_NAME" };
    }
    let applicant = await Applicant.findByPk(req.body.applicantId);
    if (!applicant) {
      throw { code: "APPLICANT_NOT_FOUND" };
    }

    let newStartup = await Startup.create({
      name: req.body.name,
      statue: req.body.statue,
      description: req.body.description,
      applicantId: req.body.applicantId,
    });
    return newStartup;
  } catch (err) {
    // if (!err.code) console.log("error in startup service: ", err);
    throw err;
  }
};

exports.update = async (req) => {
  try {
    let theStartup = await Startup.findByPk(req.params.id);
    if (!theStartup) throw { code: "STARTUP_NOT_FOUND" };

    let startup = await Startup.findOne({ where: { name: req.body.name } });
    if (startup && startup.id != req.params.id) {
      throw { code: "REPEATED_NAME" };
    }

    let applicant = await Applicant.findByPk(req.body.applicantId);
    if (!applicant) {
      throw { code: "APPLICANT_NOT_FOUND" };
    }

    let updatedStartup = theStartup.update({
      name: req.body.name,
      statue: req.body.statue,
      description: req.body.description,
      applicantId: req.body.applicantId,
    });
    return updatedStartup;
  } catch (err) {
    // if (!err.code) console.log("error in startup service: ", err);
    throw err;
  }
};

exports.delete = async (req) => {
  try {
    let theStartup = await Startup.findByPk(req.params.id);
    if (!theStartup) throw { code: "STARTUP_NOT_FOUND" };
    let deletedStartup = await theStartup.destroy();
    return deletedStartup;
  } catch (err) {
    // if (!err.code) console.log("error in startup service: ", err);
    throw err;
  }
};
