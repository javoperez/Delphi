
/**
 * Module dependencies.
 */
var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var Mincer  = require('mincer');
var tcp = require('net');
var fs = require('fs');
var models = require("./models");
var gcm = require('node-gcm');

var app = express();

app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

// development only
var environment = new Mincer.Environment();
environment.appendPath('assets/javascripts');
environment.appendPath('assets/stylesheets');
environment.appendPath('public/javascripts');
environment.appendPath('node_modules/jquery/tmp');
environment.appendPath('node_modules/highcharts-client/lib');
environment.appendPath('node_modules/socket.io-client/dist');
environment.appendPath('node_modules/foundation/scss');

//debug

if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.use("/assets",Mincer.createServer(environment));
 
 app.get('/', function(req, res) {
        var body = fs.readFileSync('./browser/browser.html')

        res.setHeader('Content-Type', 'text/html')
        res.setHeader('Content-Length', body.length)
        res.end(body)
});

app.get('/second', routes.index);

app.get('/static/:static', function(req, res) {
        if(!fs.existsSync('./browser/static/'+req.params['static']))
        {
                res.end('404')
                return
        }
        var body = fs.readFileSync('./browser/static/'+req.params['static'])
        res.setHeader('Content-Type', 'text/javascript')
        res.setHeader('Content-Length', body.length)
        res.end(body)
});

app.get('/temperatura',routes.temperatura);
app.post('/temperatura',routes.temperaturar);
app.get('/oxigeno',routes.oxigeno);
app.post('/voltaje',routes.voltaje);

db.sequelize.sync().complete(function  (err) {
	if (err) {
		throw err
	}else{
		var io = require('socket.io').listen(app.listen(app.get('port'),function  () {
		        console.log('Express y io en el puerto: ' + app.get('port'));
		        global.socket = io;
		}));

		client_socket = null
		io.sockets.on('connection', function (socket) {
			client_socket = socket;

			socket.on('temperatura', function(data) {
				var temp = data['temperatura'];
				global.db.Temperatura.findAll().success(function(projects) {
					for (var i = 0; i < projects.length; i++) {
						projects[i].destroy();
					};
					global.db.Temperatura.build({nivel:temp}).save();	
				});
			});
			socket.on('oximetro', function(data) {
				var oxi = data['oximetro'];
				global.db.Oxigeno.findAll().success(function(projects) {
					for (var i = 0; i < projects.length; i++) {
						projects[i].destroy();
					};
					global.db.Oxigeno.build({nivel:oxi}).save();	
				});
			});
			socket.on('alarma', function(data) {
				var message = new gcm.Message({
				    collapseKey: 'demo',
				    delayWhileIdle: true,
				    timeToLive: 3,
				    data: {
				        key1: 'message1',
				        key2: 'message2'
				    }	
				});
				var sender = new gcm.Sender('AIzaSyDvQ_HeLGkBIo8MURp5zBYneorrWtuMzgM');
				var registrationIds = [];	
				registrationIds.push('APA91bFH-J3CleJ3dQhzUVhcvhqcj4UlUVKQhCxcinj5aBN2IX0G-kwpB_H3R0a5GoJSSTE5yTyhnv3iRiUdZmFS4Qp6SrddqE1F3hpyyqHyIor5s0tioTV3qvTqYtsEBk4V0vsQUfv5QFDoKhe2sHNbvtHtl9sLbg');
				sender.send(message, registrationIds, 4, function (err, result) {
				    console.log(result);
				});
			});
		});

		var daq_server = tcp.createServer(function(socket) {
		        socket.on('data', function(data) {
		        if(client_socket == null)
		                        return
		                io.sockets.emit('data', {'data': data.toString()})
		        })
		        socket.on('error', function(error) {
		        })
		        socket.pipe(socket)
		});
		daq_server.listen('8090');
	}
});