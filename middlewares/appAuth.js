const { navigation } = require("../configs/navigation");

const isAuthenticated = (req, res, next) => {
  console.log(`check isAuthenticated ::: ${req.isAuthenticated()}`)

  const isApiRequest = req.originalUrl.startsWith("/api");
  if (!req.isAuthenticated() && !isApiRequest) {
    return res.redirect(navigation.auth.signIn);
  }

  next();
};

module.exports = {
  isAuthenticated,
};
