const mongoose = require("mongoose");

//create schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "category required"],
      unique: [true, "category must be unique"],
      minLength: [3, "too short  category name"],
      maxLength: [32, "too long category name"],
    },

    // A and B shopping.com/a-and-b
    slug: {
      type: String,
      lowerCase: true,
    },
    image: String,
  },
  { timestamps: true }
);

//create model
const categoryModel = mongoose.model("Category", categorySchema);

module.exports = categoryModel;
