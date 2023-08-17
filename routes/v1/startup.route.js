const express = require("express");
const validateRequestSchema = require("../../middlewares/validateRequestSchema.middleware");
const startupCreateSchema = require("../../validationSchema/startup/create.schema");
const startupUpdateSchema = require("../../validationSchema/startup/update.schema");
const startupController = require("../../controllers/startup.controller");
const applicantAuth = require("../../middlewares/applicantAuth.middleware");
const citizenAuth = require("../../middlewares/citizenAuth.middleware");

const router = express.Router();

// console.log("citizenRegisterSchema: ", citizenRegisterSchema);

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
  startupUpdateSchema,
  validateRequestSchema,
  startupController.update
);

router.delete("/:id", startupController.delete);

// router.post("/test", startupController.arrival);

module.exports = router;
