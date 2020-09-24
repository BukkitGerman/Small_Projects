Array.prototype.groupBy = function (kfn) {
	return this.reduce(function(rv, x) {
		(rv[kfn(x)] = rv[kfn(x)] || []).push(x);
		return rv;
	}, {});
};

Array.prototype.chunk = function(chunkSize) {
	var array = this;
	return [].concat.apply([],
		array.map(function(elem, i) {
			return i % chunkSize ? [] : [array.slice(i, i + chunkSize)];
		})
	);
}

Object.prototype.map = function(mapFn) {
	let that = this
	return Object.keys(this).reduce(function(result, key) {
		if(typeof mapFn == "function"){
			result[key] = mapFn(that[key])
			return result
		}else{
			//console.log("map mapfn bullshit", mapFn)
		}
	}, {})
}

var uptime

var result = []

fetch('stats.csv')
.then(response => response.text())
.then(resolve => {
	let status = resolve
		.split('\r')
		.join("")
		.split('\n')
		.join(",")
		.split(",");

	let colors = []
	let online = [];
	let time = [];

	uptime = status
		.chunk(2)
		.groupBy(v => v[0])
		.map(time => time.map(entry => entry[1] == "online")
		.map(v => v+0))
		//.chunk(24)
		//.values()


	uptime.map(x => {
		var count = 0;
		for(var i = 0; i < x.length; i++){
			count += x[i];
		}
		x.unshift((count/x.length)*100)
		x.splice(1, (x.length-1)) 
	})

	count = 0;
	uptime.map(_ => {
		time.push(Object.keys(uptime)[count])
		online.push(_[0])
		count++;
	})


	online.forEach(values => {

			if (values <= 30)
				colors.push("#bd3232");
			if (values <= 50 && values > 30)
				colors.push("#bd5532");
			if (values <= 70 && values > 50)
				colors.push("#bd7832");
			if (values <= 80 && values > 70)
				colors.push("#bd9b32");
			if (values <= 90 && values > 80)
				colors.push("#bdbd32");
			if (values <= 92 && values > 90)
				colors.push("#9bbd32");
			if (values <= 94 && values > 92)
				colors.push("#78bd32");
			if (values <= 96 && values > 94)
				colors.push("#55bd32");
			if (values <= 98 && values > 96)
				colors.push("#44bd32");
			if (values <= 100 && values > 98)
				colors.push("#32bd32");
	})

	console.log(colors)

	var ctx = document.getElementById('myChart').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: time,	
			datasets: [{
				barPercentage: 0.5,
				backgroundColor: colors,
				barThickness: 6,
				maxBarThickness: 8,
				minBarLength: 2,
				data: online
			}]
		},
		options: {
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true
					}
				}]
			}
		},
	});
})