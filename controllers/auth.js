
const signInPage = (req, res, next) => {
  const locals = {
    title: "Sign in",
  };
  res.locals = locals;
  res.render("pages/auth/signin", { layout: "layouts/empty" });
};

const signUpPage = (req, res, next) => {
  const locals = {
    title: "Sign up",
  };
  res.locals = locals;
  res.render("pages/auth/signup", { layout: "layouts/empty" });
};

const resetPasswordPage = (req, res, next) => {
  const locals = {
    title: "Reset Password",
  };
  res.locals = locals;
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

const signUp = (req, res, next) => {};

const resetPassword = (req, res, next) => {};

module.exports = {
  signInPage,
  signUpPage,
  resetPasswordPage,
  signIn,
  signUp,
  resetPassword,
  logout,
};
