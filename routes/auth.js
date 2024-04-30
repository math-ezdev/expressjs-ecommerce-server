const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const passport = require("passport");
const { navigation } = require("../configs/navigation");

router
  .get("/signin", controller.signInPage)
  .post(
    "/signin",
    passport.authenticate("local", {
      successRedirect: navigation.index,
      failureRedirect: navigation.auth.signIn,
      failureMessage: true,
    })
  )
  .get("/reset-password", controller.resetPasswordPage)
  .post("reset-password", controller.resetPassword)
  .get("/logout", controller.logout);

module.exports = router;
