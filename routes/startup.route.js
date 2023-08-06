const express = require("express");
const validateRequestSchema = require("../middlewares/validateRequestSchema.middleware");
const startupCreateSchema = require("../validationSchema/startup/create.schema");
const startupCheckIdSchema = require("../validationSchema/startup/checkId.schema");
const startupController = require("../controllers/startup.controller");

const router = express.Router();

// console.log("citizenRegisterSchema: ", citizenRegisterSchema);

router.get("/", startupController.getAll);

router.get(
  "/:id",
  startupCheckIdSchema,
  validateRequestSchema,
  startupController.getOne
);

router.post(
  "/",
  startupCreateSchema,
  validateRequestSchema,
  startupController.create
);

router.put(
  "/:id",
  startupCheckIdSchema,
  startupCreateSchema,
  validateRequestSchema,
  startupController.update
);

router.delete(
  "/:id",
  startupCheckIdSchema,
  validateRequestSchema,
  startupController.delete
);

router.post("/test", startupController.arrival);

module.exports = router;
