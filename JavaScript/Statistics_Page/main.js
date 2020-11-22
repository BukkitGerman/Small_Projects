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

Array.prototype.SortDays = function(){
	let array = this
	let array2 = []
	let lastitem = null;
	if(((array[array.length-1][0]) == 30 || (array[array.length-1][0]) == 31) && array[0][0] == 1){
		array.forEach((item, ind) => {
			if(lastitem == null){
				lastitem = item[0]
			}else{
				if((Number((lastitem))+1) != (Number(item[0]))){
					for(let i = ind; i < array.length; i++){
						array2.push(array[i])
					}
					array.splice(ind);
					for(let i = 0; i < array.length; i++){
						array2.push(array[i])
					}
				}
			}
			lastitem = item[0]
		})
	}
	return array2
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

Object.prototype.to2d = function() {
	let ary = Object.keys(this).map(k => [k, this[k]])
	return ary.filter(v => v[0] != "undefined")
}

Array.prototype.to3d = function(){
	let obj = {}
	this.forEach(e => obj[e[0]] = e[1])
	return obj
}

Array.prototype.last = function(v){
	while(this.length > v){
		this.shift();
	}
	return this;
}

Object.prototype.values = function() {
	return Object.values(this)
}
Object.prototype.keys = function() {
	return Object.keys(this)
}

var uptime

var result = []

fetch('https://status.gamer4life.net/download/uptime.csv')
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

	online = uptime
		.to2d()
		.map(v => {
			v[0] = v[0].split(":")
			return v
		})
		.groupBy(x => x[0][1])
		.to2d()
		.map(day => {
			day[1] = day[1].map(v => v[1][0])
			return day
		})
		.map(v => {
			v[1] = v[1].reduce((a,b) => (a+b)/2)
			return v
		})
		.to3d()
		

	let sort = []
	for(let index in online){
		if(!isNaN(index)){
			sort.push([index, online[index]])
		}
	}

	sort = sort.SortDays();
	let online_r = []
	let time_r = []
	sort.forEach((item, index) => {
		time_r[index] = sort[index][0]
		online_r[index] = sort[index][1]
	})


	online_r = online_r
		.last(7);
	time_r = time_r
		.last(7);




	online_r.forEach(values => {

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

	var ctx = document.getElementById('uptime').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: time_r,	
			datasets: [{
				label: 'Server Uptime in ∅%',
				barPercentage: 0.5,
				backgroundColor: colors,
				barThickness: 6,
				maxBarThickness: 8,
				minBarLength: 2,
				data: online_r
			}]
		},
		options: {
			legend: {
            	labels: {
                	defaultFontFamily: "'Comic Neue', cursive",		
                	fontColor: 'black'
            	}
        	},
			responsive: true,
    		maintainAspectRatio: false,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,	
						fontSize: 20,
						
					}
				}],
				xAxes: [{
					ticks: {
						min: 3,
						max: 7,
						fontSize: 20
					}
				}]
			}
		},
	});
})


