const express = require("express");
const router = express.Router();
const controller = require("./test.controller");

router.get("/protected", controller.accessProtectedResource);

module.exports = router;
