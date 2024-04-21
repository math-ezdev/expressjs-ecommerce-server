const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  email: { type: String, unique: true },
  password: { type: String },
});

UserSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

const UserModel = model("user", UserSchema);

module.exports = { UserModel };
