const express = require("express");
const {
  getCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategories,
} = require("../services/categoryServices");
const {
  getCategoryValidator,
  updateCategoryValidator,
  deleteCategoryValidator,
  createCategoryValidator,
} = require("../utility/validators/cateoryValidator");
const subCategoryRoute = require("./subCategoryRoute");

const router = express.Router();
const authServices = require("../services/authServices");

router.use("/:categoryId/subcategory", subCategoryRoute);
router
  .route("/")
  .get(getCategories)
  .post(authServices.protect, createCategoryValidator, createCategory);
router
  .route("/:id")
  .get(
    getCategoryValidator,

    getCategory
  )
  .put(updateCategoryValidator, updateCategory)
  .delete(deleteCategoryValidator, deleteCategories);
module.exports = router;
