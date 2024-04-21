const loginPage = (req, res, next) => {
  const locals = {
    title: "Login",
  };
  res.locals = locals;
  res.render("pages/auth/login", { layout: "layouts/empty" });
};

const registerPage = (req, res, next) => {
  const locals = {
    title: "Register",
  };
  res.locals = locals;
  res.render("pages/auth/register", { layout: "layouts/empty" });
};

const resetPasswordPage = (req, res, next) => {
  const locals = {
    title: "Forget Password",
  };
  res.locals = locals;
  res.render("pages/auth/reset-password", { layout: "layouts/empty" });
};

const login = (req, res, next) => {};

const register = (req, res, next) => {};

const resetPassword = (req, res, next) => {};

const logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/"); 
  });
};

module.exports = {
  loginPage,
  registerPage,
  resetPasswordPage,
  login,
  register,
  resetPassword,
  logout,
};
