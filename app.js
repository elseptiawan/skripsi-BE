require('dotenv').config();
var express = require('express');
const cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var categoriesRouter = require('./routes/categories');
var restoransRouter = require('./routes/restorans');
var importRouter = require('./routes/import');
var analisisRouter = require('./routes/analisis');
var exportRouter = require('./routes/export');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/restorans', restoransRouter);
app.use('/import', importRouter);
app.use('/analisis', analisisRouter);
app.use('/export', exportRouter);

module.exports = app;
