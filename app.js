var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require('async');
var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//加载路由
async.waterfall([
    function (callback) {
        routes(app);
        callback(null);
    },
    function () {
        // catch 404 and forward to error handler
        app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        // error handlers

        // development error handler
        // will print stacktrace
        if (app.get('env') === 'development') {
            app.use(function (err, req, res, next) {
                res.status(err.status || 500);
                res.render('error', {
                    message: err.message,
                    error: err
                });
            });
        }

        // production error handler
        // no stacktraces leaked to user
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: {}
            });
        });
    }
]);
//app.use('/users', users);


/*var server = http.createServer(app);
server.listen(app.get('port'));

server.on('listening', function () {
    console.log('-----listening on port' + app.get('port') + '------');
});*/

var server = app.listen(3000, function() {
    console.log('listening on port %d', server.address().port);
});

server.on('error', function (error) {
    switch (error.code) {
        case 'EACCES':
            console.log('需要权限');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.log('端口已被占用');
            process.exit(1);
            break;
        default:
            throw error;
    }
});




