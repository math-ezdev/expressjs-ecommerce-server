const { Schema, model } = require("mongoose");
const ObjectId = Schema.Types.ObjectId;

const BrandSchema = new Schema({
  name: { type: String, unique: true },
  description: { type: String },
  logo: { type: String, default: "brand.png" },
});

const BrandModel = model("brand", BrandSchema);

module.exports = { BrandModel };
