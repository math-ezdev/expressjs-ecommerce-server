const isAuthenticated = (req, res, next) => {
  console.log(`check isAuthenticated ::: ${req.isAuthenticated()}`)

  if (!req.isAuthenticated()) {
    return res.redirect("/auth/login");
  }

  next();
};

module.exports = {
  isAuthenticated,
};
