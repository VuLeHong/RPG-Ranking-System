const express = require("express");
const userController = require("../controller/userController");

const router = express.Router();

router.post("/login", userController.login);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUser);
router.post("/upscore/:id", userController.upScore);
router.post("/", userController.createUser);
router.post("/:id", userController.addTask);

module.exports = router;