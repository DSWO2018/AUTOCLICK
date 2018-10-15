var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

mongoose.connect('mongodb://localhost:27017/shopping', {useNewUrlParser: true});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized : false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180*60*100}
}));
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
