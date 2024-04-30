const express = require("express");
const router = express.Router();
const controller = require("../controllers/user");
const { processUserValidation } = require("../middlewares/validation");
const { authenticateUser } = require("../middlewares/apiAuth");

router
.get('/profile', controller.profilePage)
.post("/profile", controller.editProfile)
.post("/change-password",processUserValidation, authenticateUser, controller.changePassword)


module.exports = router;
