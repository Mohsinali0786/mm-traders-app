const mongoose = require("mongoose");
const { Schema } = mongoose;
const productCategorySchemaModel = new Schema(
  {
    categoryName: String,
  },
  {
    timestamps: true,
  },
);
module.exports = mongoose.model("productCategory", productCategorySchemaModel);
