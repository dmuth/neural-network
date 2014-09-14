var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
if (process.env.NODE_ENV) {
	app.use(logger('combined'));
} else {
	app.use(logger('dev'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
	secret: 'to the moon',
	resave: true,
	saveUninitialized: true,
	}))



/*
TODO: 

- X put colors in main page
- X CSS with colors
- X figure out forms in Express, how to handle submissions?
- X create form is "is this color red?"
- X figure out how to manipulate session data
- load lib/nn/
	- should return an object
		- add(r, g, b)
		- length() - return number of pieces of training data
		- train()
			- create new brain object and train
		- guess()
- conditionally display train button, otherwise require 5 pieces of training data
- /guess endpoint that shows like 10 small boxes, and guesses
- look into csrf module to require a visit to the page itself
	- csurf module?
*/

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
