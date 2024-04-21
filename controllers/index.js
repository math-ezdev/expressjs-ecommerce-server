const homePage = (req, res, next) => {
  const user = req.user

  var locals = {
    title: "Home",
  };
  res.locals = locals;
  return res.render("index");
};

const dashboardPage = (req, res, next) => {};

module.exports = {
  homePage,
  dashboardPage,
};
