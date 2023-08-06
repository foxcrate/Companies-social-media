const { Startup, Applicant } = require("../models");

exports.getAll = async (req) => {
  try {
    let allStartups = await Startup.findAll();
    return allStartups;
  } catch (error) {
    throw error;
  }
};

exports.getOne = async (req) => {
  try {
    let theStartup = await Startup.findByPk(req.params.id);
    if (theStartup == null) {
      throw { code: "NOT_EXISTED_STARTUP", msg: "no id provided" };
    }
    return theStartup;
  } catch (error) {
    throw error;
  }
};

exports.create = async (req) => {
  try {
    let newStartup = await Startup.create({
      name: req.body.name,
      statue: req.body.statue,
      description: req.body.description,
      applicantId: req.body.applicantId,
    });
    return newStartup;
  } catch (error) {
    throw error;
  }
};

exports.update = async (req) => {
  try {
    let theStartup = await Startup.findByPk(req.params.id);
    let updatedStartup = theStartup.update({
      name: req.body.name,
      statue: req.body.statue,
      description: req.body.description,
      applicantId: req.body.applicantId,
    });
    return updatedStartup;
  } catch (error) {
    throw error;
  }
};

exports.delete = async (req) => {
  try {
    let theStartup = await Startup.findByPk(req.params.id);
    let deletedStartup = await theStartup.destroy();
    return deletedStartup;
  } catch (error) {
    throw error;
  }
};
