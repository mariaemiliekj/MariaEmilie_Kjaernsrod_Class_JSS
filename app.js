var createError = require('http-errors');
var express = require('express');
var session = require('express-session');
var passport = require('passport');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var JsonStore = require("express-session-json")(session);


var indexRouter = require('./routes/index');
var memesRouter = require('./routes/memes');
var memeRouter = require('./routes/meme');
var loginRouter = require('./routes/login');
// var highlightsRouter = require('./routes/highlights');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist'));
app.use(express.static(__dirname + "/node_modules/jquery/dist/"));


app.use(session({
  secret: 'secret key',
  resave: false,
  saveUninitialized: false,
  store: new JsonStore(),
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(function(req, res, next) {
  res.locals.user = req.user;
  next();
});


app.use('/', indexRouter);
app.use('/memes', memesRouter);
app.use('/meme', memeRouter);
app.use('/login', loginRouter);

// app.use('/highlights', highlightsRouter);


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

