var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const axios = require('axios')
const token = require('./token.json')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res, next) => {
  res.sendFile(__dirname + "/public/html/index.html");
});

app.post('/s', (req, res) => {
  market.get(`/items/${req.body.item}/orders`)
    .then(resp => {
      res.end(JSON.stringify(resp.data));
    })
    .catch(err => {
      res.end(false)
    })
})

app.use('/users', usersRouter);

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

const market = axios.create({
  baseURL: "https://api.warframe.market/v1",
  timeout: 5000,
  headers: {
    "content-type": "application/json",
    "accept": "application/json",
    "platform": "pc",
    "language": "en",
  }
})