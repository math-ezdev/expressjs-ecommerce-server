const { Schema, model } = require("mongoose");
const { BrandModel } = require("./brand");
const { CategoryModel } = require("./category");
const ObjectId = Schema.Types.ObjectId;

// product
const ProductSchema = new Schema({
  name: { type: String },
  description: { type: String },
  price: { type: Number },
  images: [{ type: String, default: "product.png" }],
  specifications: [
    {
      label: {
        type: String,
      },
      content: {
        type: String,
      },
    },
  ],
  variants: [
    {
      color: String,
      size: String,
      image: String,
      price_adjustment: Number,
      stock: Number,
    },
  ],
  category_id: {
    type: ObjectId,
    ref: CategoryModel.modelName,
  },
  brand_id: {
    type: ObjectId,
    ref: BrandModel.modelName,
  },
});

const ProductModel = model("product", ProductSchema);

module.exports = { ProductModel };