fetch('https://status.gamer4life.net/download/numberofusers.csv')
.then(response => response.text())
.then(resolve => {
	let status = resolve
		.split('\r')
		.join("")
		.split('\n')
		.join(",")
		.split(",");

	uptime = status
		.chunk(2)
		.groupBy(v => v[0])


	user_c = uptime
		.to2d()
		.map(v => {
			v[0] = v[0].split(":")
			return v
		})
		.groupBy(x => x[0][1])
		.to2d()
		.map(day => {
			day[1] = day[1].map(v => v[1][0])
			return day
		})

	user_c = user_c
		.SortDays()
		.last(7)


	user_c_day = user_c.map(v => {
		sum = 0;
		c = 0;
		v[1] = v[1].map(x => {
			sum += Number(x[1]-1)
			c++;
		})
		v[1] = Math.round(((sum/c)*100)/100);
		return v
	})

	user_c_day_us = []
	user_c_day_ti = []

	user_c_day.forEach(i => {
		user_c_day_us.push(i[1])
		user_c_day_ti.push(i[0])
	})

	var ctx = document.getElementById('usercount').getContext('2d');
	var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: user_c_day_ti,	
			datasets: [{
				label: 'Number of Users ∅',
				barPercentage: 0.5,
				borderColor: "#ef9200",
				backgroundColor: "transparent",
				barThickness: 6,
				maxBarThickness: 8,
				minBarLength: 2,
				data: user_c_day_us
			}]
		},
		options: {
			legend: {
            	labels: {
                	defaultFontFamily: "'Comic Neue', cursive",		
                	fontColor: 'black'
            	}
        	},
			responsive: true,
    		maintainAspectRatio: false,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
						max: 32,
						min: 0,
						stepSize: 2,
						fontSize: 22,
						
					}
				}],
				xAxes: [{
					ticks: {
						min: 3,
						max: 7,
						fontSize: 22
					}
				}]
			}
		},
	});

})

fetch('https://status.gamer4life.net/download/numberofusers.csv')
.then(response => response.text())
.then(resolve => {
	let status = resolve
		.split('\r')
		.join("")
		.split('\n')
		.join(",")
		.split(",");

	uptime = status
		.chunk(2)
		.groupBy(v => v[0])


		user_c = uptime
		.to2d()
		.map(v => {
			v[0] = v[0].split(":")
			return v
		})
		.groupBy(x => x[0][1])
		.to2d()
		
		.map(day => {
			day[1].map(hours => {
				hours[1].map(hour => {
					hour[0] = hour[0].split(":")
					hour[0].shift()
					hour[0] = hour[0].join(":")
					return hour
				})
				return hours
			})
			return day
		})
		.SortDays()
		.last(1)

		user_c[0][1].map(x => {
			let result = 0
			let count = 0;
			x[0].shift()
			x[0] = x[0].join(":")
			x[1].map(y => {
				result += Number(y[1]-1)
				count++;
			})
			x[1] = (result/count)
			return x;
		})

		//console.log(user_c)
		


		 user_c_hour_us = []
		 user_c_hour_ti = []

		 user_c.forEach(i => {
		 	i[1].forEach(j => {
		 		user_c_hour_us.push(j[1])
		 		user_c_hour_ti.push(j[0])
		 	})
		 })

		var ctx = document.getElementById('usercount-h').getContext('2d');
		var myChart = new Chart(ctx, {
		type: 'line',
		data: {
			labels: user_c_hour_ti,	
			datasets: [{
				label: 'Number of Users ∅',
				barPercentage: 0.5,
				borderColor: "#ef9200",
				backgroundColor: "transparent",
				barThickness: 6,
				maxBarThickness: 8,
				minBarLength: 2,
				data: user_c_hour_us
			}]
		},
		options: {
			legend: {
            	labels: {
                	defaultFontFamily: "'Comic Neue', cursive",		
                	fontColor: 'black'
            	}
        	},
			responsive: true,
    		maintainAspectRatio: false,
			scales: {
				yAxes: [{
					ticks: {
						beginAtZero: true,
						max: 32,
						min: 0,
						stepSize: 2,
						fontSize: 22,
						
					}
				}],
				xAxes: [{
					ticks: {
						min: 3,
						max: 7,
						fontSize: 22
					}
				}]
			}
		},
	});

})



let ons = document.querySelector('#online-status')
let onus = document.querySelector('#online-users')
let ons_mc = document.querySelector('#online-status-mr')

setInterval(() => {
	fetch('https://status.gamer4life.net/status.php')
	.then(response => response.json())
	.then(resolve => {
		ons.innerHTML = resolve.status;
		onus.innerHTML = Number(resolve.user)-1;
		ons_mc.innerHTML = resolve.statusmc;
	})
}, 60000)
	

