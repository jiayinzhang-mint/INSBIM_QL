import createError from "http-errors"
import express from "express"
import path from "path"
import cookieParser from "cookie-parser"
import logger from "morgan"
import bodyParser from "body-parser"

// mongoDB
import { connect, connection } from "mongoose";
import mongoConfig from "./config/mongoose"
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

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// router
import indexRouter from "./routes/index"
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(bodyParser.urlencoded({ extended: true }));

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;