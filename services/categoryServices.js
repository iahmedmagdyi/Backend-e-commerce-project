const categoryModel = require("../models/categryModel");

const factory = require("./handlerFactory");
//access  puplic
// desc    get ist of category
//route     Get api/v1/categories
//pagination
exports.getCategories = factory.getAll(categoryModel);
//desc  get spasific cateory  by id
//route  Get api/vi/categories/:id
//access  public
exports.getCategory = factory.getOne(categoryModel);

//desc    updates spasific category
//route    put  api/vi/categories/:id
//access   private
exports.updateCategory = factory.updateOne(categoryModel);

//desc    Delete spasific category
//route    Delete  api/vi/categories/:id
//access   private

exports.deleteCategories = factory.deleteOne(categoryModel);

//access  private
// desc   Create category
//route   Post api/v1/categories
exports.createCategory = factory.createOne(categoryModel);
