const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/wish/:name", userController.wish);
router.get("/birthDates", userController.getBirthDates);

router.put("/login", userController.login);

router.post("/register", userController.register);

module.exports = router;
