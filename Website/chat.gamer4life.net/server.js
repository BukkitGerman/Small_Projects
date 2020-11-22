var express = require('express');
var socket = require('socket.io');

var app = express();
var array_users = [];
var users = {};
var server = app.listen(4000, () => {
	console.log("Server ist now running!");
	
});

var io = socket(server);

app.use(express.static('public'));




io.sockets.on('connection', (socket) => {
	console.log('new connection => ' + socket.id);
	array_users.push(socket.id);
	var color = random_hex_color_code();
	io.sockets.emit('users', Object.assign({}, array_users))

	socket.on('disconnect', function() {
		console.log('[INFO] '+socket.id+' disconnect!');
		var i = array_users.indexOf(socket);
      	array_users.splice(i, 1);
      	io.sockets.emit('users', Object.assign({}, array_users))
	})

	socket.on('msg', (data) => {
		console.log("[INFO] Recieve " + data.text + " from " + socket.id);
		data.color = color;
		socket.broadcast.emit('msg', data);
	});

	
})

const random_hex_color_code = () => {
  let n = (Math.random() * 0xfffff * 1000000).toString(16);
  return '#' + n.slice(0, 6);
};