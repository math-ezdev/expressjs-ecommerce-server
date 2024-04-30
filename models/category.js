const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const CategorySchema = new Schema({
  name: { type: String, unique: true },
  description: { type: String },
  thumbnail: { type: String, default: "category.png" },
});

const CategoryModel = model("category", CategorySchema);

module.exports = { CategoryModel };
