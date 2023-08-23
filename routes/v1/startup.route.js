const express = require("express");
const validateRequestSchema = require("../../middlewares/validateRequestSchema.middleware");
const startupCreateSchema = require("../../validationSchema/startup/create.schema");
const startupUpdateSchema = require("../../validationSchema/startup/update.schema");
const commentCreateSchema = require("../../validationSchema/startup/createComment.schema");
const startupController = require("../../controllers/startup.controller");
const applicantAuth = require("../../middlewares/applicantAuth.middleware");
const citizenAuth = require("../../middlewares/citizenAuth.middleware");

const router = express.Router();

router.get("/", citizenAuth, startupController.getAll);

router.get("/:id", startupController.getOne);

router.post(
  "/",
  applicantAuth,
  startupCreateSchema,
  validateRequestSchema,
  startupController.create
);

router.put(
  "/:id",
  applicantAuth,
  startupCreateSchema,
  validateRequestSchema,
  startupController.update
);

router.delete("/:id", applicantAuth, startupController.delete);

router.post(
  "/:id/add_startup_comment",
  citizenAuth,
  startupController.addComment
);

router.get("/:id/likes", citizenAuth, startupController.showLikes);

router.post("/:id/likes", citizenAuth, startupController.addRemoveLike);

router.get("/:id/comments", citizenAuth, startupController.showComments);

router.post(
  "/:id/comments",
  citizenAuth,
  commentCreateSchema,
  validateRequestSchema,
  startupController.addComment
);

router.put(
  "/:id/comments/:commentId",
  citizenAuth,
  commentCreateSchema,
  validateRequestSchema,
  startupController.editComment
);

router.delete(
  "/:id/comments/:commentId",
  citizenAuth,
  startupController.deleteComment
);

module.exports = router;
