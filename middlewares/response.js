function sendResponse(res, statusCode, success, message, data, error) {
  const responseBody = { success, message, data, error };
  res.status(statusCode).json(responseBody);
}

function apiSuccess(res, data, message = "Task successful.", statusCode = 200) {
  sendResponse(res, statusCode, true, message, data, null);
}

function apiError(res, error) {
  const statusCode = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";
  sendResponse(res, statusCode, false, errorMessage, null, error);
}

function respond(req, res, next) {
  res.apiSuccess = (data, message, statusCode) =>
    apiSuccess(res, data, message, statusCode);
  res.apiError = (error) => apiError(res, error);
  next();
}

module.exports = { respond };
