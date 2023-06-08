const subCategoryModel = require("../models/subCategoryModel");

const factory = require("./handlerFactory");
//nested route
exports.setsubcategoryIdToBody = (req, res, next) => {
  if (!req.body.category) {
    req.body.category = req.params.categoryId;
  }
  next();
};

//nested routes
//get api/v1/categories/:categoryId/subcategory
exports.createFiterObect = (req, res, next) => {
  let filterObject = {};

  if (!req.params.categoryId) {
    filterObject = { category: req.params.categoryId };
  }
  req.filterObj = filterObject;
  next();
};

//access  private
// desc   Create subcategory
//route   Post api/v1/subcategoriess
exports.createSubCategory = factory.createOne(subCategoryModel);
//access  puplic
// desc    get ist of category
//route     Get api/v1/categories
//pagination
exports.getSubCategories = factory.getAll(subCategoryModel);

//desc  get spasific cateory  by id
//route  Get api/vi/categories/:id
//access  public
exports.getSubCategory = factory.getOne(subCategoryModel);

//desc    updates spasific category
//route    put  api/vi/categories/:id
//access   private
exports.updateSubCategory = factory.updateOne(subCategoryModel);
//desc    Delete spasific subcategory
//route    Delete  api/vi/subcategories/:id
//access   private

exports.deleteSubCategories = factory.deleteOne(subCategoryModel);
