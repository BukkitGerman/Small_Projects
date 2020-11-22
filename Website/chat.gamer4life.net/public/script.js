const inp = document.querySelector('#inp');
const chat = document.querySelector('#chat');
const el_users = document.querySelector('.users');
var socket;
var color;

window.addEventListener('load', main)
inp.addEventListener('keypress', enterKeyPressed)

function main() {
	console.log("Page loaded!");
	socket = io.connect('http://localhost:4000');
	socket.on('msg', handleMessage)
	socket.on('users', handleUsers)
}

function getColor(data){
	color = data.color
}

function handleMessage(data){
	console.log("recieved data => " + data.text + " |FROM| " + data.id);
	addMessage(data, false);
}

function handleUsers(data){
	el_users.innerHTML = "";
	Object.keys(data).forEach(key => {
  		el_users.innerHTML += "<div class='user'>" + data[key] + "</div>"
	});
}

function enterKeyPressed(event) {
	if (event.keyCode == 13) {
			if(inp.value != ''){
		 	var data = {
		 		id: socket.id,
				text: inp.value
			}
			inp.value = '';
			addMessage(data, true);
			socket.emit('msg', data);
		}
	 return true;
	} else {
	 return false;
	}
}

function addMessage(data, side){
		var txt = ((data.text).replace('<', '').replace('>', ''));
		chat.innerHTML += "<div id='left'><div id='user' style='color: " + data.color + "'>" + data.id + " </div> <div id='sep'>|</div> <div id='text'> " + txt + '</div></div>';
		chat.innerHTML += "<div id='line'></div>";
		window.scrollTo(0,document.body.scrollHeight);
}

