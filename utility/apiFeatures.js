class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  fillter() {
    const queryStringObj = { ...this.queryString };
    const feilds = ["page", "limit ", "sort", "fields"];
    feilds.forEach((field) => delete queryStringObj[field]);
    let querystt = JSON.stringify(queryStringObj);
    querystt = querystt.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(querystt));
    return this;
  }

  paginate(countDocuments) {
    const limit = this.queryString.limit * 1 || 50;
    const page = this.queryString.page * 1 || 1;
    const skip = (page - 1) * limit;
    const endIndex = page * limit;
    const pagination = {};
    pagination.limit = limit;
    pagination.currentPage = page;
    pagination.numberOfPages = Math.ceil(countDocuments / limit);
    //Next
    if (endIndex < countDocuments) {
      pagination.next = page + 1;
    }
    //previous
    if (skip > 0) {
      pagination.prev = page - 1;
    }

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    this.paginationResult = pagination;
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      console.log(this.queryString.sort);
      const sortBY = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBY);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-createdAt");
    }
    return this;
  }

  limitFeilds() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join("  ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }
    return this;
  }

  search(modelName) {
    if (this.queryString.keyword) {
      let query = {};
      if (modelName === "product") {
        query.$or = [
          { title: { $regex: this.queryString.keyword, $options: "i" } },
          { description: { $regex: this.queryString.keyword, $options: "i" } },
        ];
      } else {
        query = { name: { $regex: this.queryString.keyword, $options: "i" } };
      }

      this.mongooseQuery = this.mongooseQuery.find(query);
    }
    return this;
  }
}

module.exports = ApiFeatures;
