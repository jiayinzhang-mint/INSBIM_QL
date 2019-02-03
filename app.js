var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require("body-parser");

var indexRouter = require('./routes/index');

var app = express();

// mongoose
const mongoose = require("mongoose");

// const configDev = [];
// configDev.usr = "mint";
// configDev.pwd = "INSCHINAisdead1";
// const url = `mongodb://${configDev.usr}:${configDev.pwd}@39.96.61.110/INSLENS`;
const urlBase = 'mongodb://127.0.0.1/INSBIM'

mongoose.connect(
  urlBase,
  { useNewUrlParser: true, useFindAndModify: false }
);
const db = mongoose.connection;
db.on("open", () => {
  console.log("MongoDB Connection Success");
});
db.on("error", () => {
  console.log("MongoDB Connection Error");
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
