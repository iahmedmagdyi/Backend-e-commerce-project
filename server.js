const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const hpp = require("hpp");
const { rateLimit } = require("express-rate-limit");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

dotenv.config({ path: "config.env" });

const dbConnection = require("./config/database");

const categoryRoute = require("./route/categoryRoute");
const userRoute = require("./route/userRoute");

const authRoute = require("./route/signupRoute");
const subCategoryRoute = require("./route/subCategoryRoute");
const brandRoute = require("./route/brandRoute");
const globalError = require("./middlewares/errormiddleware");
const ApiError = require("./utility/ApiError");
const productRoute = require("./route/productRoute");

//connect with DB

dbConnection();
//express app
const app = express();
//Middlewares

app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: "20kb" }));
if (process.env.NODE_ENV === "develpment") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

// Mount Routes
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/subcategories", subCategoryRoute);
app.use("/api/v1/brands", brandRoute);
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/auth", authRoute);

app.all("*", (req, res, next) => {
  //create error and send it to handeler middleware
  // const err = new Error(`cant read url  ${req.originalUrl}`);
  // next(err.message);
  next(new ApiError(` cant read url  ${req.originalUrl}`, 400));
});
//Global handing error middleware
app.use(globalError);
const PORT = process.env.PORT || 8001;
const server = app.listen(PORT, () => {
  console.log(`APP running on port ${PORT}`);
});

//handling rejection outside expresss
process.on("unhandledRejection", (err) => {
  console.error(`unhandeled errors ${err.name}  ||  ${err.message} `);
  // if there are some requests stil on do it then shut down
  server.close(() => {
    console.error(`shutting down ...... `);
    process.exit(1);
  });
});
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  message:
    "Too many accounts created from this IP, please try again after an hour",
});
app.use("/api", limiter);

app.use(hpp({ whitelist: ["sold", "price", "quantity", "ratingsQuantity"] }));
app.use(mongoSanitize());
app.use(xss());
