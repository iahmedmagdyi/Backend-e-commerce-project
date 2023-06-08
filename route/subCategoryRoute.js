const express = require("express");

const {
  createSubCategory,
  getSubCategories,
  getSubCategory,
  deleteSubCategories,
  updateSubCategory,
  createFiterObect,

  setsubcategoryIdToBody,
} = require("../services/subCategoryServices");
const {
  createSubCategoryValidator,
  getSubCategoryValidator,
  updateSubCategoryValidator,
  deleteSubCategoryValidator,
} = require("../utility/validators/subCategoryValidator");
//mergeparams 3lshan access all params
//we nned to access categoryId from category router
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .post(setsubcategoryIdToBody, createSubCategoryValidator, createSubCategory)
  .get(createFiterObect, getSubCategories);

router
  .route("/:id")
  .get(getSubCategoryValidator, getSubCategory)
  .put(updateSubCategoryValidator, updateSubCategory)
  .delete(deleteSubCategoryValidator, deleteSubCategories);

module.exports = router;
