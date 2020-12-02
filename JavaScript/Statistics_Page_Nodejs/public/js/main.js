var socket;
var refresh = document.querySelector('#refresh');
var numbertofetch = document.querySelector('#ntof');

let upper_chart_obj;
let upper_chart_data = [];
let upper_chart_labels = [];

let lower_chart_obj;
let lower_chart_data = [];
let lower_chart_labels = [];

let upper_chart_ctx = document.querySelector('#upper_chart').getContext('2d');
let lower_chart_ctx = document.querySelector('#lower_chart').getContext('2d');

window.addEventListener('load', () => {
	console.log("Loaded!");
	socket = io.connect('http://gamer4life.net:4100');
	socket.emit('getdata', {interval: 24, hour: true});

	socket.on('send_data', handleFetch)

	refresh.addEventListener('click', () => {
		socket.emit('getdata', {interval: numbertofetch.value, hour: true});
	})
})



let handleFetch = (data) => {
	console.log(data)
	upper_chart_data = [];
	upper_chart_labels = [];
	lower_chart_data = [];
	lower_chart_labels = [];
	data.forEach(v => {
		upper_chart_data.push(v.server_user_count);
		upper_chart_labels.push(v.server_timestamp.substring(0,(v.server_timestamp).length-8)+" - "+(v.server_timestamp.substring(((v.server_timestamp).length)-2,(v.server_timestamp).length))+":00");
		
		lower_chart_data.push((v.server_online_state)*100);
		lower_chart_labels.push(v.server_timestamp.substring(0,(v.server_timestamp).length-8)+" - "+(v.server_timestamp.substring(((v.server_timestamp).length)-2,(v.server_timestamp).length))+":00");
	})
	upper_chart_obj = getChartObject('line', upper_chart_labels, 'Users Online', upper_chart_data, '#e1b12c', '#fbc531', 0, 30, 1, 14, 14,'#dddddd',true);
	lower_chart_obj = getChartObject('bar', lower_chart_labels, 'Server Uptime', lower_chart_data, '#44bd32', '#44bd32', 0, 100, 10, 14, 14,'#dddddd', true);
	appendChartsToPage(upper_chart_obj, lower_chart_obj);
}



let getChartObject = (chart_type, chart_labels, chart_label, chart_data, chart_backgroundColor, chart_borderColor, chart_ymin, chart_ymax, chart_stepSize, chart_ytickfontSize, chart_xtickfontSize, chart_tickColor, chart_beginAtZero = true) => {
	let result = 
	{
		type: chart_type,
	    data: {
	    	labels: chart_labels,
	    	hover: "false",
	    	datasets: [{
	    		label: chart_label,
	    		backgroundColor: chart_backgroundColor,
	    		borderColor: chart_borderColor,
	    		data: chart_data
	    	}]
	    },
	    options: {
	    		scales: {
	    			yAxes: [{
		                ticks: {
		                	beginAtZero: chart_beginAtZero,
		                    min: chart_ymin,
		                    max: chart_ymax,
		                    stepSize: chart_stepSize,
		                    fontSize: chart_ytickfontSize,
		                    fontColor: chart_tickColor
		                },
		                gridlines: {
		                	color: chart_tickColor
		                }
            		}],
            		xAxes: [{
            			ticks: {
            				fontSize: chart_xtickfontSize,
		                    fontColor: chart_tickColor
            			},
            			gridlines: {
		                	color: chart_tickColor
		                }
            		}]
	    		}
	    }
	};

	return result;
}


let appendChartsToPage = (options_upper_chart, options_lower_chart) => {

	document.querySelectorAll('canvas').innerHTML = "";

	new Chart(upper_chart_ctx, options_upper_chart);
	new Chart(lower_chart_ctx, options_lower_chart);


}
