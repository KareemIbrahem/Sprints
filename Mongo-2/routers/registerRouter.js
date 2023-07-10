const express = require("express");
const [validateData, addUser] = require("../controller/registerController");
const router = express.Router();
router.post("/", validateData, addUser);

module.exports = router;
