const accessProtectedResource = async (req, res, next) => {
  try {
    const user = req.user;
    res.apiSuccess(user, "Accessed protected resource.");
  } catch (error) {
    next(error);
  }
};

module.exports = { accessProtectedResource };
