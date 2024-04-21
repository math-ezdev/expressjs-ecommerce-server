const joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const noWhitespace = (value, helpers) => {
  if (value.match(/\s/)) {
    return helpers.error("any.invalid", {
      message: '"password" cannot contain any whitespace',
    });
  }
  return value;
};

const UserValidationSchema = joi.object({
  email: joi.string().trim().lowercase().email().required(),
  password: passwordComplexity().trim().custom(noWhitespace).required(),
});

const validateUser = (user) => {
  return UserValidationSchema.validate(user);
};

const processUserValidation = (req, res, next) => {
  const { error } = validateUser(req.body);

  if (error) {
    return next(error);
  }

  req.validatedUser = req.body;
  console.log(`req.validatedUser::: ${JSON.stringify(req.validatedUser)}`)
  next();
};

module.exports = {
  processUserValidation,
};
