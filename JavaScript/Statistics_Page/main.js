

fetch('stats.csv')
.then(response => response.text())
.then(resolve => {
	let status = resolve.split('\n').join(",").split(",");
	let online = [];
	let time = [];
	status.forEach(item => {
		if(item === "online" || item === "offline"){
			if(item === "online"){
				online.push(1);
			}else{
				online.push(0);
			}
			
		}else{
			time.push(item);
		}
	})

	var ctx = document.getElementById('myChart').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: time,
			datasets: [{
				label: '# of Votes',
				data: online,
				backgroundColor: ["#4cd137"],
				borderColor: ["#44bd32"],
				borderWidth: 1,
				fill: false
			}]
		},
	});
})