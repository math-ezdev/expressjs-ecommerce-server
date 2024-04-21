const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth");
const passport = require("passport");
const { isAuthenticated } = require("../middlewares/appAuth");

router
  .get("/login", controller.loginPage)
  .post("/login",passport.authenticate('local',{
    successRedirect:"/",
    failureRedirect:"/auth/login",
    failureMessage:true
  }))
  .get("/register", controller.registerPage)
  .post("/register", controller.register)
  .get("/reset-password", controller.resetPasswordPage)
  .post("reset-password", controller.resetPassword)
  .get("/logout", controller.logout);

module.exports = router;
