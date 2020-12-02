Array.prototype.last = function(v){
	while(this.length > v){
		this.shift();
	}
	return this;
}



var express = require('express');
var socket = require('socket.io');
const { Client } = require('pg');

const client = new Client();

var app = express();
var server = app.listen(4100, () => {
	console.log("Server ist now running!");
	client.connect();
});

var io = socket(server);

app.use(express.static('public'));

io.sockets.on('connection', (socket) => {
	socket.on('disconnect', function() {
		console.log('[INFO] '+socket.id+' disconnect!');
	})

	socket.on('getdata', (data) => {
		console.log("[INFO] Recieve (getdata) from " + socket.id);
		fetch_database(data.interval, socket.id, data.hour);
	});



function fetch_database(interval, id, hour = false){
	let t = 18;
	const query =  `
					SELECT *
					FROM ts3_data;
					`;

	if(hour){
		t = 18
	}else{
		t = 15
	}
		client.query(query, (err, res) => {
			if (err) {
				console.log(err);
				client.end();
				return;
			}
			let prevRow = null;
			let res_data = [];
			let online = 0;
			let count = 0;
			let time = "";
			let usercount = 0;
			for(let row of res.rows){
				if(prevRow != null){
					if(row.id != res.rows.length){
						if((row.created_at).toString().substring(0, t) == (prevRow.created_at).toString().substring(0, t)){
							if(prevRow.server_online_state == "online"){
								online++
							}
							usercount += prevRow.server_user_count;
							count++;
						}else if(((row.created_at).toString().substring(0, t) != (prevRow.created_at).toString().substring(0, t))){
							res_data.push({
								server_online_state: (online/count),
								server_user_count: (usercount/count),
								server_timestamp: (prevRow.created_at).toString().substring(0, t)
							})

							online = 0;
							count = 0;
							time = "";
							usercount = 0;
						}
					}else{
						res_data.push({
								server_online_state: (online/count),
								server_user_count: (usercount/count),
								server_timestamp: (prevRow.created_at).toString().substring(0, t)
							})
					}
				}
				prevRow = row;
			}
			console.log({data: res_data.last(interval), hour: hour})
			io.sockets.to(id).emit('send_data', res_data.last(interval));
		});

}

})