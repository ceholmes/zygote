
// module dependencies.
var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var handlebars = require('express3-handlebars');
var routes = require('./app/routes');

// create app
var app = express();
app.set('port', process.env.PORT || 3000);

// view engine
//app.engine('handlebars', handlebars({defaultLayout: 'main'}));
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'handlebars');

// middleware
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
//app.get('/', routes.index);

// create server
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});