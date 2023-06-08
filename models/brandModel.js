const mongoose = require("mongoose");

//create schema
const brandSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "brand required"],
      unique: [true, "brand must be unique"],
      minLength: [3, "too short  brand name"],
      maxLength: [32, "too long brand name"],
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
const brandModel = mongoose.model("brand", brandSchema);

module.exports = brandModel;
