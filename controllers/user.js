const { UserModel } = require("../models/user");

const profilePage = (req, res, next) => {
  res.locals.title = "Profile";
  res.render("pages/user/profile");
};

const editProfile = async (req, res, next) => {
  try {
    const user = req.user;
    const updatedUser = await UserModel.findByIdAndUpdate(user.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
    }

    res.locals.user = updatedUser;

    res.redirect(res.locals.currentUrl);
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { new_password } = req.body;
    const user = req.verifiedUser;

    user.password = new_password
    const updatedUser = await UserModel.findById(user.id)
    updatedUser.password = new_password
    await updatedUser.save()

    if (!updatedUser) {
    }

    req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  profilePage,
  editProfile,
  changePassword,
};
