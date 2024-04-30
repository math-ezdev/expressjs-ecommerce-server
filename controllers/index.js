const dashboardPage = (req, res, next) => {
  const user = req.user;

  res.locals.title = "Dashboard";
  res.render("index");
};

module.exports = {
  dashboardPage,
};
