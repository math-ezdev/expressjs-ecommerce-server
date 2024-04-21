const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { UserModel } = require("../models/user");

const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = process.env;

const verifyUser = async (user) => {
  const { email, password } = user;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw createError.NotFound(`${email} not found!`);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw createError.Unauthorized(`Password is not correct!`);
    }

    return user;
  } catch (error) {
    throw error;
  }
};

const authenticateUser = async (req, res, next) => {
  try {
    req.verifiedUser = await verifyUser(req.validatedUser);
    console.log(`req.verifiedUser::: ${JSON.stringify(req.verifiedUser)}`);

    next();
  } catch (error) {
    next(error);
  }
};

const generateToken = (payload, isRefreshToken = false) => {
  const secretKey = isRefreshToken ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET;

  const tokenOptions = isRefreshToken
    ? { expiresIn: "7d" }
    : { expiresIn: "15s" };

  return jwt.sign(payload, secretKey, tokenOptions);
};

function extractToken(req, secretKey) {
  if (secretKey === ACCESS_TOKEN_SECRET) {
    const authHeader = req.headers["authorization"];
    // const token = authHeader && authHeader.split(" ")[1];
    if (authHeader) {
      const [, token] = authHeader.split(" ");
      return token;
    }
  } else {
    return req.body.token;
  }
  return undefined;
}

const verifyToken = (token, secretKey) => {
  try {
    const payload = jwt.verify(token, secretKey);
    return payload;
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw createError.Unauthorized("Token expired!");
    } else {
      throw createError.Forbidden("Invalid token!");
    }
  }
};

const authenticateToken = (secretKey = ACCESS_TOKEN_SECRET) => {
  return (req, res, next) => {
    const token = extractToken(req, secretKey);

    if (!token) {
      return next(createError.Unauthorized("No token provided!"));
    }

    try {
      req.user = verifyToken(token, secretKey);
      console.log(`req.user::: ${JSON.stringify(req.user)}`);

      next();
    } catch (error) {
      next(error);
    }
  };
};
module.exports = {
  verifyUser,
  authenticateUser,
  generateToken,
  authenticateToken,
};
