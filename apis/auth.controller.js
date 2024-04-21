const createError = require("http-errors");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user");
const { generateToken } = require("../middlewares/apiAuth");

const register = async (req, res, next) => {
  try {
    const user = req.validatedUser;

    const newUser = new UserModel(user);
    await newUser.save();

    res.apiSuccess(newUser, "Registration successful.", 201);
  } catch (error) {
     next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const user = req.verifiedUser;

    const accessToken = generateToken({ id: user.id, email: user.email });
    const refreshToken = generateToken(
      { id: user.id, email: user.email },
      true
    );

    res.apiSuccess({ accessToken, refreshToken }, "Login successful.");
  } catch (error) {
     next(error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const user = req.user;
    const accessToken = generateToken({
      id: user.id,
      email: user.email,
    });
    res.apiSuccess({ accessToken }, "Refresh token successful.");
  } catch (error) {
     next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.apiSuccess(
      "Please clean up the refresh token stored on the user side."
    );
  } catch (error) {
     next(error);
  }
};

module.exports = { register, login, refreshToken, logout };
