const mongoose = require("mongoose");

const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "sub category required"],
      unique: [true, "sub category must be unique"],
      minLength: [3, " too short "],
      maxLength: [32, "too long"],
    },
    slug: {
      type: String,
      lowerCase: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
      required: [true, "sub category must belong to parent category"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("subCategory", subCategorySchema);
