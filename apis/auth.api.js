const express = require("express");
const router = express.Router();
const controller = require("./auth.controller");
const { processUserValidation } = require("../middlewares/validation");
const {
  authenticateUser,
  authenticateToken,
} = require("../middlewares/apiAuth");
const { REFRESH_TOKEN_SECRET } = process.env;

router
  .post("/signup", processUserValidation, controller.signUp)
  .post("/signin", processUserValidation, authenticateUser, controller.signIn)
  .post(
    "/token",
    authenticateToken(REFRESH_TOKEN_SECRET),
    controller.refreshToken
  )
  .post("/logout", controller.logout);

module.exports = router;
