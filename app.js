var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var async = require('async');
var routes = require('./routes/index');
//var WebSocketServer = require('websocket').server;
var socketio = require('socket.io');


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
/*async.waterfall([
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
 ]);*/
//app.use('/users', users);
//设置跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

routes(app);
//Test(app);

var server = http.createServer(app);
server.listen(app.get('port'));

server.on('listening', function () {
    console.log('-----listening on port' + app.get('port') + '------');
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

/*wsServer = new WebSocketServer({
    httpServer: server
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    //autoAcceptConnections: true
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function (request) {
    console.log(666);
   /!* if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
       // console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }*!/

    var connection = request.accept('echo-protocol', true);
    //console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function (message) {
        console.log(messgae);
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            connection.sendUTF(message.utf8Data);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function (reasonCode, description) {
        //console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});*/
var clients = {};
var io = socketio.listen(server);
io.on('connection', function(socket) {
    socket.on('message', function (msg) {
        console.log('Message Received: ', msg);
        //io.send(111);
    });
    socket.on("disconnect", function(name) {
        console.log("Server has disconnected");
        delete clients[name];
    });

    socket.on('new user',function(data){
        var nickname = data;
        clients[nickname]= socket;
        io.emit('chat message', data+'加入聊天室');
    });

    socket.on('chat message', function(data) {
        if(data.to){
            if(data.to in clients){
                clients[data.to].emit('to'+data.to,{mess:data.msg});
            }
        }else{
            io.emit('chat message', data);
        }
    })

});




