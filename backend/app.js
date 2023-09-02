const express = require("express");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
// Start express app
const userRouter = require("./routes/userRoutes");
const uploadRouter = require("./routes/uploadRoutes");
const bikeRouter = require("./routes/bikeRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter = require("./routes/commentRoutes");
const app = express();

// app.enable('trust proxy');

// 1) GLOBAL MIDDLEWARES
// Implement CORS
app.use(
  cors({
    origin: "*",
  })
);

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Stripe webhook, BEFORE body-parser, because stripe needs the body as stream
// app.post(
//   "/webhook-checkout",
//   bodyParser.raw({ type: "application/json" }),
//   bookingController.webhookCheckout
// );

// Body parser, reading data from body into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// 3) ROUTES
app.use("/api/v1/uploads", uploadRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/bikes", bikeRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);
// app.use("/api/v1/reviews", reviewRouter);
// app.use("/api/v1/bookings", bookingRouter);

// app.all("*", (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);

module.exports = app;
