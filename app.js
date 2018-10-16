var createError = require('http-errors');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var mongoose = require('mongoose');
var express = require('express');
var path = require('path');
var http = require ('http');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var expressHbs = require('express-handlebars');

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/autoclick';
var theport =process.env.PORT || 7842;

var app = express();
//mongoose.connect('mongodb://Ventas:ventas123@ds231723.mlab.com:31723/carritousuarios');
MONGOLAB_URI = "mongodb://Ventas:ventas123@ds231723.mlab.com:31723/carritousuarios";
mongoose.connect('mongodb://user:admin123@ds231723.mlab.com:31723/carritousuarios', { useNewUrlParser: true },function(err,res){
    if(err){
        console.log('Error connecting to: '+uristring+'. '+err);
    }else{
        console.log('Succeded connecting to: '+uristring)
    }
})
app.engine('.hbs', expressHbs({defaultLayout: 'layout', extname: '.hbs'}));
app.set('view engine', '.hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'mysupersecret',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({mongooseConnection: mongoose.connection}),
    cookie: {maxAge: 180 * 60 * 100}
}));
app.use(function (req, res, next) {
    res.locals.session = req.session;
    next();
});

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
