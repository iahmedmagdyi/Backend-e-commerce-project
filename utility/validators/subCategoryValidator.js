const slugify = require("slugify");
const { check } = require("express-validator");
const validatorMiddleWare = require("../../middlewares/validatorMiddleWare");

exports.getSubCategoryValidator = [
  check("id").isMongoId(),
  validatorMiddleWare,
];

exports.createSubCategoryValidator = [
  check("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("too short Subcategory")
    .isLength({ max: 32 })
    .withMessage("too long Subcategory")
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check("category")
    .notEmpty()
    .withMessage("sub category must belonng to the parent")
    .isMongoId()
    .withMessage("innvalied cateory"),
  validatorMiddleWare,
];

exports.updateSubCategoryValidator = [
  check("id").isMongoId(),
  check("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),
  validatorMiddleWare,
];

exports.deleteSubCategoryValidator = [
  check("id").isMongoId(),
  validatorMiddleWare,
];
