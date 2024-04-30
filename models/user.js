const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;
const bcrypt = require("bcrypt");
const { ProductModel } = require("./product");

const USER_ROLE = ["USER", "MANAGER", "ADMIN"];

const UserSchema = new Schema(
  {
    email: { type: String, unique: true },
    password: { type: String },
    first_name: { type: String },
    last_name: { type: String },

    role: { type: String, default: USER_ROLE[0] },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2013/07/13/12/07/avatar-159236_1280.png",
    },
    phone_number: { type: String },
    addresses: [
      {
        street: String,
        district: String,
        city: String,
        postal_code: String,
        is_default: { type: Boolean, unique: true, default: false },
      },
    ],
    carts: [
      {
        product: { type: ObjectId, ref: ProductModel.modelName },
        quantity: Number,
      },
    ],
  },
  { timestamps: true }
);

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

module.exports = { UserModel, USER_ROLE };
