const asyncHandler = require("express-async-handler");
const ApiError = require("../utility/ApiError");
const ApiFeatures = require("../utility/apiFeatures");
// const ApiFeatures = require("../utility/apiFeatures");

exports.deleteOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findByIdAndDelete(id);
    if (document === "") {
      // res.status(400).json(`no category found by id${id}`);
      return next(new ApiError(`no product found by id${id}`, 400));
    }
    res.status(204).send();
  });

exports.updateOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const document = await model.findOneAndUpdate(req.body.params, req.body, {
      new: true,
    });
    if (document === "") {
      // res.status(400).json(`no category found by id${id}`);
      return next(
        new ApiError(`no document found by id${req.body.params}`, 400)
      );
    }
    res.status(200).json({ data: document });
  });

exports.createOne = (model) =>
  asyncHandler(async (req, res) => {
    const document = await model.create(req.body);
    res.status(201).json({ data: document });
  });

exports.getOne = (model) =>
  asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const document = await model.findById(id);
    if (document === "") {
      // res.status(400).json(`no category found by id${id}`);
      return next(new ApiError(`no document found by id${id}`, 400));
    }
    res.status(200).json({ data: document });
  });

exports.getAll = (model, modelName = " ") =>
  asyncHandler(async (req, res) => {
    let fillter = {};
    if (req.fillterObj) {
      fillter = req.fillterObj;
    }
    const countDocuments = await model.countDocuments();

    // 3-  build query
    const apiFeatures = new ApiFeatures(model.find(fillter), req.query)
      .paginate(countDocuments)
      .search(modelName)
      .fillter()
      .sort()
      .limitFeilds();
    const { mongooseQuery, paginationResult } = apiFeatures;
    const document = await mongooseQuery;
    res.status(200).json({
      results: document.length,
      paginationResult,
      data: document,
    });
  });
