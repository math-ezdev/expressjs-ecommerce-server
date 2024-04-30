const signInPage = (req, res, next) => {
  res.locals.title = "Sign in";
  res.render("pages/auth/signin", { layout: "layouts/empty" });
};

const resetPasswordPage = (req, res, next) => {
  res.locals.title = "Reset Password";
  res.render("pages/auth/reset-password", { layout: "layouts/empty" });
};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

const signIn = (req, res, next) => {};

const resetPassword = (req, res, next) => {};

module.exports = {
  signInPage,
  resetPasswordPage,
  signIn,
  resetPassword,
  logout,
};
