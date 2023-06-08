const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const userModel = require("../models/userModel");
const factory = require("./handlerFactory");
const { uploadSingleImage } = require("../middlewares/uploadImageMiddleware");
const ApiError = require("../utility/ApiError");

exports.uploadUserImage = uploadSingleImage("profileImg");

exports.resizeImage = asyncHandler(async (req, res, next) => {
  const filename = `user-${uuidv4()}-${Date.now()}.jpeg`;

  if (req.file) {
    // eslint-disable-next-line no-undef
    await sharp(req.file.buffer)
      .resize(600, 600)
      .toFormat("jpeg")
      .jpeg({ quality: 95 })
      .toFile(`uploads/users/${filename}`);

    // Save image into our db
    req.body.profileImg = filename;
  }

  next();
});

//access  puplic
// desc    get ist of category
//route     Get api/v1/brands
//pagination
exports.getUsers = factory.getAll(userModel);
//desc  get spasific user  by id
//route  Get api/vi/user/:id
//access  public
exports.getUser = factory.getOne(userModel);
//desc    updates spasific category
//route    put  api/vi/users/:id
//access   private
exports.updateUser = asyncHandler(async (req, res, next) => {
  const document = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      slug: req.body.slug,
      phone: req.body.phone,
      role: req.body.role,
      profileImg: req.body.profileImg,
      email: req.body.email,
    },
    {
      new: true,
    }
  );
  if (document === "") {
    // res.status(400).json(`no category found by id${id}`);
    return next(new ApiError(`no document found by id${req.params.id}`, 400));
  }
  res.status(200).json({ data: document });
});

exports.changeUserPassword = asyncHandler(async (req, res, next) => {
  const document = await userModel.findByIdAndUpdate(
    req.params.id,
    {
      password: await bcrypt.hash(req.body.password, 12),
      passwordChangedAt : Date.now(),
    },
    {
      new: true,
    }
  );
  if (document === "") {
    // res.status(400).json(`no category found by id${id}`);
    return next(new ApiError(`no document found by id${req.params.id}`, 400));
  }
  res.status(200).json({ data: document });
});
//desc    Delete spasific category
//route    Delete  api/vi/categories/:id
//access   private
exports.deleteUser = factory.deleteOne(userModel);

//access  private
// desc   Create category
//route   Post api/v1/categories
exports.createUser = factory.createOne(userModel);
