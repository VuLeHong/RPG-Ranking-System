const express = require("express");
const projectController = require("../controller/projectController");

const router = express.Router();

router.post("/", projectController.createProject);
router.get("/", projectController.getAllProjects);
router.post("/:id", projectController.addTask);

module.exports = router;