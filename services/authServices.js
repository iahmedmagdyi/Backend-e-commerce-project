const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const ApiError = require("../utility/ApiError");

exports.signup = asyncHandler(async (req, res, next) => {
  //create user
  const user = await userModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  //gnerate token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  res.status(201).json({ data: user, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  //check email w password that exists
  const user = await userModel.findOne({ email: req.body.email });

  if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
    return next(new ApiError("email or password incorrect", 401));
  }
  //create token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });
  //send request

  res.status(201).json({ data: user, token });
});

exports.protect = asyncHandler(async (req, res, next) => {
  //get token and hold it   and check if exists
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    return next(
      new ApiError(404, "you are not login please login to get access")
    );
  }
  //check token( no change in password , expires)
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  //check if user exists;
  const currentUser = await userModel.findById(decoded.userId);
  if (!currentUser) {
    return next(
      new ApiError(
        404,
        "this user that belongs to this tokenn no longer exists"
      )
    );
  }
  //check if user change password after token created

  if (currentUser.passwordChangedAt) {
    const passChangedTimeStamp = parseInt(
      currentUser.passwordChangedAt.getTime() / 1000,
      10
    );
    if (passChangedTimeStamp > decoded.iat) {
      return next(
        new ApiError(404, "user recentely changed his password please login ")
      );
    }
  }
  req.user = currentUser;
  next();
});
