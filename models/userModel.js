const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name required"],
      trim: true,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      trim: true,
    },
    phone: String,
    profileImg: String,
    password: {
      type: String,

      minLength: [6, "password is too short"],
    },
    passwordChangedAt: Date,
    role: {
      type: String,

      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timeseries: true }
);
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

module.exports = mongoose.model("User", userSchema);
