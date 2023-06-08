const slugify = require("slugify");
const { check } = require("express-validator");
const validatorMiddleWare = require("../../middlewares/validatorMiddleWare");

exports.getBrandValidator = [check("id").isMongoId(), validatorMiddleWare];

exports.createBrandValidator = [
  check("name")
    .notEmpty()
    .isLength({ min: 3 })
    .withMessage("too short category")
    .isLength({ max: 32 })
    .withMessage("too long category").custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  validatorMiddleWare,
];

exports.updateBrandValidator = [
  check("id").isMongoId(),
  check("name").custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),

  validatorMiddleWare,
];

exports.deleteBrandValidator = [check("id").isMongoId(), validatorMiddleWare];
