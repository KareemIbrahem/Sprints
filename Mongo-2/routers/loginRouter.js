const express = require("express");
const [validateData, userLogin] = require("../controller/loginController");
const router = express.Router();

router.post("/", validateData, userLogin);

module.exports = router;
