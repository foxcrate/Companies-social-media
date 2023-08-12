const express = require("express");
const validateRequestSchema = require("../../middlewares/validateRequestSchema.middleware");
const startupCreateSchema = require("../../validationSchema/startup/create.schema");
const startupController = require("../../controllers/startup.controller");

const router = express.Router();

// console.log("citizenRegisterSchema: ", citizenRegisterSchema);

router.get("/", startupController.getAll);

router.get("/:id", startupController.getOne);

router.post(
  "/",
  startupCreateSchema,
  validateRequestSchema,
  startupController.create
);

router.put(
  "/:id",
  startupCreateSchema,
  validateRequestSchema,
  startupController.update
);

router.delete("/:id", startupController.delete);

// router.post("/test", startupController.arrival);

module.exports = router;
