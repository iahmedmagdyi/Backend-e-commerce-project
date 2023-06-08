const brandModel = require("../models/brandModel");

const factory = require("./handlerFactory");

//access  puplic
// desc    get ist of category
//route     Get api/v1/brands
//pagination
exports.getBrands = factory.getAll(brandModel);
//desc  get spasific cateory  by id
//route  Get api/vi/brands/:id
//access  public
exports.getBrand = factory.getOne(brandModel);
//desc    updates spasific category
//route    put  api/vi/categories/:id
//access   private
exports.updateBrand = factory.updateOne(brandModel);

//desc    Delete spasific category
//route    Delete  api/vi/categories/:id
//access   private
exports.deleteBrand = factory.deleteOne(brandModel);

//access  private
// desc   Create category
//route   Post api/v1/categories
exports.createBrand = factory.createOne(brandModel);
