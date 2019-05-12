import createError from "http-errors";
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";

// mongoDB
import { connect, connection } from "mongoose";
import mongoConfig from "./config/mongoose";
connect(
  mongoConfig,
  { useNewUrlParser: true, useFindAndModify: false }
);
const db = connection;
db.on("open", () => {
  console.log("MongoDB Connection Success");
});
db.on("error", () => {
  console.log("MongoDB Connection Error");
});

// auth
import "./config/passport";

var app = express();

app.use(logger("dev"));
app.use((req, res, next) => {
  res.header("Content-Type", "application/json");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// router
import indexRouter from "./routes/index";
import userRouter from "./routes/user";
import blockRouter from "./routes/block";
import storeyRouter from "./routes/storey";
import loraController from "./routes/lora";
import nodeController from "./routes/node"
import gatewayRouter from "./routes/gateway";

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/block", blockRouter);
app.use("/storey", storeyRouter);
app.use("/lora", loraController);
app.use("/node", nodeController);
app.use("/gateway", gatewayRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
