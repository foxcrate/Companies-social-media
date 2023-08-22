const { Startup, Applicant, Like, Comment } = require("../models");

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
    let startup = await Startup.findOne({
      where: { applicantId: req.body.applicantId },
    });
    if (startup) {
      throw { code: "APPLICANT_HAS_STARTUP" };
    }

    startup = await Startup.findOne({ where: { name: req.body.name } });
    if (startup) {
      throw { code: "REPEATED_NAME" };
    }
    let applicant = await Applicant.findByPk(req.body.applicantId);
    if (!applicant) {
      throw { code: "APPLICANT_NOT_FOUND" };
    }

    let newStartup = await Startup.create({
      name: req.body.name,
      statue: "Pending",
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

exports.all_comments = async (req) => {
  try {
    console.log("req.param:", req.params);
    let theStartup = await Startup.findByPk(req.params.id);
    // console.log("theStartup:", theStartup);
    if (!theStartup) throw { code: "STARTUP_NOT_FOUND" };
    let all_comments = await theStartup.getComments();
    return all_comments;
  } catch (err) {
    // if (!err.code) console.log("error in startup service: ", err);
    throw err;
  }
};

exports.addComment = async (req) => {
  try {
    let theStartup = await Startup.findByPk(req.params.id);
    if (!theStartup) throw { code: "STARTUP_NOT_FOUND" };
    let newComment = await Comment.create({
      content: req.body.content,
      CitizenId: req.citizen_id,
      StartupId: theStartup.id,
    });
    return newComment;
  } catch (err) {
    // if (!err.code) console.log("error in startup service: ", err);
    throw err;
  }
};

exports.editComment = async (req) => {
  try {
    // let theStartup = await Startup.findByPk(req.params.id);
    // if (!theStartup) throw { code: "STARTUP_NOT_FOUND" };
    let theComment = await Comment.findByPk(req.params.commentId);
    if (!theComment) throw { code: "COMMENT_NOT_FOUND" };
    let updatedComment = await theComment.update({
      content: req.body.content,
    });
    return updatedComment;
  } catch (err) {
    // if (!err.code) console.log("error in startup service: ", err);
    throw err;
  }
};

exports.deleteComment = async (req) => {
  try {
    // let theStartup = await Startup.findByPk(req.params.id);
    // if (!theStartup) throw { code: "STARTUP_NOT_FOUND" };
    let theComment = await Comment.findByPk(req.params.commentId);
    if (!theComment) throw { code: "COMMENT_NOT_FOUND" };
    let deletedComment = await theComment.destroy();
    return deletedComment;
  } catch (err) {
    // if (!err.code) console.log("error in startup service: ", err);
    throw err;
  }
};

exports.all_likes = async (req) => {
  try {
    console.log("req.param:", req.params);
    let theStartup = await Startup.findByPk(req.params.id);
    // console.log("theStartup:", theStartup);
    if (!theStartup) throw { code: "STARTUP_NOT_FOUND" };
    let all_likes = await theStartup.getLikes();
    return all_likes;
  } catch (err) {
    // if (!err.code) console.log("error in startup service: ", err);
    throw err;
  }
};

exports.addRemoveLike = async (req) => {
  // let x = await Like.sync({ force: true });

  try {
    console.log("req.param:", req.params);
    let theStartup = await Startup.findByPk(req.params.id);
    console.log("theStartup:", theStartup);
    if (!theStartup) throw { code: "STARTUP_NOT_FOUND" };
    let newLike = await Like.create({
      CitizenId: req.citizen_id,
      StartupId: theStartup.id,
    });
    return newLike;
  } catch (err) {
    // if (!err.code) console.log("error in startup service: ", err);
    throw err;
  }
};
