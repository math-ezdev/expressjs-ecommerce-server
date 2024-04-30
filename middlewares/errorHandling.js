var createError = require("http-errors");

// catch 404 and forward to error handler
function catchNotFound(req, res, next) {
  next(createError(404));
}

const getErrorView = (statusCode) => {
  if (statusCode === 404) {
    return "pages/errors/404";
  }

  if (statusCode >= 400 || statusCode <= 499) {
    return "pages/errors/4xx";
  }

  return "pages/errors/5xx";
};

// error handler
function errorHandler(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  res.locals.title = "Error";

  const isApiRequest = req.originalUrl.startsWith("/api");
  console.log(`isApiRequest::: ${isApiRequest}`);
  if (isApiRequest) {
    return res.apiError(err);
  }

  // render the error page
  const statusCode = err.status || 500;
  var errorView = getErrorView(statusCode);
  res.status(statusCode);
  res.render(errorView, { layout: "layouts/empty" });
}

module.exports = { catchNotFound, errorHandler };
