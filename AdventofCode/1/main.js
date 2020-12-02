//Part 1

fs = require('fs');
fs.readFile('list.txt', 'utf8', (err, data) => {
	let array = data.split('\n');
	array = array.map(e => {
		return 1 * e;
	})

	array.forEach(v => {

		array.forEach(x => {
			if(v+x == 2020){
				console.log("V: " + v + " + X: " + x + " " + (v+x) + " => " + (v*x));
				return
			}
		})
	})
})

//Part 2

fs = require('fs');
fs.readFile('list.txt', 'utf8', (err, data) => {
	let array = data.split('\n');
	array = array.map(e => {
		return 1 * e;
	})

	array.forEach(v => {

		array.forEach(x => {

			array.forEach(z => {
				if(v+x+z == 2020){
				console.log("V: " + v + " + X: " + x + " Z: " + z + "  " + (v+x+z) + " => " + (v*x*z));
				return
			}
			})
		})
	})
})