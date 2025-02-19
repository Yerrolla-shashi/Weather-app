var express=require("express");
var app=express();
var favicon=requuire('serve-fevicon');
var logger=require('morgan');

var path=require("path");
var parser=require("body-parser");
var index=require('./routes1/index');
var users=require('./routes1/user');


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/',index)
app.use('/users',users)


app.use(function(req,res,next){
    var err =new Error('new error');
    err.status=404;
    next(err);
})
app.use(function(err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    res.status(err.status || 500);
    res.render('error');
  });
  
  module.exports = app;