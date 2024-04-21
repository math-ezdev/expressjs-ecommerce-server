const express = require("express");
const router = express.Router();
const controller = require("./test.controller");
const { authenticateToken } = require("../middlewares/apiAuth");

router.get("/protected", authenticateToken(), controller.accessProtectedResource);

module.exports = router;
