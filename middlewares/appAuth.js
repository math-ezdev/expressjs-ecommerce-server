const createError = require("http-errors");
const { navigation } = require("../configs/navigation");

const isAuthenticated = (req, res, next) => {
  console.log(`check isAuthenticated ::: ${req.isAuthenticated()}`);

  const isApiRequest = req.originalUrl.startsWith("/api");
  if (!req.isAuthenticated() && !isApiRequest) {
    return res.redirect(navigation.auth.signIn);
  }

  res.locals.user = req.user;
  console.log(`res.locals.user::: ${res.locals.user}`);
  next();
};

const isAuthorizated = (permission) => {
  return (req, res, next) => {
    const { role } = req.user;
    if (!permission.includes(role)) {
      req.logout((err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/");
      });
      return next(
        createError.Unauthorized("You do not have permission to access!")
      );
    }

    next();
  };
};

module.exports = {
  isAuthenticated,
  isAuthorizated,
};
