const express = require("express");
const taskController = require("../controller/taskController");

const router = express.Router();

router.post("/", taskController.createTask);
router.get("/", taskController.getAllTasks);
router.post("/updone/:id", taskController.upDone);
router.post("/:id", taskController.updateTask);

module.exports = router;