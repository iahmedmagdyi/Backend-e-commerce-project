const productModel = require("../models/productModel");

const factory = require("./handlerFactory");

//access  puplic
// desc    get ist of product
//route     Get api/v1/prodicts
//pagination
exports.getProducts = factory.getAll(productModel, "product");
//desc  get spasific product  by id
//route  Get api/vi/products/:id
//access  public
exports.getProduct = factory.getOne(productModel);

//desc    updates spasific product
//route    put  api/vi/products/:id
//access   private
exports.updateProduct = factory.updateOne(productModel);

//desc    Delete spasific category
//route    Delete  api/vi/categories/:id
//access   private

exports.deleteProduct = factory.deleteOne(productModel);

//access  private
// desc   Create product
//route   Post api/v1/categories
exports.createProduct = factory.createOne(productModel);
