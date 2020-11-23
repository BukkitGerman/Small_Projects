var express = require('express');
var socket = require('socket.io');
const { Client } = require('pg');

const client = new Client();

var app = express();
var server = app.listen(4100, () => {
	console.log("Server ist now running!");
	
});

var io = socket(server);

app.use(express.static('public'));

io.sockets.on('connection', (socket) => {

	socket.on('disconnect', function() {
		console.log('[INFO] '+socket.id+' disconnect!');
	})

	socket.on('getdata', (data) => {
		console.log("[INFO] Recieve (getdata) from " + socket.id);
		var db_data = fetch_database();
	});



function fetch_database(){
	client.connect();
	const query =  `
					SELECT *
					FROM ts3_data;
					`;

	client.query(query, (err, res) => {
		if (err) {
			console.log(err);
			return;
		}
		for(let row of res.rows){
			console.log(row)
		}
		client.end();
	});

}

})